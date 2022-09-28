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


  async createRoom(body) {

    const check = await this.roomsRepository.findOne({where: { tag:body.tag }});
    if (check)
      return false;

    const user = await this.userRepository.findOne({where: { username: body.username}});
    if (!user)
      return false;

    const room = await this.roomsRepository.create();
    const creator = await this.memberRepository.create();

    creator.username = user.username;
    creator.userId = user.id;
    creator.admin = true;
    creator.roomTag = body.tag;
    

    if (body.public == true){
      room.public = true;
    }
    else if (body.private == true){
      room.private = true;
    }
    room.tag = body.tag;
  
    if (body.password != null){
      const salt = await bcrypt.genSalt();
      room.password = await bcrypt.hash(body.password, salt);
      creator.password = room.password;
    }
    
    await this.memberRepository.save(creator);
    await this.roomsRepository.save(room);

    return {room, creator};
  }

  async createGlobalRoom(){

    const room = await this.roomsRepository.findOne({where: {tag: "global"}});
    if (room)
      return false;
    else{
      const room = await this.roomsRepository.create();
      room.global = true;
      room.tag = "global";
      await this.roomsRepository.save(room);
    }
    const users = await this.userRepository.find();

    for (let i = 0; i < users.length; i++) {

      const oneMember = await this.memberRepository.create();
      oneMember.userId = users[i].id;
      oneMember.username = users[i].username;
      oneMember.roomTag = 'global';
      await this.memberRepository.save(oneMember);
  }
  return users;

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

  async joinRoom(body) {

    const alreadyMember = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
    if (alreadyMember){
      if (alreadyMember.blocked == true){
      return 'blocked';
      }
      else if (alreadyMember.in == true){
        return 'already in';
      }
      else{
        alreadyMember.in = true;
        await this.memberRepository.save(alreadyMember);
        return 'in';
      }
    }

    const room = await this.roomsRepository.findOne({where: { tag: body.tag }});
    if (room == null)
      return 'no room';
    
    if (room.password){
      if(!body.password){
        return 'need a password';
      }
      const match = bcrypt.compareSync(body.password, room.password);
      if (!match)
        return 'wrong password';
    }

    const newMember = await this.memberRepository.create();
    const user = await this.userRepository.findOne({where: { username: body.username}});
    if (user == null)
      return 'no user';
    newMember.roomTag = body.tag;
    newMember.userId = user.id;
    newMember.username = body.username;
    newMember.password = room.password;
    newMember.in = true;
    await this.memberRepository.save(newMember);

    return newMember;

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
    const receiver = await this.userRepository.findOne({where: {username: body.receiverName}});
    if (!receiver)
      return false;

    const relation = await this.relationsRepository.findOne({where: {fromUsername: body.senderName, toUsername: body.receiverName, roomTag: body.tag}})
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
    return invitations ;
  }

  async acceptOneRoomInvitation(body) {

    const request = await this.relationsRepository.findOne({ where: [{ toUsername: body.username, fromUsername: body.fromUsername, roomRequest: true, roomTag: body.tag} ]});
    if (!request)
      return false;
    if (request.acceptRoom == true)
      return true;

    const requester = await this.memberRepository.findOne({ where: [{username: body.fromUsername, roomTag: body.tag}]});
    if (!requester)
      return false;

    request.acceptRoom = true;
    await this.relationsRepository.save(request);

    const newMember = await this.memberRepository.create();
    const invited = await this.userRepository.findOne({where: {username: body.username}})
    newMember.username = body.username;
    newMember.userId = invited.id;
    newMember.roomTag = body.tag;
    newMember.password = requester.password;
    await this.memberRepository.save(newMember);
    return request;
  }

  // async acceptAllRoomInvitation(body) {

  //   const requests = await this.relationsRepository.find({ where: [{ toUsername: body.username, roomRequest: true} ]});
  //   for (let i = 0; i < requests.length; i++){
  //       requests[i].acceptRoom = true;
  //       await this.relationsRepository.save(requests[i]);
  //       const newMember = await this.memberRepository.create();
  //       newMember.username = body.username;
  //       newMember.roomTag = requests[i].roomTag;
  //       await this.memberRepository.save(newMember)
  //   }
  //   return requests;
  // }

  async blockMember(body) {

    const room = await this.roomsRepository.findOne({where: { tag: body.tag }});
    if (room == null || body.tag == 'global')
      return false;

    const oneAdmin = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
    if (oneAdmin == null)
      return false;
   
    const user = await this.userRepository.findOne({where: { username: body.toBlockUsername}});
   
    const existingMember = await this.memberRepository.findOne({where: { username: body.toBlockUsername, roomTag: body.tag}});
    
    if (existingMember == null){
      
      const member = await this.memberRepository.create();
      member.roomTag = body.tag;
      member.username = body.toBlockUsername;
      member.userId = user.id;
      member.blocked = true;
      await this.memberRepository.save(member);
      return member;
    }
    
    existingMember.blocked = true;
    await this.memberRepository.save(existingMember);
    return existingMember;
    

  }

  async unblockMember(body) {

    const room = await this.roomsRepository.findOne({where: { tag: body.tag }});
    if (room == null || body.tag == 'global')
      return false;

    const oneAdmin = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
    if (oneAdmin == null)
      return false;
    
    const existingMember = await this.memberRepository.findOne({where: { username: body.toUnblockUsername, roomTag: body.tag}});
    if (existingMember){
      existingMember.blocked = false;
      await this.memberRepository.save(existingMember);
      return existingMember;
    }
    else{
      return false;
    }
}

async muteMember(body) {

  const room = await this.roomsRepository.findOne({where: { tag: body.tag }});
  if (room == null || body.tag == 'global')
    return false;

  const existingMember = await this.memberRepository.findOne({where: { username: body.toMuteUsername, roomTag: body.tag}});
  if (existingMember == null)
    return false;
  
  const oneAdmin = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
  if (oneAdmin == null)
    return false;
 
  existingMember.muted = true;
  await this.memberRepository.save(existingMember);
  return existingMember;
  
}

async unmuteMember(body) {

  const room = await this.roomsRepository.findOne({where: { tag: body.tag }});
  if (room == null || body.tag == 'global')
    return false;

  const oneAdmin = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
  if (oneAdmin == null)
    return false;
  
  const existingMember = await this.memberRepository.findOne({where: { username: body.toUnmuteUsername, roomTag: body.tag}});
  if (existingMember){
    existingMember.muted = false;
    await this.memberRepository.save(existingMember);
    return existingMember;
  }
  else{
    return false;
  }
}

async saveMessage(body) {

  const member = await this.memberRepository.findOne({where: {username: body.username, roomTag: body.tag}});
  if (!member)
    return false;
  const user = await this.userRepository.findOne({where: {username: body.username}});
  const message = await this.messagesRepository.create();
  message.fromUsername = body.username;
  message.text = body.text;
  message.roomTag = body.tag;
  message.owner = user;
  await this.messagesRepository.save(message);
  return message;
}

async getRoomMessages(body) {

  const roomMessages = await this.messagesRepository.find({where: {roomTag: body.tag}});
  if (!roomMessages[0])
    return false;
  return roomMessages;
  
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

}