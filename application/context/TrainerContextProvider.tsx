import React, { createContext, useState } from "react";
import { TrainerType } from "../types/trainer_type";
import { GET, POST } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const TrainerContext = createContext<any>({});


export default function TrainerContextProvider({ children }: any) {

    const [allTrainer, setAllTrainer] = useState<TrainerType[]>([]);
    const [currentTrainer, setCurrentTrainer] = useState<TrainerType>();


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

    
    async function GetAllTrainers() {
        try {
            let data = await POST('trainer/getalltrainer',{}); 
            console.log("Fetched trainers data:\n", data);
    
            if (data && data.trainers && data.trainers.length > 0) {
                const trainerArray = data.trainers.map((trainer: any) => ({
                    first_name: trainer.first_name,
                    last_name: trainer.last_name,
                    email: trainer.email
                }));
    
                const trainersJson = JSON.stringify(trainerArray);
    
                await AsyncStorage.setItem('allTrainer', trainersJson);
                console.log("Saved trainers to AsyncStorage", JSON.parse(trainersJson));
    
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

    async function GetTrainerPosts(email: string){
        try{
            let data = await GET(`trainer/gettrainerposts/${email}`);
            console.log(data);
            if(data && data.posts){
                return data.posts;
            }
            return [];
        }catch(error){
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
                GetTrainerPosts
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
