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


export async function userinID(query: {}) {
    let mongo = new MongoClient(DB_INFO.connection)
    try {
        await mongo.connect();

        let user = await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne(query)
        console.log("user===>", user)
        return user
    } catch (error) {
        throw error
    }
    finally {
        mongo.close();
    }
}

export async function findAllTrainers() {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();
        const projection = {
            first_name: 1,
            last_name: 1,
            email: 1,
            dob: 1,
            experience: 1,
            phone: 1,
            image: 1,
            Posts: 1
        };
        let trainers = await mongo.db(DB_INFO.name)
            .collection(DB_INFO.collection)
            .find({ clientType: "1" }, { projection })
            .toArray();
        console.log('Trainers fetched from DB:', trainers);
        return trainers;
    } catch (error) {
        console.error('Error fetching trainers from DB:', error);
        throw error;
    } finally {
        await mongo.close();
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
export async function addCostumerEmail(TrainerEmail: string, CostumerEmail: string) {
    const mongo = new MongoClient(DB_INFO.connection);
    try {
        // Case-insensitive match for email
        const matchedDoc = await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne({
            email: { $regex: `^${TrainerEmail.trim()}$`, $options: "i" }
        });

        console.log("Trainer Email:", TrainerEmail);
        console.log("Matched document:", matchedDoc);

        if (matchedDoc) {
            return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
                { email: { $regex: `^${TrainerEmail.trim()}$`, $options: "i" } },
                { $addToSet: { CostumersArr: CostumerEmail.trim() } } // Add user to trainer's CostumersArr
            );
        } else {
            console.log("No document found with the specified trainer email");
            return null;
        }
    } catch (error) {
        console.error("Error updating trainer document:", error);
        throw error;
    } finally {
        await mongo.close();
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
            { _id: card1.id },
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






export async function updateOnePost(post: Post, id: string) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { _id: new ObjectId(id) },
            { $set: { Posts: post } }
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
    const mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();

        const trainer = await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne({ email });

        if (trainer && trainer.trainingSchedule?.length > 0 && trainer.trainingSchedule[0]?.time === "") {
            return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
                { email },
                { $set: { "trainingSchedule.0": trainingSchedulea } } // Replace the first element in the array
            );
        } else {
            // Add the new object to the array
            return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
                { email },
                { $addToSet: { trainingSchedule: trainingSchedulea } }
            );
        }
    } catch (error) {
        throw error;
    } finally {
        await mongo.close();
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


export async function getTrainerSchedulesByEmail(trainerEmail: string) {
    const mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();
        const trainer = await mongo
            .db(DB_INFO.name)
            .collection(DB_INFO.collection)
            .findOne(
                { email: trainerEmail },
                { projection: { trainingSchedule: 1, _id: 0 } }
            );
        const validSchedules = (trainer?.trainingSchedule || []).filter(
            (schedule: any) => schedule.price !== undefined && schedule.price > 0
        );

        return validSchedules;
    } catch (error) {
        console.error(`Error in getTrainerSchedulesByEmail for ${trainerEmail}:`, error);
        throw error;
    } finally {
        await mongo.close();
    }
}







export async function Updateuserinfo(updateuser: TrainerUser) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { _id: updateuser._id },
            { $set: updateuser }
        )
    } catch (error) {
        throw error
    }
    finally {
        mongo.close();
    }
}

// Increment totalIncome
export async function addPaymentToClient(email: string, price: number) {
    const mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();
        return await mongo
            .db(DB_INFO.name)
            .collection(DB_INFO.collection)
            .updateOne(
                { email },
                { $inc: { totalIncome: price } }
            );
    } catch (error) {
        throw error;
    } finally {
        mongo.close();
    }
}

export async function removeScheduleByDate(email: string, date: string) {
    const mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();

        // Ensure the `date` is in the same format as stored in the database (DD/MM/YYYY)
        const normalizedDate = date.includes("-")
            ? date.split("-").reverse().join("/")
            : date;

        // Perform the `$pull` operation
        const result = await mongo
            .db(DB_INFO.name)
            .collection(DB_INFO.collection)
            .updateOne(
                { email },
                { $pull: { trainingSchedule: { date: normalizedDate } } as any }
            );

        return result;
    } catch (error) {
        console.error("Error in removeScheduleByDate:", error);
        throw error;
    } finally {
        await mongo.close();
    }
}


