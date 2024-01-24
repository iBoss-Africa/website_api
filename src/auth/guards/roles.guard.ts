import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())

        if(!roles) return true;

        const request = context.switchToHttp().getRequest(); //getting the request and access user
        const user = request.user;
        return matchRoles(roles, user.role);
    }
}

function matchRoles(roles, userRole){
    // if(!roles.includes(userRole))return false;
    // return true;

    if(Array.isArray(userRole)){
        return roles.some(role => userRole.includes(role));
    } else {
        return roles.includes(userRole);
    }
}

// function matchRoles(roles, userRole){
//     const userRoleString = userRole.toString();
//     if(!roles.includes(userRoleString)) return false;
//     return true;
// }

// function matchRoles(roles, userRole){
//     if (!userRole || !roles.includes(userRole.toString())) return false;
//     return true;
// }

