import { createContext, useEffect, useState } from "react";
import { TrainerType } from "../types/TrainerType";
import { POST } from "../api";


export const TrainerContext = createContext<any>({});

function TrainerContextProvidor({ children }: any) {

    const [allTrainer, setAllTrainer] = useState<TrainerType[]>([]);
    const [currentTrainer, setCurrentTrainer] = useState<TrainerType>();

    useEffect(() => {
        const trainer = sessionStorage.getItem('trainer');
        if (trainer) {
            setCurrentTrainer(JSON.parse(trainer as any));
        }
    }, []);

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
            if (newPost.title == null || newPost.description == null) {
                alert("Please enter title and description");
                return false;
            }
            else {
                try {
                    console.log('newPost ====>>>', newPost)
                    let data = await POST('trainer/addnewpost', email + newPost);
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



    return (
        <TrainerContext.Provider
            value={{
                allTrainer,
                currentTrainer,
                setCurrentTrainer,
                RegisterNewTrainer,
                LogInTrainer,
                AddPost
            }}>
            {children}
        </TrainerContext.Provider>
    )
}

export default TrainerContextProvidor


