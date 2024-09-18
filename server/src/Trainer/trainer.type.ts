import { ObjectId, PullAllOperator } from "mongodb"
import {Costumer} from "../Costumer/Costumer.type"
export type TrainerUser = {
    id?: ObjectId,
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
    CostumersArr?:Costumer[]
} 

export type credit = {
    card: string,
    date: string,
    ccv: string
}

export type trainingSchedule = {
    name?: string,
    date:Date,
    time: string
}

export type Post = {
    title: string,
    description: string,
    image?: string
}