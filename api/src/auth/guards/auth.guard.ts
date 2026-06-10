import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  //implementing the can activate function
  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

function validateRequest(request: any): Observable<boolean> {
  // Basic placeholder validation: allow if request.user is present
  return of(Boolean(request && request.user));
}
