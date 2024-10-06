import { ObjectId } from "mongodb";
import { checkIfDocumentExists,FindUserByEmail, findUsers, insertUser, updateDoc, deleteUser, decativateUser, NewPassfunc, UpdateCard, addonePost, checkmongopostbyid, FindAllPosts, decativatePost, newTrainingFunc, deleteTrainingFunc, openTraining } from "./trainer.db";
import { credit, Post, TrainerUser,Comment, trainingSchedule, opendates } from "./trainer.type";

export async function getAllUsers() {
    let query = {
        $or: [
            { isActive: { $exists: false } },
            { isActive: true }
        ]
    }
    return await findUsers(query);
}

export async function getAllPosts1() {
    let query = {
        $or: [
            { Posts: { $exists: true } },
            { Posts: true }
        ]
    }
    const projection = { Posts: 1, _id: 0 };
    return await FindAllPosts(query,projection);
}

export async function findUserById(id: string) {
    try {
        let query = { id }
        let users = await findUsers(query);
        return users[0];
    } catch (error) {
        throw error;
    }

}

export async function LoginUser(email: string) {
    try {
        let user = await FindUserByEmail(email);
        console.log("Model: "+user)
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

export async function deactivePost(id: string,title:string) {
    try {
        return await decativatePost(id,title)
    } catch (error) {
        throw error
    }
}

export async function ChangePass(password: string,id:string) {
    try {
        let newPass: string = password
        let _id = new ObjectId(id)
        return await NewPassfunc(newPass,_id);
    } catch (error) {
        throw error;
    }
}

export async function checkUpdate(card: string, date: string, ccv: string) {
    try {
        let credit1: credit = { card, date, ccv }
        return await UpdateCard(credit1);
    } catch (error) {
        throw error;
    }
}


export async function addAnotherPost(email: string,id: string,title: string, description: string, image: string,likes: number,likedByUser: boolean,comments: Comment[],isOwner: boolean) {
    try {
        let post : Post = { id, title, description, image, likes, likedByUser, comments, isOwner }
        return await addonePost(email,post);
    } catch (error) {
        throw error;
    }
}

// אולי יהיה תקלה
export async function showallpostsbyid(title:string) {
    try {
        let query = { title }
        const projection = { Posts: 1, _id: 0 };
        let users = await findUsers(query,projection);
        return users[0];
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

export async function AddTraining(email:string,name:string,date:Date,time:string) {
    try {
        let newTraining : trainingSchedule =  { name ,date,time }
        return await newTrainingFunc(newTraining,email);
    } catch (error) {
        throw error;
    }
}

export async function DeleteTraining(email:string,name:string,date:Date,time:string) {
    try {
        let newTraining : trainingSchedule =  { name ,date,time }
        return await deleteTrainingFunc(newTraining,email);
    } catch (error) {
        throw error;
    }
}

export async function OpenTraining(date:Date,time:string,email:string) {
    try {
        let newdate : opendates = { date,time }
        return await openTraining(newdate,email); 
    }
    catch (error) {
        throw error;
    }
}