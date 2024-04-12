import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, MaxLength, IsNumber, IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
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
  @Exclude({ toPlainOnly: true })
  password: string;

  @IsOptional()
  @IsNumber()
  @MaxLength(1)
  active: 1
}