"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPagination = exports.UserPaginationArgs = exports.UserPaginationSortBy = void 0;
const graphql_1 = require("@nestjs/graphql");
const pagination_dto_1 = require("../../pagination/dto/pagination.dto");
const user_entity_1 = require("../entities/user.entity");
let UserPaginationSortBy = class UserPaginationSortBy extends pagination_dto_1.PaginationSortBy {
};
__decorate([
    (0, graphql_1.Field)(() => pagination_dto_1.SortDirection, { nullable: true }),
    __metadata("design:type", Number)
], UserPaginationSortBy.prototype, "email", void 0);
UserPaginationSortBy = __decorate([
    (0, graphql_1.InputType)()
], UserPaginationSortBy);
exports.UserPaginationSortBy = UserPaginationSortBy;
let UserPaginationArgs = class UserPaginationArgs extends pagination_dto_1.PaginationArgs {
};
__decorate([
    (0, graphql_1.Field)(() => UserPaginationSortBy, { nullable: true }),
    __metadata("design:type", UserPaginationSortBy)
], UserPaginationArgs.prototype, "sortBy", void 0);
UserPaginationArgs = __decorate([
    (0, graphql_1.ArgsType)()
], UserPaginationArgs);
exports.UserPaginationArgs = UserPaginationArgs;
let UserPagination = class UserPagination extends pagination_dto_1.Pagination {
};
__decorate([
    (0, graphql_1.Field)(() => [user_entity_1.User]),
    __metadata("design:type", Array)
], UserPagination.prototype, "nodes", void 0);
UserPagination = __decorate([
    (0, graphql_1.ObjectType)()
], UserPagination);
exports.UserPagination = UserPagination;
//# sourceMappingURL=user-pagination.dto.js.map