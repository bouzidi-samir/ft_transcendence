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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const axios_1 = require("axios");
const auth_mutations_resolver_1 = require("./auth/resolvers/auth.mutations.resolver");
const user_mutations_resolver_1 = require("./user/resolvers/user.mutations.resolver");
const user_queries_resolver_1 = require("./user/resolvers/user.queries.resolver");
let AppController = class AppController {
    constructor(appService, mutationsResolver, authMutations, UserQueries) {
        this.appService = appService;
        this.mutationsResolver = mutationsResolver;
        this.authMutations = authMutations;
        this.UserQueries = UserQueries;
    }
    async getCode(code) {
        try {
            let token = await axios_1.default.post('https://api.intra.42.fr/oauth/token', { grant_type: 'authorization_code',
                client_id: '6e52620f16bfa38095e26eae2231051c3fff5161197180b12228a4a2e04bbdb1',
                client_secret: '08154b57d6afec0edd37ab73b28a597f91d08a79bfb2ea7851fc86f5d9a6b757',
                code,
                redirect_uri: 'http://localhost:3000',
                state: 'Quentin'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            let result = await axios_1.default.get('https://api.intra.42.fr/v2/me', {
                headers: {
                    'Authorization': "Bearer " + token['data']['access_token'],
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            let args = {
                name: result['data']['login'],
                email: result['data']['email'],
                password: "test",
                online: false,
                avatar: result['data']['image_url'],
                lastScore: 0,
                bestScore: 0,
            };
            let usr;
            try {
                usr = await this.mutationsResolver.userCreate(args);
            }
            catch (e) {
                usr = await this.UserQueries.userGetByName(args['name']);
            }
            let req = { user: usr, };
            let payLoad = await this.authMutations.authLogin(req, usr['name'], usr['password']);
            console.log(payLoad);
            return ({ payLoad });
        }
        catch (e) {
            console.log(e);
        }
        ;
    }
};
__decorate([
    (0, common_1.Get)("callback"),
    __param(0, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCode", null);
AppController = __decorate([
    (0, common_1.Controller)(""),
    __metadata("design:paramtypes", [app_service_1.AppService,
        user_mutations_resolver_1.UserMutationsResolver,
        auth_mutations_resolver_1.AuthMutationsResolver,
        user_queries_resolver_1.UserQueriesResolver])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map