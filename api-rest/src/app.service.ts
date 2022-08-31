import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  @Inject(UsersService)
	public readonly users: UsersService;
}
