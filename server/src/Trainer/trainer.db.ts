import { MongoClient, ObjectId } from "mongodb";
import { credit, opendates, Post, TrainerUser, trainingSchedule } from "./trainer.type";

const DB_INFO = {
    connection: process.env.CONNECTION_STRING as string,
    name: process.env.DB_NAME,
    collection: 'Trainers'
}

export async function findUsers(query = {}, projection = {}) {
    //מייצר את האובייקט שבאמצעותו נתחבר למסד הנתונים ונבצע שאילתות
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        //התחברות למסד הנתונים
        await mongo.connect();
        //ביצוע שאילתה
        let users = await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find(query, { projection }).toArray();
        console.log(users);
        return users;
    } catch (error) {
        throw error;
    }
    finally {
        //סגירת החיבור למסד הנתונים
        mongo.close();
    }
}

export async function findAllTrainers() {
    let mongo = new MongoClient(DB_INFO.connection);
    let query = { clientType: "1" };
    let projection = {
        first_name: 1,
        last_name: 1,
        Posts: 1,
        email: 1,
        dob: 1,
        experience: 1,
        phone: 1,
        image: 1,
        trainingSchedule: 1
    };

    try {
        await mongo.connect();
        console.log('Connected to MongoDB. Query:', query);
        const trainers = await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find(query, { projection }).toArray();
        console.log('Trainers found:', trainers);
        return trainers;
    } catch (error) {
        console.error('Error in findAllTrainers DB function:', error);
        throw error;
    } finally {
        mongo.close();
    }
}


export async function FindUserByEmail(email: string) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();
        let user = await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne({ email });
        if (user) {
            return user;
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}
export async function FindAllPosts(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        //התחברות למסד הנתונים
        await mongo.connect();
        //ביצוע שאילתה
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find(query, { projection }).toArray();
    } catch (error) {
        throw error;
    }
    finally {
        //סגירת החיבור למסד הנתונים
        mongo.close();
    }
}

export async function checkIfDocumentExists(query = {}) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        //התחברות למסד הנתונים
        await mongo.connect();
        //החזרת כמות המסמכים   
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).countDocuments(query);
    } catch (error) {
        throw error;
    }
    finally {
        //סגירת החיבור למסד הנתונים
        mongo.close();
    }
}

export async function insertUser(user: TrainerUser) {
    let mongo = new MongoClient(DB_INFO.connection);
    user._id = new ObjectId();
    console.log("This is DataBase new ObjectID: " + user)
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).insertOne(user);
    } catch (error) {
        throw error;
    } finally {
        mongo.close();
    }
}

export async function updateDoc(user: TrainerUser) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        //התחברות למסד הנתונים
        await mongo.connect();
        //עדכון המשתמש
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { id: user._id },
            { $set: user }
        );

    } catch (error) {
        throw error;
    }
    finally {
        //סגירת החיבור למסד הנתונים
        mongo.close();
    }
}


export async function deleteUser(id: string) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        //התחברות למסד הנתונים
        await mongo.connect();
        //מחיקת המשתמש
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).deleteOne(
            { _id: new ObjectId(id) }
        );

    } catch (error) {
        throw error;
    }
    finally {
        //סגירת החיבור למסד הנתונים
        mongo.close();
    }
}

export async function decativateUser(id: string) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();

        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { _id: new ObjectId(id) },
            { $set: { isActive: false } }
        );

    } catch (error) {
        throw error;
    }
    finally {
        //סגירת החיבור למסד הנתונים
        mongo.close();
    }
}



export async function decativatePost(id: string, title: string) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();

        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { _id: new ObjectId(id) },
            { $pull: { 'Posts': { 'title': title } } as any }
            //{ $pull: { 'openDates': date } as any}
        );

    } catch (error) {
        throw error
    }
    finally {
        mongo.close();
    }
}

export async function NewPassfunc(password: string, id: ObjectId) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { _id: id },
            { $set: { password: password } }
        )
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function UpdateCard(card1: credit) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { card: card1.card },
            { $set: { payment: card1 } }
        );
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}


// export async function newdates(date: Dates, id: ObjectId) {
//     let mongo = new MongoClient(DB_INFO.connection);

//     try {
//         await mongo.connect();
//         return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
//             { _id: id },
//             { $addToSet: { openDates: date } }
//         )
//     } catch (error) {
//         throw error;
//     }
//     finally {
//         mongo.close();
//     }
// }

// export async function declareDate(date: Dates, id: ObjectId) {
//     let mongo = new MongoClient(DB_INFO.connection);

//     try {
//         await mongo.connect()
//         return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
//             { _id: id },
//             { $pull: { 'openDates': date } as any}
//         )
//     } catch (error) {
//         throw error;
//     }
//     finally {
//         mongo.close();
//     }
// }

export async function addonePost(email: string, post: Post) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { email },
            { $addToSet: { Posts: post } }
        );
    } catch (error) {
        throw error;
    } finally {
        mongo.close();
    }
}

export async function checkmongopostbyid(query: {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne(query, { projection });
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function newTrainingFunc(trainingSchedulea: trainingSchedule, email: string) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { email },
            { $addToSet: { trainingSchedule: trainingSchedulea } }
        );
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function deleteTrainingFunc(trainingSchedulea: trainingSchedule, email: string) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { email },
            { $pull: { 'trainingSchedule': trainingSchedulea } as any }
        )
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }

}

export async function openTraining(newdate: opendates, email: string) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { email },
            { $addToSet: { openDates: newdate } }
        );
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }

}

export async function closeTraining(newdate: opendates, email: string) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { email },
            { $pull: { 'openDates': newdate } as any }
        );
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }

}

