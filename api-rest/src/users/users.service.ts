import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Repository, DataSource } from 'typeorm';
import User from './entities/user.entity';
import { Relations } from './entities/relations.entity';
import { Member } from 'src/chat/entities/member.entity';

@Injectable()
export class UsersService {
    constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
        @InjectRepository(Relations)
        public relationsRepository: Repository<Relations>,
        @InjectRepository(Member)
        public memberRepository: Repository<Member>,
	) {}
    
    getAllUsers(): Promise<User[]> {
        return this.userRepository.find() 
    }

    async getRelations(): Promise<Relations[]> {
        return await this.relationsRepository.find() 
    }

    async getBlockedList(username :string): Promise<Relations[]> {
        let rep =  await this.relationsRepository.query(
			`SELECT "toUsername" FROM "relations" WHERE "fromUsername" = $1 AND 
            "blocked" = true;`,
			[username]
		);
        return rep;
    }    

    async getUserById(id: number): Promise<User>
    {
        
        const user = await this.userRepository.findOne({where: {id: id}});
        return user;      
    }
    
    async getUserByUsername(username: string): Promise<User>
    {
        let rep =  await this.userRepository.query(
			`SELECT FROM "user" WHERE "username" = $1;`,
			[username]
		);
        const user = await this.userRepository.findOne({where: {username: username}})
        return (user); 
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
        const already =  await this.userRepository.findOne({where: {nickname: nickname}})
        if (already)
            return {error: "Ce pseudo existe deja."}
        await this.memberRepository.query(
                `UPDATE "member" SET "nickname" = $1 WHERE "userId" = $2;`,
                [nickname, id]
            );
        await this.userRepository.query(
			`UPDATE "user" SET "nickname" = $1, updated_at = NOW() WHERE id = $2;`,
			[nickname, id]
		);
        const user = await this.userRepository.findOne({where: {id : id}});
        return user; 
    }

    async updateAvatar(id: number, image: string): Promise<any> {
        await this.memberRepository.query(
            `UPDATE "member" SET "avatar_url" = $1 WHERE "userId" = $2;`,
            [image, id]
        );
        await this.userRepository.query(
			`UPDATE "user" SET "avatar_url" = $1, updated_at = NOW() WHERE id = $2;`,
			[image, id]
		);
        const user = await this.userRepository.findOne({where: {id : id}});
        return user;
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

    async gameWonAdd(userId: number, gameWon : number, ello : number): Promise<any> {
		return this.userRepository.update(userId,
			{game_won: gameWon, ello : ello}
		);
	}

    async gameLostAdd(userId: number, gameLose : number, ello : number): Promise<any> {
		return this.userRepository.update(userId,
			{game_lost : gameLose, ello : ello}
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

    async checkFriendship(body) {

        const friend = await this.relationsRepository.find({ where: [{ fromUsername: body.fromUsername, toUsername: body.toUsername, acceptFriendship: true}]});
        if (friend)
            return friend;
        return null;
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

        const friend = await this.relationsRepository.findOne({where: [{ fromUsername: body.fromUsername, toUsername: body.toUsername, acceptFriendship: true}]});
            if (friend){
                friend.acceptFriendship = false;
                await this.relationsRepository.save(friend);
            }
        return friend;
        
    }

    async forceToBeMyFriend(body) {

        const friend = await this.relationsRepository.findOne({where: [{ toUsername:body.otherUsername , fromUsername: body.myUsername}]});
        if (!friend){
            const newFriend = await this.relationsRepository.create();
            const Me = await this.userRepository.findOne({where: {username: body.myUsername}});
            newFriend.fromUsername = body.myUsername;
            newFriend.toUsername = body.otherUsername;
            newFriend.friendshipRequest = true;
            newFriend.acceptFriendship = true;
            newFriend.owner = Me;
            await this.relationsRepository.save(newFriend);
            return newFriend;

        }
        else {
            friend.friendshipRequest = true;
            friend.acceptFriendship = true;
            friend.blocked = false;
            await this.relationsRepository.save(friend);
            return friend;
        }

    }

    async getAllMyFriendships(body) {

        const friends = await this.relationsRepository.find({ where:  {fromUsername: body.username, acceptFriendship: true}});
        return friends;   

    }

    async getFriends(username) {
        const friends = await this.relationsRepository.find({ where: [{toUsername: username,  acceptFriendship: true}, {fromUsername: username, acceptFriendship: true}]});
        return friends;   
    }

    // ------------------------------------------- BLOCK ----------------------------------------
    
    async blockUser(body) {

        const relation = await this.relationsRepository.find({where: [{fromUsername: body.username, toUsername: body.targetUsername}]});
        
        if (!relation[0]) {
            const relation = await this.relationsRepository.create();
            const blocker = await this.userRepository.findOne({where: {username: body.username}});
            // const blocked = await this.userRepository.findOne({where: {username: body.targetUsername}});
            relation.owner = blocker;  //le blocker est owner de la relation if blocked
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
