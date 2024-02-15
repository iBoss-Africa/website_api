import {
    NestInterceptor, ExecutionContext, CallHandler, BadRequestException, Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class WebsiteFlag implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const req = context.switchToHttp().getRequest();
        if (!req.query.website) {
            throw new BadRequestException('Website flag not set');
        }
        if (!['IBOSS', 'QUANTUM'].includes(req.query.website.toUpperCase())) {
            throw new BadRequestException('Invalid website flag. Use \'IBOSS\' or \'QUANTUM\'');
        }
        req.query.website = req.query.website.toUpperCase()
        return next.handle();
    }
}