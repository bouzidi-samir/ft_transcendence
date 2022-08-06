import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from 'src/pagination/dto/pagination.dto';
import { User } from '../entities/user.entity';

@InputType()
export class UserPaginationSortBy extends PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  email?: SortDirection;
}

@ArgsType()
export class UserPaginationArgs extends PaginationArgs {
  @Field(() => UserPaginationSortBy, { nullable: true })
  sortBy?: UserPaginationSortBy;
}

@ObjectType()
export class UserPagination extends Pagination {
  @Field(() => [User])
  nodes: User[];
}