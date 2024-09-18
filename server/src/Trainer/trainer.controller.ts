import { Request, Response } from "express";
import { getAllUsers, findUserById, LoginUser, RegisterUser, removeUser, deactiveUser, ChangePass, checkUpdate, addAnotherPost, showallpostsbyid, getAllPosts1, deactivePost } from "./trainer.model";
import { TrainerUser } from "./trainer.type";
import { decryptPassword, encryptPassword } from "../utils/utils";
import { ObjectId } from "mongodb";

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


export async function getUserById(req: Request, res: Response) {
    let { id } = req.params; //url שליפת הפרמטר מתוך ה 
    if (id.length != 24)
        return res.status(500).json({ message: 'must provide a valid id' });
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
        console.log("Controller: " + user);
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
    let { first_name, last_name, email, password, dob, location, experience, image, phone, clientType, payment, trainingSchedule, Posts, CostumersArr } = req.body;

    if (!first_name || !last_name || !password || !email) {
        return res.status(400).json({ message: 'missing info' });
    }

    try {
        password = encryptPassword(password);
        console.log("This is Server / Controler  " + password);
        let trainer: TrainerUser = { first_name, last_name, email, password, dob, location, experience, image, phone, clientType, payment, trainingSchedule, Posts,CostumersArr };

        let result = await RegisterUser(trainer);

        if (!result.insertedId) {
            console.log('This is Controler result(Good) ', result);
            return res.status(400).json({ message: 'registration failed' });
        } else {
            trainer.id = result.insertedId;
            console.log('This is Controler result(Bad) ', result);
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
        let result = await checkUpdate( card, date, ccv);
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}



export async function addNewPost(req: Request, res: Response) {
    let { id } = req.params
    let { title, description, image } = req.body

    if (!id || id.length < 24)
        return res.status(400).json({ msg: "invalid id" })

    if (!title || !description)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await addAnotherPost(title, description, image)
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

