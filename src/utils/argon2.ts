import * as argon2 from "argon2";
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common'

export const hash = async (password: string) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        throw new InternalServerErrorException('Error hashing password');
    }
}

export const verify = async (password: string, userPassword: string) => {
    try {
        const hashedPassword = await argon2.verify(userPassword, password);
        console.log(hashedPassword)
        return hashedPassword;
    } catch (error) {
        throw new UnauthorizedException('Error verifying password');
    }
}