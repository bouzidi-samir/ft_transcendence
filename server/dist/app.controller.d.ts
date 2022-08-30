import { AppService } from './app.service';
import { AuthMutationsResolver } from 'src/auth/resolvers/auth.mutations.resolver';
import { AuthLoginOutput } from 'src/auth/dto/auth-login.dto';
import { UserMutationsResolver } from 'src/user/resolvers/user.mutations.resolver';
import { UserQueriesResolver } from 'src/user/resolvers/user.queries.resolver';
export declare class AppController {
    private readonly appService;
    private readonly mutationsResolver;
    private readonly authMutations;
    private readonly UserQueries;
    constructor(appService: AppService, mutationsResolver: UserMutationsResolver, authMutations: AuthMutationsResolver, UserQueries: UserQueriesResolver);
    getCode(code: number): Promise<{
        payLoad: AuthLoginOutput;
    }>;
}
