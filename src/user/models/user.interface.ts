import { tweetEntry } from "../../tweet/model/tweet.interface";

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
   
    tweetEntries?: tweetEntry[];
}
