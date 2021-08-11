import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { UserFollowingEntity } from '../models/followings.entity';
import { Repository, Like } from 'typeorm';
import { User } from '../models/user.interface';
 import { Observable, from, throwError } from 'rxjs';
 import { switchMap, map, catchError} from 'rxjs/operators';
 import { AuthService } from 'src/auth/service/auth.service';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserFollowingEntity) private readonly userFollowRepo: Repository<UserFollowingEntity>,
        private authService: AuthService
    ) {}

    create(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;
     
        
         return from(this.userRepository.save(newUser))
                .pipe(
                     map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }

    findOne(id: number): Observable<User> {
       
        return from(this.userRepository.findOne({id}, {relations: ['tweetEntries']})).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            } )
        )
                                          }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find())
          .pipe(
            map((users: User[]) => {
                users.forEach(function (v) {delete v.password});
                return users;
            })
        );
    }



    paginate(options: IPaginationOptions): Observable<Pagination<User>> {
        return from(paginate<User>(this.userRepository, options)).pipe(
            map((usersPageable: Pagination<User>) => {
                usersPageable.items.forEach(function (v) {delete v.password});
                return usersPageable;
            })
        )
    }

    

    

    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    // validateUser(email: string, password: string): Observable<User> {
    //     return from(this.userRepository.findOne({email}, {select: ['id', 'password', 'name', 'username', 'email', 'role', 'profileImage']})).pipe(
    //         switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
    //             map((match: boolean) => {
    //                 if(match) {
    //                     const {password, ...result} = user;
    //                     return result;
    //                 } else {
    //                     throw Error;
    //                 }
    //             })
    //         ))
    //     )

    // }
    validateUser(email: string, password: string): Observable<User> {
        return this.findByMail(email).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if(match) {
                        const {password, ...result} = user;
                        return result;
                    } else {
                        throw Error;
                    }
                })
            ))
        )

    }

    findByMail(email: string): Observable<User> {
        return from(this.userRepository.findOne({email}));
    }
    public async createUserFollowRelation(
        follower: UserEntity,
        followeeId: number,
      ) {
        const followee = await this.findOne(followeeId);
        if (!followee) {
          return "user not found"
        }
    //    const newFollow = await this.userFollowRepo.save({
    // //       follower,
    // //       followee,
    // //     });
    // //     return newFollow.followee;
    // //   }
                        }
                     }
                    