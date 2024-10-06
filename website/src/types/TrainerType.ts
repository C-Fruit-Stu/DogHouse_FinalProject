

export type TrainerType = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    dob: string,
    location: string,
    experience: string,
    image: string,
    phone: string,
    clientType: string, // 1 for trainer 2 for costumer
    payment: {
        card: string,
        date: string,
        ccv: string
    }
    stayLogIn?: boolean,
    trainingSchedule?: trainingSchedule[],
    Posts?: Post[],
    CostumersArr?: CoustumerType[],
    openDates?: opendates[]
<<<<<<< Updated upstream
}

export type opendates = {
    date: Date,
    time: string
=======
>>>>>>> Stashed changes
}

export type trainingSchedule = {
    name?: string,
    date: Date,
    time: string
}

export type opendates = {
    date: Date,
    time: string
}

export type Comment = {
    id: string;
    text: string;
    userId: string; // to associate the comment with a user
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
  };


export type CoustumerType = {
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
        card: string,
        date: string,
        ccv: string
    }
    stayLogIn?: boolean;
    trainingSchedule?:[
        {
            name?: string, // שם המאמן
            date: Date, // תאריך האימון
            time: string, // יש להזין מאיזה שעה לאיזה שעה
        }
    ],

    HisTrainer: Partial<TrainerType>[]
}


