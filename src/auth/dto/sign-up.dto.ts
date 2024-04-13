import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength,IsEmail, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsEmail({}, { message: 'invalid email' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({}, { message: 'Your password is too weak, try another one' })
  @MaxLength(60)
  @ApiProperty({ required: true })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiProperty({ required: true })
  confirmPassword: string
}