import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Query, UseInterceptors, UploadedFile, Request, Res } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UserEntity } from "../models/user.entity";
import { Userdec } from 'src/auth/User.decorator';



@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    create(@Body() user: User): Observable<User | Object> {
        return this.userService.create(user)
            .pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
    }

    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll();
    }


    @Get()
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Observable<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;
        return this.userService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/users' });
        
                                         }

    @Put('/:userid/follow')
            async followUser(
                @ Userdec() follower: UserEntity,
                @ Param('userid') followeeId: string,
            ): Promise<UserEntity> {
                const followedUser = await this.userService.createUserFollowRelation(
                follower,
                followeeId,
                );
                return followedUser;
            }


            @Get('/:userid/followers')
            async getFollowersOfUser(): Promise<UserEntity[]> {
              return [];
            }

            @Put('/:userid/followees')
                async getFolloweesOfUser(): Promise<UserEntity[]> {
                    return [];
                }
}