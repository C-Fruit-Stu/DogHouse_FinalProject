import React, { createContext, useState } from "react";
import { CoustumerType,trainingSchedule } from "../types/coustumer_type";
import { DELETE, GET, POST, PUT } from "../api";
export const CoustumerContext = createContext<any>({});



export default function CoustumerContextProvider({ children }: any) {

    const [allCoustumers, setAllCoustumer] = useState<CoustumerType[]>([]);
    const [currentCoustumer, setCurrentCoustumer] = useState<CoustumerType | null>(null);

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
            console.log('data.user ====>>>', data.user);
            if (data && data.user) {
                setCurrentCoustumer(data.user);
                console.log('currentCoustumer ====>>>', currentCoustumer);
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
            const payload = { TrainerEmail: trainerEmail, CostumerEmail: currentCoustumer?.email };
            console.log('trainerEmail ====>>>', trainerEmail);
            console.log('costumerEmail ====>>>', currentCoustumer?.email);

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

    async function UpdatePayment(card: any, date: any, ccv: any) {
        try {
            console.log('card ====>>>', card);
            console.log('date ====>>>', date);
            console.log('ccv ====>>>', ccv);
            console.log('currentCoustumer id ====>>>', currentCoustumer?.payment.id);
            const payload = { card: card, date: date, ccv: ccv };
            let data = await POST('costumer/updatePayment/' + currentCoustumer?.payment.id, payload);
            console.log('Response from server:', data.costumer);
            if (data) {
                console.log('data.costumer ====>>>', data.costumer);
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error in addTrainer:', error);
            return false;
        }
    }

    async function updateEmail(costumer: CoustumerType) {
        try {
            console.log('costumer ====>>>', costumer.email);
            let data = await PUT('costumer/updateinfo/' + currentCoustumer?.payment.id, costumer);
            console.log('Response from server:', data.costumer);
            if (data) {
                console.log('data.costumer ====>>>', data.costumer);
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error in addTrainer:', error);
            return false;
        }
    }

    async function updatepasswordCostumer(id: string, password: string) {
        try {
            console.log('currentCoustumer id ====>>>', id);
            console.log('password ====>>>', password);
            let data = await POST(`costumer/updatepassword/` + id, { password });
            if (data) {
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

    function LogOutCostumer() {
        setCurrentCoustumer(null);
    }

    async function getAllCostumers() {
        try {
            let data = await GET('costumer/')
            console.log("data   " + data.costumers.length);
            if (data && data.costumers) {
                setAllCoustumer(data.costumers);
                return data.costumers;
            }
            return false;
        } catch (error) {
            throw error
        }
    }

    async function DeleteCostumer(id: string) {
        try {
            console.log('id ====>>>', id)
            let data = await POST('costumer/physic/delete/' + id, {})
            console.log("data   " + data);
            if (data) {
                console.log("data   " + data);
                return true;
            }
            return false;
        } catch (error) {
            throw error
        }
    }

    async function addSchedule(schedule: trainingSchedule, CostumerEmail: string) {
        try {
            console.log("Adding schedule to customer:", schedule);
            let data = await POST('costumer/addSchedule', {schedule,CostumerEmail});
            console.log("Response from server:", data);
    
            if (data?.costumer) {
                console.log("Updated customer data:", data.costumer);
                setCurrentCoustumer(data.costumer);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error in addSchedule:", error);
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
                UpdatePayment,
                updateEmail,
                updatepasswordCostumer,
                LogOutCostumer,
                DeleteCostumer,
                getAllCostumers,
                addSchedule
            }}>
            {children}
        </CoustumerContext.Provider>
    );

}
