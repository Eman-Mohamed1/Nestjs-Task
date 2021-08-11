import { Injectable} from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { tweetEntry } from '../model/tweet.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { tweetEntity } from '../model/tweet.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';
import {  map } from 'rxjs/operators';
import { Pagination, IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';


@Injectable()
export class tweetService {

    constructor(
        @InjectRepository(tweetEntity) private readonly tweetRepository: Repository<tweetEntity>,
        private userService: UserService
    ) {}


    // create(user: User, tweetEntry: tweetEntry): Observable<tweetEntry> {
    //     tweetEntry.author = user;
    //             return from(this.tweetRepository.save(tweetEntry));
    //         })
    //     )
    // }

    create(tweetEntry: tweetEntry): Observable<tweetEntry> {
         return from(this.tweetRepository.save(tweetEntry));
    }
    
   
    findAll(): Observable<tweetEntry[]> {
        return from(this.tweetRepository.find({relations: ['author']}));
    }

    paginateAll(options: IPaginationOptions): Observable<Pagination<tweetEntry>> {
        return from(paginate<tweetEntry>(this.tweetRepository, options, {
            relations: ['author']
        })).pipe(
            map((tweetEntries: Pagination<tweetEntry>) => tweetEntries)
        )
    }

   

    findOne(id: number): Observable<tweetEntry> {
        return from(this.tweetRepository.findOne({id}, {relations: ['author']}));
    }

    findByUser(userId: number): Observable<tweetEntry[]> {
        return from(this.tweetRepository.find({
            where: {
                author: userId
            },
            relations: ['author']
        })).pipe(map((tweetEntries: tweetEntry[]) => tweetEntries))
    }

    
}