import { Request, Response } from "express";
import { getAllUsers, findUserById, LoginUser, RegisterUser, removeUser, deactiveUser, ChangePass, checkUpdate, addAnotherPost, showallpostsbyid, getAllPosts1, deactivePost, AddTraining, DeleteTraining, OpenTraining, CloseTraining, getAllTrainersInfo, showPostsByEmail, getUserByEmail, addEmailToArray, getAllScheduleInfo, CheckInfo, addPaymentToTotalIncome, updatePost } from "./trainer.model";

import { TrainerUser } from "./trainer.type";
import { decryptPassword, encryptPassword } from "../utils/utils";
import { ObjectId } from "mongodb";
import e from "cors";
import exp from "constants";

export async function getAll(req: Request, res: Response) {
    try {
        let users = await getAllUsers();
        if (users?.length == 0)
            res.status(200).json({ message: 'empty users', users });
        else
            res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error });
    }
}


export async function getAllTrainers(req: Request, res: Response) {
    try {
        console.log('Received request to fetch all trainers');
        let trainers = await getAllTrainersInfo();
        console.log('Fetched trainers:', trainers);

        if (trainers.length === 0) {
            return res.status(200).json({ message: 'No trainers found', trainers });
        }
        return res.status(200).json({ trainers });
    } catch (error) {
        console.error('Error fetching trainers:', error);
        return res.status(500).json({ message: 'Error fetching trainers', error });
    }
}





export async function getUserById(req: Request, res: Response) {
    let { id } = req.params; //url שליפת הפרמטר מתוך ה 
    if (id.length != 24) {
        return res.status(500).json({ message: 'must provide a valid id' });
    }
    try {
        let user = await findUserById(id);
        if (!user)
            res.status(400).json({ message: 'user not found' });
        else
            res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function LoginTrainer(req: Request, res: Response) {
    let { email, password } = req.body;
    //בדיקה - אם לא נשלחו אימייל וסיסמה תחזיר את ההודעה 
    if (!email || !password)
        return res.status(400).json({ message: 'invalid email or password' });
    try {
        let user = await LoginUser(email);
        if (!user)
            res.status(404).json({ message: 'user not found' });
        //הפעלת הפונקציה לפענוח הסיסמה
        else if (decryptPassword(password, user.password))
            res.status(200).json({ user });
        else
            res.status(400).json({ message: 'invalid email or password' });

    } catch (error) {
        res.status(500).json({ error });
    }
}



export async function RegisterTrainer(req: Request, res: Response) {
    let { first_name, last_name, email, password, dob, location, experience, image, phone, clientType, payment, trainingSchedule, Posts, CostumersArr, totalIncome } = req.body;

    if (!first_name || !last_name || !password || !email) {
        return res.status(400).json({ message: 'missing info' });
    }

    try {
        password = encryptPassword(password);
        console.log("This is Server / Controler  " + password);
        let trainer: TrainerUser = { first_name, last_name, email, password, dob, location, experience, image, phone, clientType, payment, trainingSchedule, Posts, CostumersArr, totalIncome };

        let result = await RegisterUser(trainer);
        if (result == null)
            return res.status(400).json({ message: 'email already exists' });
        else {
            return res.status(201).json({ trainer });
        }
    } catch (error) {
        console.error(error);  // Improved error logging
        return res.status(500).json({ error });
    }
}

// export async function update(req: Request, res: Response) {
//     let { id } = req.params;
//     let { email, password, location } = req.body;

//     if (!id || id.length < 24)
//         return res.status(400).json({ message: 'must provide a valid id' });

//     if (!email || !password)
//         return res.status(400).json({ message: 'must provide an email and full_name' });

//     try {
//         password = encryptPassword(password);
//         let result = await updateUser(id, email, password, location);
//         res.status(201).json({ result });
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// }

export async function physicDeleteUser(req: Request, res: Response) {
    let { id } = req.params;
    console.log('id ====>', id)
    if (!id || id.length < 24)
        return res.status(400).json({ message: 'must provide a valid id' });

    try {
        let result = await removeUser(id);
        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function logicDeleteUser(req: Request, res: Response) {
    let { id } = req.params;

    if (!id || id.length < 24)
        return res.status(400).json({ message: 'must provide a valid id' });

    try {
        let result = await deactiveUser(id);
        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function UpdatePassword(req: Request, res: Response) {
    let { id } = req.params;
    let { password } = req.body;

    if (!id || id.length < 24)
        return res.status(400).json({ msg: "invalid id" })

    if (!password)
        return res.status(400).json({ msg: "invalid info" })

    try {
        password = encryptPassword(password);
        let result = await ChangePass(password, id);
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function updatePayment(req: Request, res: Response) {
    let { id } = req.params
    let { card, date, ccv } = req.body

    if (!id || id.length < 24)
        return res.status(400).json({ msg: "invalid id" })

    if (!card || !date || !ccv)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await checkUpdate(card, date, ccv, new ObjectId(id));
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}



export async function addNewPost(req: Request, res: Response) {
    console.log(req.body)
    let { email, id, title, description, image, likes, likedByUser, comments, isOwner } = req.body
    if (!title || !description)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await addAnotherPost(email, id, title, description, image, likes, likedByUser, comments, isOwner)
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function updateonepost(req: Request, res: Response) {
    let { id } = req.params
    let { title, description, image, likes, likedByUser, comments, isOwner } = req.body

    console.log(likes)

    if (!id || id.length < 24)
        return res.status(400).json({ msg: "invalid id" })   

    if (!title || !description)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await updatePost(id, title, description, image, likes, likedByUser, comments, isOwner)
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
    }

export async function getAllPostsById(req: Request, res: Response) {
    let { id } = req.params

    if (!id || id.length < 24)
        return res.status(400).json({ msg: "invalid id" })

    try {
        let result = await showallpostsbyid(id)
        if (!result)
            res.status(400).json({ msg: "there is no posts" })
        else
            res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function getAllPostsByEmail(req: Request, res: Response) {
    const { email } = req.params;

    if (!email)
        return res.status(400).json({ msg: "invalid email" });

    try {
        const result = await showPostsByEmail(email);  // Fetch posts by email
        if (!result || result.length === 0)
            return res.status(400).json({ msg: "No posts found" });  // If no posts are found
        else
            return res.status(200).json({ posts: result });  // Return posts
    } catch (error) {
        return res.status(500).json({ error: "Server error while fetching posts" });
    }
}


export async function showallposts(req: Request, res: Response) {
    try {
        let posts = await getAllPosts1();
        if (posts?.length == 0)
            res.status(200).json({ message: 'empty posts', posts });
        else
            res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function deletePost(req: Request, res: Response) {
    let { id } = req.params
    let { title } = req.body

    if (!id || id.length < 24)
        return res.status(400).json({ message: 'must provide a valid id' });

    try {
        let result = await deactivePost(id, title);
        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

// export async function AddNewDate(req: Request, res: Response) {
//     let { id } = req.params
//     let { date,time } = req.body

//     if(!id || id.length < 24)
//         return res.status(400).json({ msg: "invalid id" })

//     if(!date || !time)
//         return res.status(400).json({ msg: "invalid info" })

//     try {
//         let result = await AddDate(date,time,id)
//         res.status(200).json({ result })
//     } catch (error) {
//         res.status(500).json({ error })
//     }

// }

// export async function RemoveDate(req: Request, res: Response) {
//     let { id } = req.params
//     let { date,time } = req.body

//     if(!id || id.length < 24)
//         return res.status(400).json({ msg: "invalid id" })

//     if(!date || !time)
//         return res.status(400).json({ msg: "invalid info" })

//     try {
//         let result = await DeleteDate(date, time, id)
//         res.status(200).json({ result })
//     } catch (error) {
//         res.status(500).json({ error })
//     }
// }


export async function addNewTraining(req: Request, res: Response) {
    let { email, name, date, time, price } = req.body

    if (!date || !time)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await AddTraining(email, name, date, time, price)
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function deleteTrainiging(req: Request, res: Response) {
    let { email, name, date, time, price } = req.body

    if (!date || !time)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await DeleteTraining(email, name, date, time, price)
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function openTrainingDates(req: Request, res: Response) {

    let { date, name, time, price, email } = req.body
    console.log(time)
    if (!date || !time)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await OpenTraining(date, name, time, price, email)
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function closeTrainingDates(req: Request, res: Response) {
    let { date, name, time, price, email } = req.body

    if (!date || !time)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await CloseTraining(date, name, time, price, email)
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}


export async function getUserByemail(req: Request, res: Response) {
    let { email } = req.body
    console.log(email)
    if (!email)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await getUserByEmail(email)
        res.status(200).json({ result })

    }
    catch (error) {
        res.status(500).json({ error })
    }
}

export async function AddCostumerToArr(req: Request, res: Response) {
    let { trainerEmail, costumerEmail } = req.body

    if (!costumerEmail || !trainerEmail)
        return res.status(400).json({ msg: "invalid info" })

    trainerEmail = trainerEmail.trim();
    costumerEmail = costumerEmail.trim();
    console.log('costumerEmail:', costumerEmail)
    console.log('trainerEmail: ', trainerEmail)
    try {
        let result = await addEmailToArray(trainerEmail, costumerEmail);
        res.status(200).json({ result })

    }
    catch (error) {
        res.status(500).json({ error })
    }
}

export async function getAllTrainersSchedules(req: Request, res: Response) {
    try {
        const { HisTrainer } = req.body;

        if (!Array.isArray(HisTrainer) || HisTrainer.length === 0) {
            console.error("Invalid HisTrainer array:", HisTrainer);
            return res.status(400).json({ msg: "Invalid or missing HisTrainer array" });
        }
        const result = await getAllScheduleInfo(HisTrainer);

        if (!result || result.length === 0) {
            console.warn("No schedules found for given trainers.");
            return res.status(404).json({ msg: "No schedules found" });
        }
        return res.status(200).json({ result });
    } catch (error) {
        console.error("Error in getAllTrainersSchedules controller:", error);
        return res.status(500).json({ error });
    }
}






export async function UpdateInfo(req: Request, res: Response) {
    let { id } = req.params;
    let { first_name, last_name, location, password, email, phone, dob, image, update_details, clientType, payment, experience, totalIncome } = req.body;
    if (!id || id.length < 24)
        return res.status(400).json({ msg: "invalid id" })

    if (!first_name || !last_name || !location)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await CheckInfo(id, first_name, last_name, email, phone, dob, image, update_details, clientType, location, password, payment, experience, totalIncome);
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function addPayment(req: Request, res: Response) {
    const { email, date, price } = req.body;

    if (!email || !price || !date) {
        return res.status(400).json({ msg: "Invalid information provided" });
    }
    try {
        const result = await addPaymentToTotalIncome(email, price, date);
        if (result.modifiedCount > 0) {
            return res.status(200).json({ msg: "Payment added and schedule removed", result });
        } else {
            return res.status(400).json({ msg: "No schedule found to remove or invalid trainer email" });
        }
    } catch (error) {
        console.error("Error in addPayment:", error);
        return res.status(500).json({ error });
    }
}





