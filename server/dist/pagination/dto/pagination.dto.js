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
exports.Pagination = exports.PaginationArgs = exports.PaginationSortBy = exports.SortDirection = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_entity_1 = require("../entities/node.entity");
var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["ASC"] = 0] = "ASC";
    SortDirection[SortDirection["DESC"] = 1] = "DESC";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
(0, graphql_1.registerEnumType)(SortDirection, {
    name: 'SortDirection',
});
let PaginationSortBy = class PaginationSortBy {
};
__decorate([
    (0, graphql_1.Field)(() => SortDirection, { nullable: true }),
    __metadata("design:type", Number)
], PaginationSortBy.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => SortDirection, { nullable: true }),
    __metadata("design:type", Number)
], PaginationSortBy.prototype, "score", void 0);
PaginationSortBy = __decorate([
    (0, graphql_1.InputType)()
], PaginationSortBy);
exports.PaginationSortBy = PaginationSortBy;
let PaginationArgs = class PaginationArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginationArgs.prototype, "skip", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginationArgs.prototype, "take", void 0);
__decorate([
    (0, graphql_1.Field)(() => PaginationSortBy, { nullable: true }),
    __metadata("design:type", PaginationSortBy)
], PaginationArgs.prototype, "sortBy", void 0);
PaginationArgs = __decorate([
    (0, graphql_1.ArgsType)()
], PaginationArgs);
exports.PaginationArgs = PaginationArgs;
let Pagination = class Pagination {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Pagination.prototype, "totalCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [node_entity_1.Node]),
    __metadata("design:type", Array)
], Pagination.prototype, "nodes", void 0);
Pagination = __decorate([
    (0, graphql_1.InterfaceType)()
], Pagination);
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.dto.js.map