import { createContext, useEffect, useState } from "react";

import { CoustumerType, TrainerType } from "../types/TrainerType";
import { POST, PUT,GET, DELETE } from "../api";



export const TrainerContext = createContext<any>({});

function TrainerContextProvidor({ children }: any) {

    const [allTrainer, setAllTrainer] = useState<TrainerType[]>([]);
    const [allCostumers, setAllCostumers] = useState<CoustumerType[]>([]);
    const [currentTrainer, setCurrentTrainer] = useState(() => {
        // Default to sessionStorage value if available
        const storedTrainer = sessionStorage.getItem('trainer');
        return storedTrainer ? JSON.parse(storedTrainer) : null;
      });

    // useEffect(() => {
    //     const trainer = sessionStorage.getItem('trainer');
    //     if (trainer) {
    //         setCurrentTrainer(JSON.parse(trainer as any));
    //     }
    // }, []);

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
            let data = await POST('trainer/login', loggingInfo);
            console.log('data ====>>>', data.user);

            if (data && data.user) {
                setCurrentTrainer(data.user);
                sessionStorage.setItem('trainer', JSON.stringify(data.user)) // State is updated asynchronously
                // No need to log currentTrainer here because it won’t be updated immediately
                return true;
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;
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
                    let data = await POST('trainer/addnewpost', (newPost));
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
        else{
            return false;
        }
    }


    async function openNewDate(date: Date,hour:string) {
        if(currentTrainer){
            const email = currentTrainer.email;
            const opendate = { date: date, hour: hour, email: email };
            try {
                console.log('opendate ====>>>', opendate)
                let data = await POST('trainer/opentrainingdates', (opendate));
                console.log("data" + data);
                if (data) {
                    setCurrentTrainer(data.user);
                    return true;
                }
                return false;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }

    async function DeleteNewDate(date: Date,time:string) {
        if(currentTrainer){
            const email = currentTrainer.email;
            const opendate = { date:date,time:time, email:email };
            try {
                console.log('opendate ====>>>', opendate)
                let data = await PUT('trainer/deleteopenDate', (opendate));
                console.log("data" + data);
                if (data) {
                    console.log('data===>',data.user);
                    return true;
                }
                return false;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }


    async function getuserByEmail() {
        try {
            let email = currentTrainer?.email
            console.log('email ====>>>', email)
            let data = await POST('trainer/gettrainerbyemail', { email: email })
            console.log("data" + data.user?.email);
            if (data && data.user) {
                setCurrentTrainer(data.user);
                return data.user;
            }
            return false;
        } catch (error) {
            throw error
        }
    }

    async function getAllUsers() {
        try {
            let data = await GET('trainer/', {})
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

    async function getAllCostumers() {
        try {
            let data = await GET('costumer/', {})
            console.log("data   " + data.costumers);
            if (data && data.costumers) {
                setAllCostumers(data.costumers);
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

    async function DeleteCostumer (id: string) {
        try {
            console.log('id ====>>>', id)
            let data = await DELETE('costumer/physic/delete/' + id)
            console.log("data" + data);
            if (data) {
                return true;
            }
            return false;
        } catch (error) {
            throw error
        }
    }




    async function GettrainerById(id:string){
        if(currentTrainer){
            try{
                console.log(id)
                let data = await GET('trainer/' + id, id)
                console.log("data===>", data)
                if(data)
                    return data
                return false
            }
            catch(error){
                console.log(error)
                return false
            }
        }
    }



    return (
        <TrainerContext.Provider
            value={{
                allTrainer,
                currentTrainer,
                setCurrentTrainer,
                RegisterNewTrainer,
                LogInTrainer,
                AddPost,
                openNewDate,
                DeleteNewDate,

                getuserByEmail,
                getAllUsers,
                DeleteTrainer,
                getAllCostumers,
                allCostumers,
                DeleteCostumer

            }}>
            {children}
        </TrainerContext.Provider>
    )
}

export default TrainerContextProvidor


