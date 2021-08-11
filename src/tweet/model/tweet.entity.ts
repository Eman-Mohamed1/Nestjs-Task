import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne } from "typeorm";
import { UserEntity } from "src/user/models/user.entity";


@Entity('tweet_entry')
export class tweetEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    body: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;    

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }

    @Column({default: 0})
    likes: number;   

    @Column({nullable: true})
    publishedDate: Date;


     @ManyToOne(type => UserEntity, user => user.tweetEntries)
     author: UserEntity;
}