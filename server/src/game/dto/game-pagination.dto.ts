// import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
// import { Pagination, PaginationArgs, PaginationSortBy, SortDirection } from "src/pagination/dto/pagination.dto";
// import { Game } from "../entities/game.entity";

// @InputType()
// export class GamepaginationSortBy extends PaginationSortBy {
//     @Field(() => SortDirection, { nullable: true })
//     score?: SortDirection;
// }

// @ArgsType()
// export class GamePaginationArgs extends PaginationArgs {
//     @Field(() => GamepaginationSortBy, { nullable: true })
//     sortBy?: PaginationSortBy;
// }

// @ObjectType()
// export class GamePagination extends Pagination {
//     @Field(() => [Game])
//     nodes: Game[];
// }