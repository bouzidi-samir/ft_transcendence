import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

export const CurrentUser = createParamDecorator( // permet d'acceder au user dans les fonctions qui utilisent guard 'On contextualise'
  (data: unknown, context: ExecutionContext) => {

    // if (context.getType() === 'http') {              
    //   return context.switchToHttp().getRequest().user; 
    // } 
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
