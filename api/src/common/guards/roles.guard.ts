import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'prisma/generated/prisma';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', 
        //first look at the route/handler if not look at the whole class
            [context.getHandler(),context.getClass()]);
        //route is open
        if(!requiredRoles) {
            return true
        }

        const {user} = context.switchToHttp().getRequest();
        return requiredRoles.includes(user.role)
    }
}