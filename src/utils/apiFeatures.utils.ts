import { JwtService } from '@nestjs/jwt';



export default class APIFeatures{

    static async assignJwtToken(
        email: string,
        jwtService: JwtService
    ): Promise<string>{

        const payload = {email: email}
        const token = await jwtService.sign(payload);

        return token;
    }
}