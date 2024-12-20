import { ObjectId, PullAllOperator } from "mongodb"
import {Costumer} from "../Costumer/Costumer.type"
export type TrainerUser = {
    _id?: ObjectId,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    dob: string,
    location: string,
    experience: string,
    image: string,
    phone: string,
    clientType:string, // 1 for trainer 2 for costumer
    payment: credit,
    stayLogIn?: boolean,
    trainingSchedule?: trainingSchedule[],
    Posts?: Post[],
    CostumersArr?:Costumer[],
    openDates?: opendates[],
    totalIncome:number
} 

export type credit = {
    id: ObjectId
    card: string,
    date: string,
    ccv: string
}

export type opendates = {
    name?: string,
    date:Date,
    time: string,
    price:number
}

export type trainingSchedule = {
    name?: string,
    date:Date,
    time: string,
    price:number
}

export type Comment = {
    id: string;
    text: string;
    userId: string;
  };
  
  export type Post = {
    id: string;
    title: string;
    description: string;
    image?: string;
    likes: number;
    likedByUser: boolean;
    comments: Comment[];
    isOwner: boolean;
    trainerEmail?:string;
  };