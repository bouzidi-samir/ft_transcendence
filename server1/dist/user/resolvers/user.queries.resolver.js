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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../entities/user.entity");
const user_service_1 = require("../user.service");
let UserQueriesResolver = class UserQueriesResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async userGetById(id) {
        return this.userService.userGetById(id);
    }
    async userGetByEmail(email) {
        return this.userService.userGetByEmail(email);
    }
    async userGetByName(name) {
        return this.userService.userGetByName(name);
    }
    async userGetAll() {
        return this.userService.userGetAll();
    }
};
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserQueriesResolver.prototype, "userGetById", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserQueriesResolver.prototype, "userGetByEmail", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserQueriesResolver.prototype, "userGetByName", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserQueriesResolver.prototype, "userGetAll", null);
UserQueriesResolver = __decorate([
    (0, graphql_1.Resolver)(user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserQueriesResolver);
exports.UserQueriesResolver = UserQueriesResolver;
//# sourceMappingURL=user.queries.resolver.js.map