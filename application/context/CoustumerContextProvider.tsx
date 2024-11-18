import React, { createContext, useState } from "react";
import { CoustumerType } from "../types/coustumer_type";
import { POST, PUT } from "../api";
export const CoustumerContext = createContext<any>({});



export default function CoustumerContextProvider({ children }: any) {

    const [allCoustumers, setAllCoustumer] = useState<CoustumerType[]>([]);
    const [currentCoustumer, setCurrentCoustumer] = useState<CoustumerType>();

    // const AddNewCoustumer = (costumerInfo: CoustumerType) => {
    //     try {
    //         setAllCoustumer([...allCoustumers, costumerInfo]);
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // }
    async function RegisterNewCoustumer(newCustomer: CoustumerType) {
        try {
            console.log('newCustomer ====>>>', newCustomer)
            let data = await POST('costumer/register', newCustomer);  // Adjust the endpoint to match your server
            console.log(data);
            if (data && data.customer) {
                setAllCoustumer([...allCoustumers, data.customer]);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async function LogInCoustumer(loggingInfo: any) {
        try {
            console.log('email ====>>>', loggingInfo.email, '\npassword ====>>>', loggingInfo.password);
            let data = await POST('costumer/login', loggingInfo);  // Adjust the endpoint to match your server
            console.log(data);
            if (data && data.user) {
                setCurrentCoustumer(data.user);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function addTrainer(trainerEmail: any) {
        try {
            console.log('trainerEmail ====>>>', trainerEmail);
            const payload = {email: trainerEmail};
            let data = await POST('costumer/addTrainer', payload); 
            console.log('Response from server:', data);
            if (data && data.trainer) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error in addTrainer:', error);
            return false;
        }
    }

    async function UpdatePayment( card: any, date: any, ccv: any) {
        try {
            console.log('card ====>>>', card);
            console.log('date ====>>>', date);
            console.log('ccv ====>>>', ccv);
            console.log('currentCoustumer ====>>>', currentCoustumer?.id);
            const payload = {card: card, date: date, ccv: ccv};
            let data = await POST('costumer/updatePayment/' + currentCoustumer?.id, payload); 
            console.log('Response from server:', data.trainer);
            if (data && data.trainer) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error in addTrainer:', error);
            return false;
        }
    }

    return (
        <CoustumerContext.Provider
            value={{
                allCoustumers,
                currentCoustumer,
                RegisterNewCoustumer,
                setCurrentCoustumer,
                LogInCoustumer,
                addTrainer,
                UpdatePayment
            }}>
            {children}
        </CoustumerContext.Provider>
    );

}
