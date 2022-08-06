"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const user_module_1 = require("../user/user.module");
const game_entity_1 = require("./entities/game.entity");
const game_service_1 = require("./game.service");
const game_Fields_resolver_1 = require("./resolvers/game.Fields.resolver");
const game_mutations_resolver_1 = require("./resolvers/game.mutations.resolver");
const game_queries_resolver_1 = require("./resolvers/game.queries.resolver");
let GameModule = class GameModule {
};
GameModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([game_entity_1.Game, user_entity_1.User]), user_module_1.UserModule],
        providers: [game_service_1.GameService, game_mutations_resolver_1.GameMutationsResolver, game_queries_resolver_1.GameQueriesResolver, game_Fields_resolver_1.GameFieldsResolver]
    })
], GameModule);
exports.GameModule = GameModule;
//# sourceMappingURL=game.module.js.map