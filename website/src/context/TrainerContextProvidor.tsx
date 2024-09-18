import { createContext, useState } from "react";
import { TrainerType } from "../types/TrainerType";
import { POST } from "../api";


export const TrainerContext = createContext<any>({});

function TrainerContextProvidor({ children }: any) {

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

    async function LogInUser (loggingInfo: any) {
        try{
            console.log('email ====>>>', loggingInfo.email, '\npassword ====>>>', loggingInfo.password);
            let data = await POST('trainer/login',loggingInfo); 
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
        RegisterNewTrainer,
        LogInUser
    }}>
    {children}
    </TrainerContext.Provider>
  )
}

export default TrainerContextProvidor


