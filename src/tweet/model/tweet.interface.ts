import { User } from "src/user/models/user.interface";

export interface tweetEntry {
    id?: number;
    body?: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
    author?: User;
    publishedDate?: Date;
    
}