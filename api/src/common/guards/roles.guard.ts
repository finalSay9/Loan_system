import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'prisma/generated/prisma';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);
        //route is open
        if(!requireRoles) {
            return true
        }
    }
}