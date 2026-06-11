import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';


@Injectable()
export class AuthGuard implements CanActivate {
  //implementing the can activate function
  canActivate(context: ExecutionContext):boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}


