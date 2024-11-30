import { TrainerType } from "./trainer_type";

export type CoustumerType = {
    id?: string,
    dogBreed: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    dob: string,
    location: string,
    image: string,
    phone: string,
    update_details: string,
    clientType:string, // 1 for trainer 2 for costumer
    payment: {
        id?: string
        card: string,
        date: string,
        ccv: string
    }
    stayLogIn?: boolean;
    trainingSchedule?:[
        {
            email?:string,
            name?: string, // שם המאמן
            date: Date, // תאריך האימון
            time: string, // יש להזין מאיזה שעה לאיזה שעה
            price?: number
        }
    ],

    HisTrainer?: string[]
}


export type trainingSchedule = {
    email?: string,
    name?: string, // שם המאמן
    date: Date, // תאריך האימון
    time: string, // יש להזין מאיזה שעה לאיזה שעה
    price?: number
}