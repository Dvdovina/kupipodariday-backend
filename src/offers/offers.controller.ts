import {
    Controller,
    Get,
    Post,
    Req,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
    constructor(private readonly offersService: OffersService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createOfferDto: CreateOfferDto, @Req() req: any) {
        return this.offersService.create(createOfferDto, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.offersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.offersService.findOne(id);
    }
}
