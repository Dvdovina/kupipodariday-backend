import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { WishesModule } from './wishes/wishes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    WishlistsModule,
    OffersModule,
    WishesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
