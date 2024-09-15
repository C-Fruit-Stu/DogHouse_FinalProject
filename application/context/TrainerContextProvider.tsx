    import React, { createContext, useState } from "react";
    import { TrainerType } from "../types/trainer_type";
    import { POST } from "../api";

    export const TrainerContext = createContext<any>({});


    export default function TrainerContextProvider({ children }: any) {
        
        const [allTrainer, setAllTrainer] = useState<TrainerType[]>([]);
        const [currentTrainer, setCurrentTrainer] = useState<TrainerType>();


        async function RegisterNewTrainer(newTrainer: TrainerType) {
            try {
                console.log('newTrainer ====>>>', newTrainer)
                let data = await POST('trainer/register', newTrainer);  // Adjust the endpoint to match your server
                console.log(data);
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

        async function LogInTrainer(email: string, password: string) {
            try{
                let clientInfo = {
                    email: email,
                    password: password
                }
                console.log('email ====>>>', email, '\npassword ====>>>', password);
                let data = await POST('trainer/login',clientInfo);  // Adjust the endpoint to match your server
                console.log(data);
                if (data && data.trainer) {
                    setCurrentTrainer(data.trainer);
                    return true;
                }
                return false;
            } catch (error) {
                console.log(error);
                return false;
            }
        }


        return (
            <TrainerContext.Provider
                value={{
                    allTrainer,
                    currentTrainer,
                    setCurrentTrainer,
                    RegisterNewTrainer
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
