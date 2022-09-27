import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Messages } from './entities/messages.entity';
import { Member } from './entities/member.entity';
import * as bcrypt from 'bcrypt';
import { Rooms } from './entities/rooms.entity';
import { ok } from 'assert';

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
  
  ){}

  getAllRooms(): Promise<any[]> {
    return this.roomsRepository.find() 
  }

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

    const room = await this.roomsRepository.create();
    room.global = true;
    room.tag = "global";
    await this.roomsRepository.save(room);
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

  async joinRoom(body) {

    const alreadyMember = await this.memberRepository.findOne({where: [{ username: body.username, roomTag: body.tag }]});
    if (alreadyMember){
      if (alreadyMember.blocked == true){
      return 'blocked';
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
    
    if (room.password != null){
      if(!body.password){
        return 'need a password';
      }
      const match = bcrypt.compare(room.password, body.password)
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