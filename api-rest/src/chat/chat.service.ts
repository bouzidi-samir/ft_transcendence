import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Messages } from './entities/messages.entity';
import { Member } from './entities/member.entity';
import * as bcrypt from 'bcrypt';
import { Rooms } from './entities/rooms.entity';
import { ok } from 'assert';
import { Relations } from '../users/entities/relations.entity';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';
import { RuleTester } from 'eslint';
import {checkPasswordFormat, checkPrivateAccess, checkRoomName} from './chat.utils';

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Relations)
    private readonly relationsRepository: Repository<Relations>
  
  ){}

  getAllRooms(): Promise<any[]> {
    return this.roomsRepository.find() 
  }

  getUserByUsername(username: string): Promise<User>
  {
      const user = this.userRepository.findOne({where: {username: username}});
      return user; 
  }

  async getAllMember(): Promise<any[]> {
    return this.memberRepository.find() 
  }
  
  async getRoomByTag(roomtag: string): Promise<any>
  {
      const room = await this.roomsRepository.findOne({where: {tag: roomtag}});
      return room;      
  }

  async setOnline(body): Promise<any>
  {
      const user = await this.userRepository.findOne({where: {username: body.username}});
      user.online = true;
      await this.userRepository.save(user);

      return user; 
  }

  async setOffline(body): Promise<any>
  {
      const user = await this.userRepository.findOne({where: {username: body.username}});
      user.online = false;
      await this.userRepository.save(user);

      return user; 
  }

  async setInGame(body): Promise<any>
  {
      const user = await this.userRepository.findOne({where: {username: body.username}});
      user.onGame = true;
      await this.userRepository.save(user);

      return user; 
  }

  async setOffGame(body): Promise<any>
  {
      const user = await this.userRepository.findOne({where: {username: body.username}});
      user.onGame = false;
      await this.userRepository.save(user);

      return user; 
  }

  async createRoom(body) {

    const check = await this.roomsRepository.findOne({where: { tag:body.tag }});
    if (check)
      return {error: "Ce nom de salon est déja utilisé"};
    let format = checkRoomName(body.tag);
    if (format != true && body.private == false)
        return {error: format}
    const user = await this.userRepository.findOne({where: { username: body.username}});
    if (!user)
      return false;

    const room = await this.roomsRepository.create();
    const creator = await this.memberRepository.create();

    creator.username = user.username;
    creator.nickname = user.nickname;
    creator.avatar_url = user.avatar_url;
    creator.userId = user.id;
    creator.admin = true;
    creator.owner = true;
    creator.roomTag = body.tag;
    creator.room = room;

    if (body.public == true){
      room.public = true;
    }
    else if (body.private == true){
      room.private = true;
    }
    room.tag = body.tag;
    room.privateMessage = body.privateMessage;
    room.owner = user.username;
  

    if (room.private == true && room.privateMessage == false) { 
      let formatError = checkPasswordFormat(body.password);
      if (formatError != true)
          return {error: formatError}
    }

      if (body.password != ""){
      const salt = await bcrypt.genSalt();
      room.password = await bcrypt.hash(body.password, salt);
      creator.password = room.password;
    }
    
    await this.roomsRepository.save(room);
    await this.memberRepository.save(creator);
      
    if (body.public) {
      const users = await this.userRepository.find();
      for (let i = 0; i < users.length; i++) {
      const already = await this.memberRepository.findOne({where: {username: users[i].username, roomTag: body.tag}});
      if (!already){
        const oneMember = await this.memberRepository.create();
        oneMember.userId = users[i].id;
        oneMember.avatar_url = users[i].avatar_url;
        oneMember.username = users[i].username;
        oneMember.nickname = users[i].nickname;
        oneMember.roomTag = body.tag;
        oneMember.room = room;
        await this.memberRepository.save(oneMember);
        }
      }
    }
    return {room, creator};
  }

  async createGlobalRoom(){
    const room = await this.roomsRepository.findOne({where: {tag: "global"}});

    if (!room){
      const room = await this.roomsRepository.create();
      room.global = true;
      room.tag = "global";
      await this.roomsRepository.save(room);
    }
    
    const users = await this.userRepository.find();

    for (let i = 0; i < users.length; i++) {
      const already = await this.memberRepository.findOne({where: {username: users[i].username, roomTag: "global"}});
      if (!already){
        const oneMember = await this.memberRepository.create();
        oneMember.userId = users[i].id;
        oneMember.avatar_url = users[i].avatar_url;
        oneMember.username = users[i].username;
        oneMember.nickname = users[i].nickname;
        oneMember.roomTag = 'global';
        oneMember.room = room;
        await this.memberRepository.save(oneMember);
      }
  }
  return room;

  }

  async createMyFriendsRoom(body){

    const room = await this.roomsRepository.findOne({where: {tag: "friends"}});
    if (room)
      return false;
    else{
      const room = await this.roomsRepository.create();
    }
    room.friendly = true;
    room.tag = "friends";
    await this.roomsRepository.save(room);

    const friends = await this.relationsRepository.find({ where: [{toUsername: body.username,  acceptFriendship: true}, {fromUsername: body.username, acceptFriendship: true}]});


    for (let i = 0; i < friends.length; i++) {

      const oneMember = await this.memberRepository.create();

      if (body.username == friends[i].fromUsername) {
        const myFriend = await this.userRepository.findOne({where: {username: friends[i].toUsername}})
        oneMember.userId =  myFriend.id;
        oneMember.username = myFriend.username;
        oneMember.roomTag = 'friends';
        await this.memberRepository.save(oneMember);
      }
      else if (body.username == friends[i].toUsername) {
        const myFriend = await this.userRepository.findOne({where: {username: friends[i].fromUsername}})
        oneMember.userId =  myFriend.id;
        oneMember.username = myFriend.username;
        oneMember.roomTag = 'friends';
        await this.memberRepository.save(oneMember);
      }
  }
  return friends;

  }

  async checkIfMember(body) {

    const alreadyMember = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
    if (alreadyMember){
      return {password: alreadyMember.password, member: true};
    }
    else{
        return {password: "", member: false};
    }
  }

  async joinRoom(body) {
    const alreadyMember = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
    const room = await this.roomsRepository.findOne({where: { tag: body.tag }}); 
    
    if (room.password && !alreadyMember && !room.public) {
      let authorize = checkPrivateAccess(body.password, room.password);
      if (authorize != true)
        return {error: authorize}
    }

    if (alreadyMember){
      if (alreadyMember.blocked == true){
        return false;
      }
      else if (alreadyMember.in == true){
       
        return this.getRoomByTag(body.tag);
      }
      else{
        const rooms = await this.memberRepository.find({where: {username: body.username, in: true}});
        for (let i = 0; i < rooms.length; i++) {
          rooms[i].in = false;
          await this.memberRepository.save(rooms[i]);
        }
        alreadyMember.in = true;
        await this.memberRepository.save(alreadyMember);
        return this.getRoomByTag(body.tag);
      }
    }
    
    if (room.password){
      if(!body.password){
        return {error: "L'acces à cette room nécessite un mot de passe"}
      }
      const match = bcrypt.compareSync(body.password, room.password);
      if (!match)
        return {error: "Mot de passe invalide"};
    }

    const newMember = await this.memberRepository.create();
    const user = await this.userRepository.findOne({where: { username: body.username}});
    if (user == null)
      return 'no user';

    const rooms = await this.memberRepository.find({where: {username: body.username, in: true}});
    for (let i = 0; i < rooms.length; i++) {
      rooms[i].in = false;
      await this.memberRepository.save(rooms[i]);
    }

    newMember.roomTag = body.tag;
    newMember.userId = user.id;
    newMember.username = body.username;
    newMember.nickname = body.nickname;
    newMember.avatar_url = body.avatar_url;
    newMember.password = room.password;
    newMember.in = true;
    await this.memberRepository.save(newMember);
    return this.getRoomByTag(body.tag);;
  }

  async editRoom(body) {

    const room = await this.roomsRepository.findOne({where: { tag:body.tag }});
    if (room)
      return false;
    if (body.status == "private"){
      room.private = true;
      room.public = false;
    }
    else if (body.status == "public") {
      room.public = true;
      room.private = false;
    }
    room.tag = body.tag;
    room.privateMessage = body.privateMessage;
    
    if (room.private == true && room.privateMessage == false) { 
      let formatError = checkPasswordFormat(body.password);
      if (formatError != true)
          return {error: formatError}
    }

    if(body.password != "") {
        const salt = await bcrypt.genSalt();
        room.password = await bcrypt.hash(body.password, salt);
        await this.roomsRepository.save(room);
        const members = await this.memberRepository.find({where: {roomTag: body.tag}})
        for (let i = 0; i < members.length; i++) {
          members[i].password = room.password;
          await this.memberRepository.save(members[i]);
        }
      }
  }

  async updateRoom(roomTarget, body) {

    const check = await this.roomsRepository.findOne({where: { tag:body.tag }});
    let format = checkRoomName(body.tag);
    if (format != true)
        return {error: format}
    if (check && check.tag != roomTarget)
      return {error: "Ce nom de salon est déja utilisé"};
    if (body.private == true && body.privateMessage == false) { 
      let formatError = checkPasswordFormat(body.password);
      if (formatError != true)
          return {error: formatError}
      const salt = await bcrypt.genSalt();
      body.password = await bcrypt.hash(body.password, salt);
      await this.roomsRepository.query(
        `UPDATE "rooms" SET "tag" = $1, "public" = $2, "private" = $3, "password" = $4
        WHERE "tag" = $5;`,
        [body.tag, body.public, body.private, body.password, roomTarget]
      );
      const members = await this.memberRepository.find({where: {roomTag: roomTarget}})
      for (let i = 0; i < members.length; i++) {
        members[i].password = body.password;
        await this.memberRepository.save(members[i]);
      }
    }
    if (body.public == true ){
    body.password = null;
    await this.roomsRepository.query(
      `UPDATE "rooms" SET "tag" = $1, "public" = $2, "private" = $3, "password" = $4
      WHERE "tag" = $5;`,
      [body.tag, body.public, body.private, body.password, roomTarget]
    );
    }

    await this.memberRepository.query(
      `UPDATE "member" SET "roomTag" = $1 WHERE "roomTag" = $2;`,
      [body.tag, roomTarget]
    );
    
    if (body.public == true) {
      const users = await this.userRepository.find();
      for (let i = 0; i < users.length; i++) {
        const already = await this.memberRepository.findOne({where: {username: users[i].username, roomTag: roomTarget}});
        if (!already){
          const oneMember = await this.memberRepository.create();
          oneMember.userId = users[i].id;
          oneMember.avatar_url = users[i].avatar_url;
          oneMember.username = users[i].username;
          oneMember.nickname = users[i].nickname;
          oneMember.roomTag = roomTarget;
          oneMember.password = null;
          oneMember.room = check;
          await this.memberRepository.save(oneMember);
        }
      }
    }

    return true;
  }  


  async getActiveRoom(id) {

    const check = await this.memberRepository.findOne({where: {userId: id, in: true}});
    if (!check){
      return false;
    }
    const room = this.getRoomByTag(check.roomTag);
      return (room);
  }

  async adminizer(body) {

    const owner = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag, owner: true }]});
    if (!owner)
      return false;
    const target = await this.memberRepository.findOne({where: [{ username: body.targetName, roomTag: body.tag }]});
    if (!target)
      return false;
    target.admin = true;
    await this.memberRepository.save(target);
    return true;
    
  }

  async setPassword(body) {

    const owner = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag, owner: true }]});
    if (!owner)
      return false;
    const room = await this.roomsRepository.findOne({where: {owner: body.username, tag:body.tag}})
    if (body.action == "change"){
      const salt = await bcrypt.genSalt();
      room.password = await bcrypt.hash(body.password, salt);
      await this.roomsRepository.save(room);
      const members = await this.memberRepository.find({where: {roomTag: body.tag}})
      for (let i = 0; i < members.length; i++) {
        members[i].password = room.password;
        await this.memberRepository.save(members[i]);
      }
      return room;
    }
    if (body.action ==  "cancel"){
      room.password = null;
      await this.roomsRepository.save(room);
      const members = await this.memberRepository.find({where: {roomTag: body.tag}})
      for (let i = 0; i < members.length; i++) {
        members[i].password = null;
        await this.memberRepository.save(members[i]);
      }
      return room;
    }
    return 'action required';
  }

  async leaveRoom(body) {

    const alreadyMember = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
    if (alreadyMember){
        alreadyMember.in = false;
        alreadyMember.out = true;
        await this.memberRepository.save(alreadyMember);
        return true;
      }
      else {
        return false;
      }
  }

  async roomInvitation(body) {

    const sender = await this.memberRepository.findOne({where: {username: body.senderName, roomTag: body.tag}});
    if (!sender)
      return false;
    const room = await this.roomsRepository.findOne({where: {tag: body.tag}});
    if (!room || (room.private && sender.admin == false))
      return false;
    const receiver = await this.userRepository.findOne({where: {username: body.receiverName}});
    if (!receiver)
      return false;


    const relation = await this.relationsRepository.findOne({where: {fromUsername: body.senderName, toUsername: body.receiverName}})
    if (relation){
      if (relation.roomRequest == false) {
        relation.roomRequest = true;
        relation.roomTag = body.tag;
        await this.relationsRepository.save(relation);
        return relation;
      }
    }
    else {

      const newRelation = await this.relationsRepository.create();
      newRelation.fromUsername = body.senderName;
      newRelation.toUsername = body.receiverName;
      newRelation.roomRequest = true;
      newRelation.roomTag = body.tag;
      newRelation.owner = receiver;
      await this.relationsRepository.save(newRelation);
      return newRelation;
    }
  }

  async checkRoomInvitation(body) {

    const invitations = await this.relationsRepository.find({ where: [{ toUsername: body.username, roomRequest: true}]});
    if (invitations){
      return invitations ;
    }
    return false;
  }

  async acceptOneRoomInvitation(body) {

    const request = await this.relationsRepository.findOne({ where: [{ toUsername: body.username, fromUsername: body.fromUsername, roomRequest: true, roomTag: body.tag} ]});
    
    if (!request)
      return 'No roomRequest';
  
    const requester = await this.memberRepository.findOne({ where: [{username: body.fromUsername, roomTag: body.tag}]});
    const toMember =  await this.memberRepository.findOne({ where: [{username: body.username, roomTag: body.tag}]});
    
    if (!requester)
      return 'requester not a member';
    
    if (toMember) {
        toMember.blocked = false
        request.roomRequest = false // on kill l'invitation de la list
        await this.relationsRepository.save(request);
        await this.memberRepository.save(toMember);
        return 
    }

    const room = await this.roomsRepository.findOne({where: {tag: body.tag}});
    if (!room)
      return 'room doesnt exist';
    request.roomRequest = false // on kill l'invitation de la liste
    await this.relationsRepository.save(request);
    const newMember = await this.memberRepository.create();
    const invited = await this.userRepository.findOne({where: {username: body.username}})
    newMember.username = body.username;
    newMember.nickname = invited.nickname;
    newMember.avatar_url = body.avatar_url;
    newMember.userId = invited.id;
    newMember.roomTag = body.tag;
    newMember.password = requester.password;
    newMember.room = room;
    await this.memberRepository.save(newMember);
    return newMember;
  }

  async refuseOneRoomInvitation(body){
    const request = await this.relationsRepository.findOne({ where: [{ toUsername: body.username, fromUsername: body.fromUsername, roomRequest: true, roomTag: body.tag} ]});
    if (!request)
      return 'No roomRequest';
    const requester = await this.memberRepository.findOne({ where: [{username: body.fromUsername, roomTag: body.tag}]});
    if (!requester)
      return 'requester not a member';
    const room = await this.roomsRepository.findOne({where: {tag: body.tag}});
    if (!room)
      return 'room doesnt exist';
    request.roomRequest = false
    await this.relationsRepository.save(request);
    return true;
  }

  async banMember(body) {
    const room = await this.roomsRepository.findOne({where: { tag: body.tag }});
    const existingMember = await this.memberRepository.findOne({where: {username: body.toBanUsername, roomTag: body.tag}});
    if (existingMember.owner == true){
      return false;
    }
    const member = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
    if (member == null || member.admin == false)
      return false;
    existingMember.blocked = true;
    existingMember.in = false;
    existingMember.out = true;
    existingMember.admin = false;
    if (existingMember.muted == true){
      existingMember.muted = false;
    }
    await this.memberRepository.save(existingMember);
    
    return true;
    
  }

  async checkBan(body) {

    const existingMember = await this.memberRepository.findOne({where: { username: body.username, roomTag: body.tag}});
    if (existingMember == null)
      return false;
  
    if (existingMember.blocked == true){
      return true;
    }
    return false;
  }

//   async unblockMember(body) {

//     const room = await this.roomsRepository.findOne({where: { tag: body.tag }});
//     if (room == null || body.tag == 'global')
//       return false;

//     const oneAdmin = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
//     if (oneAdmin == null)
//       return false;
    
//     const existingMember = await this.memberRepository.findOne({where: { username: body.toUnblockUsername, roomTag: body.tag}});
//     if (existingMember){
//       existingMember.blocked = false;
//       await this.memberRepository.save(existingMember);
//       return existingMember;
//     }
//     else{
//       return false;
//     }
// }

async muteMember(body) {

  const room = await this.roomsRepository.findOne({where: { tag: body.tag }});
  if (room == null || body.tag == 'global')
    return false;
  if (body.minutes > 1 && body.minutes > 100)
     return false 
  // return {error: "Merci de rentre un chiffre en tre 1 et 100"};
  const existingMember = await this.memberRepository.findOne({where: { username: body.toMuteUsername, roomTag: body.tag}});
  if (existingMember == null)
    return false;
  if (existingMember.blocked == true)
    return false;
  const oneAdmin = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
  if (oneAdmin.admin == false)
    return false;
  if (existingMember.owner == true)
    return false;
  existingMember.muted = true;
  const millis = Date.now() + (body.minutes * 60 * 1000);
  existingMember.chronos = Math.floor(millis / 1000);
  await this.memberRepository.save(existingMember);
  return true;
  
}

async checkMute(body) {

  const existingMember = await this.memberRepository.findOne({where: { username: body.username, roomTag: body.tag}});
  if (existingMember == null)
    return false;

  const millis = Date.now();
  const checkTime =  Math.floor(millis / 1000);
  if (checkTime < existingMember.chronos)
    return true;
  else {
    existingMember.muted = false;
    existingMember.chronos = 0;
    await this.memberRepository.save(existingMember);
    return false;
  }

}

// async unmuteMember(body) {

//   const room = await this.roomsRepository.findOne({where: { tag: body.tag }});
//   if (room == null || body.tag == 'global')
//     return false;

//   const oneAdmin = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
//   if (oneAdmin == null)
//     return false;
  
//   const existingMember = await this.memberRepository.findOne({where: { username: body.toUnmuteUsername, roomTag: body.tag}});
//   if (existingMember){
//     existingMember.muted = false;
//     existingMember.chronos = 0;
//     await this.memberRepository.save(existingMember);
//     return existingMember;
//   }
//   else{
//     return false;
//   }
// }

async saveMessage(message) {

  // const member = await this.memberRepository.findOne({where: {username: body.username, roomTag: body.tag}});
  // if (!member)
  //   return false;
  // const user = await this.userRepository.findOne({where: {username: body.username}});
  const newMessage = await this.messagesRepository.create();
  newMessage.fromUsername = message.messageData.fromUsername;
  newMessage.fromNickname = message.messageData.fromNickname;
  newMessage.time = message.messageData.time;
  newMessage.text = message.messageData.text;
  newMessage.roomTag = message.messageData.room;
  newMessage.fromAvatar = message.messageData.fromAvatar;
  // newMessage.owner = user;
  await this.messagesRepository.save(newMessage);
  return newMessage;
}

async getRoomMessages(tag) {

  const roomMessages = await this.messagesRepository.find({where: {roomTag: tag}});
  if (!roomMessages[0])
    return roomMessages;
  if (roomMessages.length > 20)
  {
    const sortMessages =  roomMessages.slice(roomMessages.length - 20);
    return sortMessages;
  } 
  return roomMessages;
}

async getRoomMembers(tag) {

  const roomMembers = await this.memberRepository.find({where: {roomTag: tag}});
  return roomMembers;
}

async getRoomAdmin(tag) {

  const roomMembers = await this.memberRepository.find({where: {roomTag: tag, admin: true}});
  return roomMembers;
}

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }

  // ----------------------------   GAME   --------------------------------------------------------------

  async gameInvitation(body) {

    
    const receiver = await this.userRepository.findOne({where: {username: body.receiverName}});
    if (!receiver)
      return false;
    const relation = await this.relationsRepository.findOne({where: {fromUsername: body.senderName, toUsername: body.receiverName}})
    if (relation){
      if (relation.gameRequest == false) {
        relation.gameRequest = true;
        await this.relationsRepository.save(relation);
        return relation;
      }
      if (relation.gameRequest == true) {
        return relation;
      }
    }
    else {

      const newRelation = await this.relationsRepository.create();
      newRelation.fromUsername = body.senderName;
      newRelation.toUsername = body.receiverName;
      newRelation.gameRequest = true;
      newRelation.owner = receiver;
      await this.relationsRepository.save(newRelation);
      return newRelation;
    }
  }

  async checkGameInvitation(body) {

    const invitations = await this.relationsRepository.find({ where: [{ toUsername: body.username, gameRequest: true}]});
    if (invitations){
      return invitations ;
    }
    return false;
  }

  async acceptOneGameInvitation(body) {

    const request = await this.relationsRepository.findOne({ where: [{ toUsername: body.username, fromUsername: body.fromUsername, gameRequest: true} ]});
    if (!request)
      return 'No Request';

    request.gameRequest = false
    request.acceptGame = true;
    await this.relationsRepository.save(request);
    return request;
  }

  async refuseOneGameInvitation(body){
    const request = await this.relationsRepository.findOne({ where: [{ toUsername: body.username, fromUsername: body.fromUsername, gameRequest: true} ]});
    if (!request)
      return 'No roomRequest';
    request.gameRequest = false
    await this.relationsRepository.save(request);
    return request;
  }

}