import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'prisma/generated/prisma';


@Injectable()
export class RolesGuard implements CanActivate {
    //injecting the reflector class(service)
    constructor(private reflector: Reflector){}

    //having the decision maker the canActivate guy
    canActivate(context: ExecutionContext): boolean {
      //look for metadata key named roles
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        'roles',
        //first look at the route/handler if not look at the whole class
        //if its found on both override
        [context.getHandler(), context.getClass()],
      );

      //route is open.....that is ..is the route public
      if (!requiredRoles) {
        return true;
      }

      const { user } = context.switchToHttp().getRequest();
      //checks if the user's role matches any of the roles written on 
      // your sticky note/board
      return requiredRoles.includes(user.role);
    }
}