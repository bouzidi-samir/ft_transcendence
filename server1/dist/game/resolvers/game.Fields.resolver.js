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
exports.GameFieldsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../user/entities/user.entity");
const user_service_1 = require("../../user/user.service");
const game_entity_1 = require("../entities/game.entity");
const game_service_1 = require("../game.service");
let GameFieldsResolver = class GameFieldsResolver {
    constructor(userService, gameService) {
        this.userService = userService;
        this.gameService = gameService;
    }
    async player(game) {
        if (!game.playerId) {
            return null;
        }
        try {
            return await this.userService.userGetById(game.playerId);
        }
        catch (e) {
            return null;
        }
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => user_entity_1.User, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_entity_1.Game]),
    __metadata("design:returntype", Promise)
], GameFieldsResolver.prototype, "player", null);
GameFieldsResolver = __decorate([
    (0, graphql_1.Resolver)(game_entity_1.Game),
    __metadata("design:paramtypes", [user_service_1.UserService,
        game_service_1.GameService])
], GameFieldsResolver);
exports.GameFieldsResolver = GameFieldsResolver;
//# sourceMappingURL=game.Fields.resolver.js.map