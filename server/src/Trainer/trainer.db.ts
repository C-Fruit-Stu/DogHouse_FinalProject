import { MongoClient, ObjectId } from "mongodb";
import { credit, Post, TrainerUser } from "./trainer.type";

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
    finally{
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

export async function addonePost(post: Post,) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { title: post.title },
            { $addToSet: { Posts: post } }

        )
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function checkmongopostbyid(query: {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne(query, { projection });
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

