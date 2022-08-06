import { Article } from 'src/article/models/article.model';
import { Comment } from 'src/comment/entities/comment.model';
import { Node } from 'src/pagination/models/node.model';
export declare class User extends Node {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    articles: Article[];
    comments: Comment[];
}
