import {
    Controller,
    Get,
    Body,
    Patch,
    UseGuards,
    Req,
    Post
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async findMe(@Req() req): Promise<User> {
        return await this.usersService.findById(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async updateOne(@Req() req, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.updateOne(req.user.id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('find')
    async findMany(@Body() findUserDto: FindUserDto): Promise<User[]> {
      return await this.usersService.findMany(findUserDto);
    }
}
