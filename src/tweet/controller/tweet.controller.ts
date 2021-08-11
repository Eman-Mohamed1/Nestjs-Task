import { Controller, Post, Body, Request, UseGuards, Get, Query, Param, Delete, Put, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { tweetService } from '../service/tweet.service';
import { Observable, of } from 'rxjs';
import { tweetEntry } from '../model/tweet.interface';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { tweetEntity } from '../model/tweet.entity';
// import { UserIsAuthorGuard } from '../guards/user-is-author.guard';

import { catchError, map, tap } from 'rxjs/operators';


export const tweet_ENTRIES_URL ='http://localhost:3000/tweet-entries';



@Controller('tweet-entries')
export class tweetController {

    constructor(private tweetService: tweetService) {}


    // // @UseGuards(JwtAuthGuard) for specific user so we need to use guard to payload user 
    // @Post()
    // create(@Body()tweetEntry: tweetEntry, @Request() req): Observable<tweetEntry> {
    //     const user = req.user;
    //     return this.tweetService.create(user, tweetEntry);
    // }

    @Post()
    create(@Body() tweetEntity: tweetEntity): Observable<tweetEntity | Object> {
        return this.tweetService.create(tweetEntity)
            .pipe(
            map((tweetEntity: tweetEntity) => tweetEntity),
            catchError(err => of({ error: err.message }))
        );
    }





    @Get()
    findtweetEntries(@Query('userId') userId: number): Observable<tweetEntry[]> {
        if(userId == null) {
            return this.tweetService.findAll();
        } else {
            return this.tweetService.findByUser(userId); //return tweets of specific user
        }
    }

    @Get('')
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        limit = limit > 100 ? 100 : limit;
        

        return this.tweetService.paginateAll({
            limit: Number(limit),
            page: Number(page),
            route: tweet_ENTRIES_URL
        })
    }

    

    @Get(':id')
    findOne(@Param('id') id: number): Observable<tweetEntry> {
        return this.tweetService.findOne(id);
    }

    
}