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
exports.UserMutationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_create_dto_1 = require("../dto/user-create.dto");
const user_delete_dto_1 = require("../dto/user-delete.dto");
const user_update_dto_1 = require("../dto/user-update.dto");
const user_entity_1 = require("../entities/user.entity");
const user_service_1 = require("../user.service");
const bcrypt = require("bcrypt");
let UserMutationsResolver = class UserMutationsResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async userCreate(input) {
        const password = await bcrypt.hash(input.password, 10);
        return this.userService.userCreate(Object.assign(Object.assign({}, input), { password }));
    }
    async userUpdate(userId, input) {
        return this.userService.userUpdate(userId, input);
    }
    async userRemove(userId) {
        return this.userService.userRemove(userId);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_create_dto_1.UserCreateOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.UserCreateInput]),
    __metadata("design:returntype", Promise)
], UserMutationsResolver.prototype, "userCreate", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_update_dto_1.UserUpdateOutput),
    __param(0, (0, graphql_1.Args)({ name: 'userId', type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_update_dto_1.UserUpdateInput]),
    __metadata("design:returntype", Promise)
], UserMutationsResolver.prototype, "userUpdate", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_delete_dto_1.UserDeleteOutput),
    __param(0, (0, graphql_1.Args)({ name: 'userId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMutationsResolver.prototype, "userRemove", null);
UserMutationsResolver = __decorate([
    (0, graphql_1.Resolver)(user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserMutationsResolver);
exports.UserMutationsResolver = UserMutationsResolver;
//# sourceMappingURL=user.mutations.resolver.js.map