import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {tweetEntity } from './model/tweet.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import {tweetController } from './controller/tweet.controller';
import { tweetService } from './service/tweet.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([tweetEntity]),
        AuthModule,
        UserModule
    ],
    controllers: [tweetController],
    providers: [tweetService]
})
export class tweetModule {}