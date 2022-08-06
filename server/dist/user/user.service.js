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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const game_entity_1 = require("../game/entities/game.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository, gameRepository) {
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
    }
    async userCreate(input) {
        const user = this.userRepository.create(input);
        await user.save();
        return {
            user,
        };
    }
    async userUpdate(userId, input) {
        const user = await this.userRepository.findOneOrFail(userId);
        user.name = input.name;
        user.avatar = input.avatar;
        user.password = input.password;
        user.lastScore = input.lastScore;
        user.bestScore = input.bestScore;
        await user.save();
        return { user };
    }
    async userGetById(id) {
        return await this.userRepository.findOneOrFail({ id }, { relations: ["games"] });
    }
    async userGetByEmail(email) {
        return await this.userRepository.findOneOrFail({ email });
    }
    async userGetByName(name) {
        return await this.userRepository.findOneOrFail({ name });
    }
    async userGetAll() {
        return await this.userRepository.find();
    }
    async userRemove(userId) {
        const user = await this.userRepository.findOneOrFail(userId);
        await user.remove();
        return { userId };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(game_entity_1.Game)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map