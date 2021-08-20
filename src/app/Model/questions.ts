import { Answers } from "./answers";
import { Comments } from "./comments";

export class Questions{
key:string;
questions:string;
token:string;
questionsHeader:string;
qDetails:string;
qCatagory:string;
qDetailsLink:string;
 
imageUrl:string;
imageUrlFile:File;
imageUrlName:string;

qBy:string;
qEntryDate:any;
tagingArea:string;
tagingUser:string;

qLikeCount:number;
comments:Comments[];
Answers:Answers[];
isViewd:boolean;
ViewCount:number;

queryParams:string;
}