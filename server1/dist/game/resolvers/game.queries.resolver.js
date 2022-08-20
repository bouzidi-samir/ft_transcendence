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
exports.GameQueriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const game_entity_1 = require("../entities/game.entity");
const game_service_1 = require("../game.service");
let GameQueriesResolver = class GameQueriesResolver {
    constructor(gameService) {
        this.gameService = gameService;
    }
    async gameList() {
        return this.gameService.gameList();
    }
    async gameById(id) {
        return this.gameService.gameById(id);
    }
    async gameByPlayerId(playerId) {
        return this.gameService.gameById(playerId);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [game_entity_1.Game]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameQueriesResolver.prototype, "gameList", null);
__decorate([
    (0, graphql_1.Query)(() => game_entity_1.Game),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GameQueriesResolver.prototype, "gameById", null);
__decorate([
    (0, graphql_1.Query)(() => [game_entity_1.Game]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GameQueriesResolver.prototype, "gameByPlayerId", null);
GameQueriesResolver = __decorate([
    (0, graphql_1.Resolver)(game_entity_1.Game),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameQueriesResolver);
exports.GameQueriesResolver = GameQueriesResolver;
//# sourceMappingURL=game.queries.resolver.js.map