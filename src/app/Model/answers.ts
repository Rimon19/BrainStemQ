import { Comments } from "./comments";
import { Questions } from "./questions";

export class Answers{
 key:string;
 qId:string;
qToken:string;
answerHeder:string;
answerDetails:string;
aRelavantLink:string;

imageUrl:string;
imageUrlFile:File;
imageUrlName:string;

aBy:string;
aEntryDate:any;
tagingArea:string;
tagingUser:string;
aLikeCount:number;
comments:Comments[]
questions:Questions[]
isViewd:boolean;
ViewCount:number;

    }