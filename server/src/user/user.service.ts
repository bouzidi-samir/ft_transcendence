import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { JWTPayload } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Game } from 'src/game/entities/game.entity';
import { Repository } from 'typeorm';
import { UserCreateInput, UserCreateOutput } from './dto/user-create.dto';
import { UserDeleteOutput } from './dto/user-delete.dto';
import { UserUpdateInput, UserUpdateOutput } from './dto/user-update.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async userCreate( input: UserCreateInput): Promise<UserCreateOutput> {
    const user = this.userRepository.create(input);
    await user.save();
    return {
      user,
    };
  }

  async userUpdate(userId: User['id'], input: UserUpdateInput,): Promise<UserUpdateOutput> {
    const user = await this.userRepository.findOneOrFail(userId);
    user.name = input.name;
    user.avatar = input.avatar;
    user.password = input.password;
    user.lastScore = input.lastScore;
    user.bestScore = input.bestScore;
    user.online = input.online;
    await user.save();
    return { user };
  }

  async userGetById(id: User['id']): Promise<User> {
    return await this.userRepository.findOneOrFail({ id }, {relations: ["games"]});
  }

  async userGetByEmail(email: User['email']): Promise<User> {
    return await this.userRepository.findOneOrFail({ email });
  }

  async userGetByName(name: User['name']): Promise<User> {
    return await this.userRepository.findOneOrFail({ name });
  }

  // @UseGuards(JwtAuthGuard)
  // async userGetAll( user: JWTPayload): Promise<User[]> {
  //   return await this.userRepository.find();
  // }


  async userGetAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async userRemove(userId: User['id']): Promise<UserDeleteOutput> {
    const user = await this.userRepository.findOneOrFail(userId);
    await user.remove();
    return { userId };
  }


}
