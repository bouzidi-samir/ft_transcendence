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
exports.GameCreateOutput = exports.GameCreateInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const game_entity_1 = require("../entities/game.entity");
let GameCreateInput = class GameCreateInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], GameCreateInput.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], GameCreateInput.prototype, "win", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], GameCreateInput.prototype, "loss", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.games),
    __metadata("design:type", user_entity_1.User)
], GameCreateInput.prototype, "user", void 0);
GameCreateInput = __decorate([
    (0, graphql_1.InputType)()
], GameCreateInput);
exports.GameCreateInput = GameCreateInput;
let GameCreateOutput = class GameCreateOutput {
};
__decorate([
    (0, graphql_1.Field)(() => game_entity_1.Game),
    __metadata("design:type", game_entity_1.Game)
], GameCreateOutput.prototype, "game", void 0);
GameCreateOutput = __decorate([
    (0, graphql_1.ObjectType)()
], GameCreateOutput);
exports.GameCreateOutput = GameCreateOutput;
//# sourceMappingURL=game-create.dto.js.map