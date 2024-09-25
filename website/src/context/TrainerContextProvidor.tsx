import { createContext, useEffect, useState } from "react";
import { TrainerType } from "../types/TrainerType";
import { POST } from "../api";


export const TrainerContext = createContext<any>({});

function TrainerContextProvidor({ children }: any) {

    const [allTrainer, setAllTrainer] = useState<TrainerType[]>([]);
    const [currentTrainer, setCurrentTrainer] = useState<TrainerType>();
    let trainer : TrainerType = {
        insert: function (user: any): unknown {
            throw new Error("Function not implemented.");
        },
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        dob: "",
        location: "",
        experience: "",
        image: "",
        phone: "",
        clientType: "",
        payment: {
            card: "",
            date: "",
            ccv: ""
        }
    }

    useEffect(() => {
        if (currentTrainer !== undefined) {
            console.log('currentTrainer ====>>>' ,currentTrainer);
            window.location.href = '/profile';
        }
    }  , [currentTrainer]);

    async function RegisterNewTrainer(newTrainer: TrainerType) {
        try {
            console.log('newTrainer ====>>>', newTrainer)
            let data = await POST('trainer/register', newTrainer);  
            console.log("context after server functions:\n"+data);
            if(data == null)
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
                trainer = { ...data.user };
                console.log('trainer ====>>>', trainer);
                setCurrentTrainer(data.user); // State is updated asynchronously
                // No need to log currentTrainer here because it won’t be updated immediately
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
        RegisterNewTrainer,
        LogInTrainer,
        trainer
    }}>
    {children}
    </TrainerContext.Provider>
  )
}

export default TrainerContextProvidor


