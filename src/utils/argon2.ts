import * as argon2 from "argon2";
import { InternalServerErrorException } from '@nestjs/common'

export const hash = async (password: string) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        throw new InternalServerErrorException('Error hashing password');
    }
}