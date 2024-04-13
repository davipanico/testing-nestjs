import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'src/utils/argon2';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(signInDto: SignInDto): Promise<any> {
        const user = await this.usersService.findByEmail(signInDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await verify(signInDto.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
      
        return this.createAccessToken(user.id);
    }

    async signUp(SignUpDto: SignUpDto): Promise<any> {

        if (SignUpDto.password !== SignUpDto.confirmPassword) {
            throw new ConflictException(`Passwords don't match`);
        }

        const user = await this.usersService.findByEmail(SignUpDto.email);
        if (user) {
            throw new ConflictException(`Email already in use`);
        }

        const newUser: CreateUserDto = {
            name: SignUpDto.name,
            email: SignUpDto.email,
            password: await hash(SignUpDto.password),
            active: 1
        }

        const createdUser = await this.usersService.create(newUser);

        return this.createAccessToken(createdUser.id);
    }

    createAccessToken(userId: number) {
        return { access_token: this.jwtService.sign({ sub: userId }) };
    }
}
