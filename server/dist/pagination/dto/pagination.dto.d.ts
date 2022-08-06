import { Node } from '../entities/node.entity';
export declare enum SortDirection {
    ASC = 0,
    DESC = 1
}
export declare class PaginationSortBy {
    createdAt?: SortDirection;
    score?: SortDirection;
}
export declare class PaginationArgs {
    skip: number;
    take: number;
    sortBy?: PaginationSortBy;
}
export declare abstract class Pagination<N extends Node = Node> {
    totalCount: number;
    abstract nodes: N[];
}
