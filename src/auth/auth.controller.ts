import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    async signin(@Req() req) {
        return this.authService.signin(req.user);
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return this.authService.signin(user);
    }
}
