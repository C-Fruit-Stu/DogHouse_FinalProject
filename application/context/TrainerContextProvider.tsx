import React, { createContext, useState } from "react";
import { Post, TrainerType } from "../types/trainer_type";
import { DELETE, GET, POST, PUT } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CoustumerType } from "../types/coustumer_type";


export const TrainerContext = createContext<any>({});


export default function TrainerContextProvider({ children }: any) {

    const [allTrainer, setAllTrainer] = useState<TrainerType[]>([]);
    const [currentTrainer, setCurrentTrainer] = useState<TrainerType | null>(null);
    const [allCostumers, setAllCostumers] = useState<CoustumerType[]>([]);


    async function RegisterNewTrainer(newTrainer: TrainerType) {
        try {
            console.log('newTrainer ====>>>', newTrainer)
            let data = await POST('trainer/register', newTrainer);
            console.log("context after server functions:\n" + data);
            if (data == null)
                return false;
            if (data && data.trainer) {
                setAllTrainer([...allTrainer, data.trainer]);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function LogInTrainer(loggingInfo: any) {
        try {
            console.log('email ====>>>', loggingInfo.email, '\npassword ====>>>', loggingInfo.password);
            let data = await POST('trainer/login', loggingInfo);  // Adjust the endpoint to match your server
            console.log(data);
            if (data && data.user) {
                setCurrentTrainer(data.user);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function getAllUsers() {
        try {
            let data = await GET('trainer/')
            console.log("data" + data);
            console.log("data" + data);
            if (data && data.users) {
                setAllTrainer(data.users);
                return data.users;
            }
            return false;
        } catch (error) {
            throw error
        }
    }

    async function DeleteTrainer(id: string) {
        try {
            console.log('id ====>>>', id)
            let data = await DELETE('trainer/physic/delete/' + id)
            console.log("data" + data);
            if (data) {
                return true;
            }
            return false;
        } catch (error) {
            throw error
        }
    }


    async function GetAllTrainers() {
        try {
            let data = await POST('trainer/getalltrainer', {}); // Fetch all trainers
            console.log("Fetched trainers data:\n", data);

            if (data && data.trainers && data.trainers.length > 0) {
                const trainerArray = data.trainers.map((trainer: any) => ({
                    first_name: trainer.first_name,
                    last_name: trainer.last_name,
                    email: trainer.email
                }));

                const trainersJson = JSON.stringify(trainerArray);

                // Save in AsyncStorage
                await AsyncStorage.setItem('allTrainer', trainersJson);
                console.log("Saved trainers to AsyncStorage", JSON.parse(trainersJson));

                // Set trainers in state
                setAllTrainer(trainerArray);

                return true;
            } else {
                console.log("No trainers found or invalid data");
                return false;
            }
        } catch (error) {
            console.error('Error fetching and saving trainers:', error);
            return false;
        }
    }

    async function GetTrainerPosts(email: string) {
        try {
            let data = await GET(`trainer/getallpostsbyemail/` + email);
            if (data && data.posts) {
                console.log("data" + data.posts);
                return data.posts;
            }
            return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async function AddPost(newPost: any) {
        if (currentTrainer) {
            const email = currentTrainer.email;
            newPost = { ...newPost, email };
            if (newPost.title == null || newPost.description == null) {
                alert("Please enter title and description");
                return false;
            }
            else {
                try {
                    console.log('newPost ====>>>', newPost)
                    let data = await POST('trainer/addnewpost', newPost);
                    console.log("data" + data);
                    if (data && data.post) {
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }
        }
        else {
            return false;
        }
    }

    async function openNewTraining(trainingSchedule: any) {
        if (currentTrainer) {
            const email = currentTrainer.email;
            const opendate = { date: trainingSchedule.date, name: trainingSchedule.name, time: trainingSchedule.time, price: trainingSchedule.price, email: email };
            try {
                console.log('opendate ====>>>', opendate)
                let data = await POST('trainer/addnewtraining', (opendate));
                console.log("data" + data);
                if (data) {
                    return true;
                }
                return false;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }




    async function updateEmailTrainer(trainer: TrainerType) {
        try {
            //console.log('costumer ====>>>', trainer);
            console.log('currentTrainer ====>>>', trainer.id);
            let data = await POST('trainer/updateinfo/' + trainer.id, trainer);
            console.log('Response from server:', data.trainer);
            if (data) {
                console.log('data.costumer ====>>>', data.trainer);
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error in addTrainer:', error);
            return false;
        }
    }

    async function UpdatePaymentTrainer(NewTrainer: TrainerType) {
        try {
            console.log('currentCoustumer id ====>>>', NewTrainer.id);
            const payload = { card: NewTrainer.payment.card, date: NewTrainer.payment.date, ccv: NewTrainer.payment.cvv, id: NewTrainer.id };
            console.log('payload ====>>>', payload);
            let data = await POST('trainer/updatePayment/' + NewTrainer.id, payload);
            console.log('Response from server:', data.trainer);
            if (data) {
                console.log('data.costumer ====>>>', data.trainer);
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error in addTrainer:', error);
            return false;
        }
    }



    async function AddCostumerToArr(trainerEmail: string, costumerEmail: string) {
        try {
            const info = { trainerEmail, costumerEmail };
            let data = await POST(`trainer/addEmailToArr`, info);
            if (data && data.costumer) {
                console.log("data" + data.costumer);
                return true
            }
            return false;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async function UpdatePassword(id: string, password: string) {
        try {
            console.log('currentTrainer id ====>>>', id);
            console.log('password ====>>>', password);
            let data = await POST(`trainer/updatepassword/` + id, { password });
            if (data) {
                console.log("data" + data.trainer);
                return true
            }
            console.log("data" + data);
            return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }

    }

    function LogOut() {
        setCurrentTrainer(null);
    }

    async function getAllTrainersSchedules(HisTrainer: string[]) {
        const payload = { HisTrainer };
        try {
            const data = await POST('trainer/getallschedules', payload);    
            if (data && data.result) {
                return data.result;
            } else {
                console.warn("No schedules found for the given trainers.");
                return [];
            }
        } catch (error) {
            console.error("Error in getAllTrainersSchedules:", error);
            return [];
        }
    }
    
    
    async function addPayment(email: string, date: string, price: number) {
        try {
            const payload = { email, date, price };
            console.log("Payload sent to server:", payload);
            let data = await POST("trainer/addpayment", payload);
            console.log("Response from server:", data);
    
            if (data) {
                return true; // Payment and schedule removal succeeded
            }
            return false;
        } catch (error) {
            console.error("Error in addPayment:", error);
            return false;
        }
    }

    async function AddLike (postId: string,post:Post) {
        try {
            const data = await POST(`trainer/addlike/${postId}`,{post});
            if (data) {
                console.log("data" + data.post);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    
    async function DeletePost() { }
    async function EditPost() { }

    return (
        <TrainerContext.Provider
            value={{
                allTrainer,
                currentTrainer,
                setCurrentTrainer,
                RegisterNewTrainer,
                LogInTrainer,
                AddPost,
                DeletePost,
                EditPost,
                GetAllTrainers,
                GetTrainerPosts,
                getAllUsers,
                DeleteTrainer,
                allCostumers,
                AddCostumerToArr,
                updateEmailTrainer,
                UpdatePaymentTrainer,
                UpdatePassword,
                LogOut,
                openNewTraining,
                getAllTrainersSchedules,
                addPayment,
                AddLike
            }}>
            {children}
        </TrainerContext.Provider>
    );
}
// const EditUser = (user: User) => {
//     const newList = allUsers.filter((d) => d.username !== user.username);
//     setAllUsers([...newList, user]);
// }

// const DeleteUser = (user: User) => {
//     const newList = allUsers.filter((d) => d.username !== user.username);
//     setAllUsers([...newList]);
// }

// const LogInUser = (username: string, password: string) => {
//     const user = allUsers.find((d) => d.username === username && d.password === password);
//     if (!user) {
//         Alert.alert("Error", "Wrong Username or Password");
//         return "null";
//     } else if (user.username === "Admin" && user.password === "AdminAdmin") {
//         Alert.alert("Success", "Admin logged In Successfully");
//         setCurrentUser(user);
//         return "Admin";
//     } else {
//         Alert.alert("Success", "Logged In Successfully");
//         setCurrentUser(user);
//         return "User";
//     }
// }

// const getCurrentUserRole = () => {
//     return currentUser?.username === "Admin" ? "Admin" : currentUser?.username === "User" ? "User" : "null";
// }
