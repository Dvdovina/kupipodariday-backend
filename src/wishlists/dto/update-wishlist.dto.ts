import { IsOptional, IsString, IsUrl, Length, IsNotEmpty, IsArray } from 'class-validator';

export class UpdateWishlistDto {
    @IsString()
    @IsOptional()
    @Length(1, 250)
    name: string;

    @IsUrl()
    @IsOptional()
    image: string;

    @IsOptional()
    @IsArray()
    itemsId: number[];
}