import { ObjectId } from "mongodb";
import { TrainerUser } from "../Trainer/trainer.type";
export type Costumer = {
    id?: ObjectId,
    dogBreed? : string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    dob: string,
    location: string,
    image: string,
    phone: string,
    update_details: string,
    clientType:string // 1 for trainer 2 for costumer
    payment: credit
    stayLogIn?: boolean;
    trainingSchedule?:[
        {
            name?: string, // שם המאמן
            date: Date, // תאריך האימון
            time: string, // יש להזין מאיזה שעה לאיזה שעה
        }
    ],
    HisTrainer?: Partial<TrainerUser>[]

}

export type credit = {
    card: string,
    date: string,
    cvv: string
}