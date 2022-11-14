import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Repository, DataSource } from 'typeorm';
import User from './entities/user.entity';
import { Relations } from './entities/relations.entity';

@Injectable()
export class UsersService {
    constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
        @InjectRepository(Relations)
        public relationsRepository: Repository<Relations>,
	) {}
    
    getAllUsers(): Promise<User[]> {
        return this.userRepository.find() // SELECT * from user
    }

    async getUserById(id: number): Promise<User>
    {
        
        const user = await this.userRepository.findOne({where: {id: id}});
        return user;      
    }
    
    async getUserByUsername(username: string): Promise<User>
    {
        const user = await this.userRepository.findOne({where: {username: username}});
        return user; 
    }

    async addUser(user: User): Promise<User> {
		const addedUser = this.userRepository.create(user);
		await this.userRepository.save(addedUser);
		return addedUser;
	}

    async setRegister(id: number): Promise<any> {
        return await this.userRepository.query(
            `UPDATE "user" SET "registred" = $1, updated_at = NOW() WHERE id = $2;`,
            ["true", id]
        );
    }

    async updateNickname(id: number, nickname: string): Promise<any> {
		if (!nickname)
			return {error: "Veuillez saisir un pseudo"}
		return await this.userRepository.query(
			`UPDATE "user" SET "nickname" = $1, updated_at = NOW() WHERE id = $2;`,
			[nickname, id]
		);
        //return await this.userRepository.findOne({where: {id: id}});
	}

    async updateAvatar(id: number, image: string): Promise<any> {
        await this.userRepository.query(
			`UPDATE "user" SET "avatar_url" = $1, updated_at = NOW() WHERE id = $2;`,
			[image, id]
		);
        return await this.userRepository.findOne({where: {id: id}});
	}

    async getAvatar(id: number): Promise<any> {
        let rep =  await this.userRepository.query(
			`SELECT "avatar_url" FROM "user" WHERE id = $1;`,
			[id]
		);
        return rep;
    }

    async updateToken(Token: string, userId: number): Promise<any> {
		return this.userRepository.update(userId,
			{JWT_token: Token}
		);
	}

    async gameWonAdd(userId: number, gameWon : number): Promise<any> {
		return this.userRepository.update(userId,
			{game_won: gameWon}
		);
	}

    async gamePlayedAdd(userId: number, gamePlayed : number): Promise<any> {
		return this.userRepository.update(userId,
			{game_played: gamePlayed}
		);
	}

    async logout (userId :number) : Promise<any>{
        return (await this.userRepository.update(userId,{registred : 'false'}));
    }

    async setTwoFactorAuthenticationSecret(secret: string, userId: number) { //save le secret dans la db
        return this.userRepository.update(userId, {
          twoFactorAuthenticationSecret: secret
        });
      }
    
    async turnOnTwoFactorAuthentication(userId: number) {
        return this.userRepository.update(userId, {
          isTwoFactorAuthenticationEnabled: false /////
        });
      }

    //------------------------------------------ FRIENDS -----------------------------------------------------


    async sendFriendshipRequest(body){

        const sender = await this.userRepository.findOne({where: {username: body.senderName}});
        const receiver = await this.userRepository.findOne({where: {username: body.receiverName}});
        const relation = await this.relationsRepository.findOne({where: {fromUsername: body.senderName, toUsername: body.receiverName}})
        
        if (relation){

            if(relation.friendshipRequest == true)
                return true;

            relation.friendshipRequest = true;
            await this.relationsRepository.save(relation);
            return sender.username;
        }
        else {

        const relation = await this.relationsRepository.create();
        relation.owner = receiver; // le receiver est owner de la relation, qd il check ses relations il decide d'accepter ou pas.
        relation.fromUsername = sender.username;
        relation.toUsername = receiver.username;
        relation.friendshipRequest = true;
        await this.relationsRepository.save(relation);
        return sender.username;

        }
    }

    async checkFriendshipRequest(body) {

        const requests = await this.relationsRepository.find({ where: [{ toUsername: body.username, friendshipRequest: true}]});

        return requests;
    }

    async acceptOneFrienshipRequest(body) {

        const request = await this.relationsRepository.findOne({ where: [{ toUsername: body.username, fromUsername: body.from, friendshipRequest: true} ]});
            if (!request)
        return false;
        request.acceptFriendship = true;
        await this.relationsRepository.save(request);
        return request;
    }

    async acceptAllFriendshipRequest(body) {

        const request = await this.relationsRepository.find({ where: [{ toUsername: body.username, friendshipRequest: true} ]});
        for (let i = 0; i < request.length; i++){
            request[i].acceptFriendship = true;
            await this.relationsRepository.save(request[i]);
        }
        return request;
    }

    async displayMyFriendshipRequest(body) {

        const requests = await this.relationsRepository.find({ where: [{ fromUsername: body.username, friendshipRequest: true, acceptFriendship: false} ]});
        return requests;   

    }

    async deleteOneFriendship(body) {

        const friend = await this.relationsRepository.find({where: [{ toUsername: body.myUsername, fromUsername: body.otherUsername, acceptFriendship: true }, { toUsername: body.otherUsername, fromUsername: body.myUsername, acceptFriendship: true }]});
        for (let i = 0; i < friend.length; i++) {
            await this.relationsRepository.delete(friend[i]);
        }
        
    }

    async getAllMyFriendships(body) {

        const friends = await this.relationsRepository.find({ where: [{toUsername: body.username,  acceptFriendship: true}, {fromUsername: body.username, acceptFriendship: true}]});
        return friends;   

    }

    // ------------------------------------------- BLOCK ----------------------------------------
    
    async blockUser(body) {

        const relation = await this.relationsRepository.find({where: [{fromUsername: body.username, toUsername: body.targetUsername}, {fromUsername: body.targetUsername, toUsername: body.username }]});
        
        if (!relation[0]) {

            const relation = await this.relationsRepository.create();
            const blocked = await this.userRepository.findOne({where: {username: body.blockedUsername}});
            relation.owner = blocked;
            relation.fromUsername = body.username;
            relation.toUsername = body.targetUsername;
            relation.blocked = true;
            await this.relationsRepository.save(relation);

        } else {

            for (let i = 0; i < relation.length; i++) {

                relation[i].blocked = true;
                await this.relationsRepository.save(relation[i]);
            }
           
        }
        
        return relation;
    }

    async unBlockUser(body) {

        const relation = await this.relationsRepository.find({where: [{fromUsername: body.username, toUsername: body.targetUsername}, {fromUsername: body.targetUsername, toUsername: body.username }]});
        
        if (relation[0]) {

            for (let i = 0; i < relation.length; i++) {

                relation[i].blocked = false;
                await this.relationsRepository.save(relation[i]);
            }
            return relation;
        }

        return null;
    }

    async getAllMyBlockedUser(body) {

        const myBlockedUser = await this.relationsRepository.find({ where: {fromUsername: body.username, blocked: true}});
        return myBlockedUser;   

    }

    //--------------------------------- MUTE -----------------------------------------------------

    async muteUser(body) {

        const relation = await this.relationsRepository.find({where: [{fromUsername: body.username, toUsername: body.targetUsername}, {fromUsername: body.targetUsername, toUsername: body.username }]});
        
        if (!relation[0]) {

            const relation = await this.relationsRepository.create();
            const muted = await this.userRepository.findOne({where: {username: body.targetUsername}});
            relation.owner = muted;
            relation.fromUsername = body.username;
            relation.toUsername = body.targetUsername;
            relation.muted = true;
            await this.relationsRepository.save(relation);

        } else {

            for (let i = 0; i < relation.length; i++) {

                relation[i].muted = true;
                await this.relationsRepository.save(relation[i]);
            }
           
        }
        
        return relation;
    }

    async unmuteUser(body) {

        const relation = await this.relationsRepository.find({where: [{fromUsername: body.username, toUsername: body.targetUsername}, {fromUsername: body.targetUsername, toUsername: body.username }]});
        
        if (relation[0]) {

            for (let i = 0; i < relation.length; i++) {

                relation[i].muted = false;
                await this.relationsRepository.save(relation[i]);
            }
            return relation;
        }

        return null;
    }

    async getAllMyMutedUser(body) {

        const myMutedUser = await this.relationsRepository.find({ where: {fromUsername: body.username, muted: true}});
        return myMutedUser;   

    }
   
    //---------------------------------      -----------------------------------------------------
}
