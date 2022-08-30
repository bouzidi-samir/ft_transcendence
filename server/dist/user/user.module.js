"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const game_entity_1 = require("../game/entities/game.entity");
const user_entity_1 = require("./entities/user.entity");
const user_mutations_resolver_1 = require("./resolvers/user.mutations.resolver");
const user_queries_resolver_1 = require("./resolvers/user.queries.resolver");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, game_entity_1.Game])],
        providers: [user_service_1.UserService, user_mutations_resolver_1.UserMutationsResolver, user_queries_resolver_1.UserQueriesResolver],
        exports: [user_service_1.UserService, user_mutations_resolver_1.UserMutationsResolver, user_queries_resolver_1.UserQueriesResolver],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map