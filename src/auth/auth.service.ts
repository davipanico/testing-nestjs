import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'src/utils/argon2';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
      const user = await this.usersService.findByEmail(email);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const { password, ...result } = user;
      // TODO: Generate a JWT and return it here
      // instead of the user object
      return result;
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
      const user = await this.usersService.findByEmail(createUserDto.email);
      if (user) {
        throw new ConflictException(`Email already in use`);
      }
      
      createUserDto.password = await hash(createUserDto.password);
      return this.usersService.create(createUserDto);
    }
}
