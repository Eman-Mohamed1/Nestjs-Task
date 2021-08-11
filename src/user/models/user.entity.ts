import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { tweetEntity } from "../../tweet/model/tweet.entity";



@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

   @Column({unique: true,nullable: true})
     email: string;

    @Column({select: false,nullable: true})
    password: string;

   
    @OneToMany(type => tweetEntity, tweetEntity => tweetEntity.author)
    tweetEntries: tweetEntity[];

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}