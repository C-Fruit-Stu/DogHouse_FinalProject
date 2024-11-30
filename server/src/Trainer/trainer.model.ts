import { ObjectId } from "mongodb";
import { checkIfDocumentExists, FindUserByEmail, findUsers, insertUser, updateDoc, deleteUser, decativateUser, NewPassfunc, UpdateCard, addonePost, checkmongopostbyid, FindAllPosts, decativatePost, newTrainingFunc, deleteTrainingFunc, openTraining, closeTraining, findAllTrainers, userinID, addCostumerEmail, Updateuserinfo, getTrainerSchedulesByEmail, addPaymentToClient,removeScheduleByDate, updateOnePost } from "./trainer.db";

import { credit, Post, TrainerUser, Comment, trainingSchedule, opendates } from "./trainer.type";
import { get } from "http";


export async function getAllUsers() {
    let query = {
        $or: [
            { isActive: { $exists: false } },
            { isActive: true }
        ]
    }
    return await findUsers(query);
}

export async function getAllTrainersInfo() {
    try {
        let query = { clientType: "1" };
        let projection = {
            first_name: 1,
            last_name: 1,
            email: 1
        };
        let trainers = await findUsers(query, projection);
        console.log('Trainers fetched:', trainers); // Log the trainers to ensure the data is correct
        return trainers;
    } catch (error) {
        console.error('Error in getAllTrainersInfo:', error);
        throw error;
    }
}



// export async function getAllTrainersInfo() {
//     try {
//         let query = {
//             clientType: "1"
//         };
//         const trainers = await findUsers(query);
//         return trainers;
//     } catch (error) {
//         console.error('Error in getAllTrainersInfo:', error);
//         throw error;
//     }
// }


export async function getAllPosts() {
    let query = {
        $or: [
            { Posts: { $exists: true } },
            { Posts: true }
        ]
    }
}
export async function getAllPosts1() {
    let query = {
        $or: [
            { Posts: { $exists: true } },
            { Posts: true }
        ]
    }
    const projection = { Posts: 1, _id: 0 };
    return await FindAllPosts(query, projection);
}

export async function findUserById(id: string) {
    try {
        let query = { id }
        let users = await userinID(query);
        return users;
    } catch (error) {
        throw error;
    }

}

export async function LoginUser(email: string) {
    try {
        let user = await FindUserByEmail(email);
        console.log("Model: " + user)
        return user;
    } catch (error) {
        throw error;
    }
}

export async function RegisterUser(user: TrainerUser) {
    try {
        //האם המייל קיים כבר במאגר
        let query = { email: user.email }
        let userExists = await checkIfDocumentExists(query);
        if (userExists > 0) {
            console.log('userExists', userExists);
            return null;
            throw new Error("email already exists!");
        }

        //הצפנת הסיסמה

        //הוספה למאגר
        return await insertUser(user);
    } catch (error) {
        throw error;
    }
}

export async function showPostsByEmail(email: string) {
    try {
        const query = { email };
        const projection = { Posts: 1, _id: 0 };
        const users = await findUsers(query, projection);
        console.log('User fetched:', users);  // Log the fetched user(s)
        return users[0]?.Posts || [];  // Return posts array or empty if no posts
    } catch (error) {
        throw error;
    }
}



// export async function updateUser(id: string, email: string, password: string, location: any) {
//     try {
//         let user: Partial<TrainerUser> = {
//             email, password, _id: new ObjectId(id), location}
//         console.log(user)
//         return await updateDoc(user);
//     } catch (error) {
//         throw error;
//     }
// }



export async function removeUser(id: string) {
    try {
        return await deleteUser(id);
    } catch (error) {
        throw error;
    }
}

export async function deactiveUser(id: string) {
    try {
        return await decativateUser(id);
    } catch (error) {
        throw error;
    }
}

export async function deactivePost(id: string, title: string) {
    try {
        return await decativatePost(id, title)
    } catch (error) {
        throw error
    }
}

export async function ChangePass(password: string, id: string) {
    try {
        let newPass: string = password
        let _id = new ObjectId(id)
        return await NewPassfunc(newPass, _id);
    } catch (error) {
        throw error;
    }
}

export async function checkUpdate(card: string, date: string, ccv: string, id: ObjectId) {
    try {
        let credit1: credit = { card, date, ccv, id }
        console.log(credit1)
        return await UpdateCard(credit1);
    } catch (error) {
        throw error;
    }
}


export async function addAnotherPost(email: string, id: string, title: string, description: string, image: string, likes: number, likedByUser: boolean, comments: Comment[], isOwner: boolean) {
    try {
        let post: Post = { id, title, description, image, likes, likedByUser, comments, isOwner }
        return await addonePost(email, post);
    } catch (error) {
        throw error;
    }
}

export async function updatePost( id: string, title: string, description: string, image: string, likes: number, likedByUser: boolean, comments: Comment[], isOwner: boolean) {
    try {
        let post: Post = { id, title, description, image, likes, likedByUser, comments, isOwner }
        console.log(post)
        console.log(id)
        return await updateOnePost(post,id);
    } catch (error) {
        throw error;
    }
}

// אולי יהיה תקלה
export async function showallpostsbyid(title: string) {
    try {
        let query = { title }
        const projection = { Posts: 1, _id: 0 };
        let users = await findUsers(query, projection);
        return users[0];
    } catch (error) {
        throw error;
    }
}
export async function addEmailToArray(TrainerEmail: string, CostumerEmail: string) {
    try {
        return await addCostumerEmail(TrainerEmail, CostumerEmail);
    } catch (error) {
        throw error;
    }
}

// export async function AddDate(date: string,time:string, id: string) {
//     try {
//         let _id = new ObjectId(id);
//         let newdate : Dates =  { date ,time }
//         return await newdates(newdate,_id)
//     } catch (error) {
//         throw error;
//     }
// }

// export async function DeleteDate(date: string,time:string, id: string) {
//     try {
//         let _id = new ObjectId(id);
//         let newdate : Dates =  { date ,time }
//         console.log(newdate)
//         return await declareDate(newdate,_id)
//     } catch (error) {
//         throw error;
//     }
// }

export async function AddTraining(email: string, name: string, date: Date, time: string, price: number) {
    try {
        let newTraining: trainingSchedule = { name, date, time, price }
        return await newTrainingFunc(newTraining, email);
    } catch (error) {
        throw error;
    }
}

export async function DeleteTraining(email: string, name: string, date: Date, time: string, price: number) {
    try {
        let newTraining: trainingSchedule = { name, date, time, price }
        return await deleteTrainingFunc(newTraining, email);
    } catch (error) {
        throw error;
    }
}

export async function OpenTraining(date: Date, name: string, time: string, price: number, email: string) {
    try {
        let newdate: opendates = { date, name, time, price }
        return await openTraining(newdate, email);
    }
    catch (error) {
        throw error;
    }
}

export async function CloseTraining(date: Date, name: string, time: string, price: number, email: string) {
    try {
        let newdate: opendates = { date, name, time, price }
        return await closeTraining(newdate, email);
    }
    catch (error) {
        throw error;
    }
}

export async function getAllScheduleInfo(HisTrainer: string[]) {
    try {
        const schedules: any[] = [];

        for (const trainerEmail of HisTrainer) {
            try {
                const trainerSchedules = await getTrainerSchedulesByEmail(trainerEmail);

                if (trainerSchedules && trainerSchedules.length > 0) {
                    trainerSchedules.forEach((schedule: any) => {
                        schedule.trainerEmail = trainerEmail; // Add trainer email to schedule
                    });
                    schedules.push(...trainerSchedules);
                }
            } catch (error) {
                console.error(`Error fetching schedules for ${trainerEmail}:`, error);
            }
        }

        console.log("Final aggregated schedules:", schedules); // Debugging log
        return schedules;
    } catch (error) {
        console.error("Error in getAllScheduleInfo:", error);
        throw error;
    }
}







export async function getUserByEmail(email: string) {
    try {
        return await FindUserByEmail(email);
    } catch (error) {
        throw error;
    }
}

export async function CheckInfo(id: string, first_name: string, last_name: string, email: string, phone: string, dob: string, image: string, update_details: string, clientType: string, location: string, password: string, payment: credit, experience: string, totalIncome: number) {
    try {
        let updateuser: TrainerUser = {
            _id: new ObjectId(id), first_name, last_name, email, phone, dob, image, clientType, location, password, payment,
            experience,
            totalIncome
        };
        console.log(updateuser)
        return await Updateuserinfo(updateuser)
    } catch (error) {
        throw error;
    }
}


export async function addPaymentToTotalIncome(email: string, price: number, date: string) {
    try {
        // Increment total income
        await addPaymentToClient(email, price);

        // Remove the schedule
        return await removeScheduleByDate(email, date);
    } catch (error) {
        throw error;
    }
}



