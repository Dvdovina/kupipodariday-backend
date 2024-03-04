import {
    Controller,
    Get,
    Body,
    Patch,
    UseGuards,
    Req,
    Post,
    Param,
    Delete
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';


@Controller('wishlists')
export class WishlistsController {

    constructor(private readonly wishlistsService: WishlistsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
        try {
            return await this.wishlistsService.create(req.user, createWishlistDto);
        } catch (err) {
            console.log(err);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.wishlistsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.wishlistsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateOne(
        @Param('id') id: number,
        @Body() updateWishlistDto: UpdateWishlistDto,
        @Req() req: any,
    ) {
        return this.wishlistsService.updateOne(id, updateWishlistDto, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    removeOne(@Param('id') id: number, @Req() req: any) {
        return this.wishlistsService.removeOne(id, req.user.id);
    }
}
