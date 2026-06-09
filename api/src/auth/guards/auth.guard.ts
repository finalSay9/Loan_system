import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable() 
export class AuthGuard implements CanActivate {
    //implementing the can activate function
    canActivate(
        context: ExecutionContext,
    ): Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return validateRequest(request)
    }
}