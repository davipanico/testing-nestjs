import { ApiProperty } from '@nestjs/swagger';
import { user } from '@prisma/client';

export class UserEntity implements user {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    active: number;
}
