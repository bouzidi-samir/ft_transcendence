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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const game_entity_1 = require("./entities/game.entity");
let GameService = class GameService {
    constructor(gameRepository, userRepository) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }
    async gameCreate(user, input) {
        const game = this.gameRepository.create(input);
        game.user = new user_entity_1.User();
        game.user.id = user.id;
        await game.save();
        return { game };
    }
    async gameDelete(gameId) {
        const game = await this.gameRepository.findOneOrFail(gameId);
        await game.remove();
        return { gameId };
    }
    async gameList() {
        return this.gameRepository.find();
    }
    async gameById(id) {
        return await this.gameRepository.findOneOrFail({ id });
    }
    async gameByPlayerId(playerId) {
        return this.gameRepository.find();
    }
};
GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_entity_1.Game)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map