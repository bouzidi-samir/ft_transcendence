import { Pagination, PaginationArgs, PaginationSortBy, SortDirection } from 'src/pagination/dto/pagination.dto';
import { User } from '../entities/user.entity';
export declare class UserPaginationSortBy extends PaginationSortBy {
    email?: SortDirection;
}
export declare class UserPaginationArgs extends PaginationArgs {
    sortBy?: UserPaginationSortBy;
}
export declare class UserPagination extends Pagination {
    nodes: User[];
}
