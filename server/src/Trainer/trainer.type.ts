import { ObjectId, PullAllOperator } from "mongodb"

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
    trainingOpenDates?: trainingOpenDates[],
    Posts?: Post[]
} 

export type credit = {
    id? :ObjectId,
    card: string,
    date: string,
    ccv: string
}

export type trainingOpenDates = {
    id?: ObjectId,
    date:string,
    time: string
}

export type Post = {
    id?: ObjectId
    title: string,
    description: string,
    image?: string
}