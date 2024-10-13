import AsyncStorage from '@react-native-async-storage/async-storage';
import { POST } from '../api';  

export async function RefreshTrainersData() {
    try {
        // Fetch trainers from the API
        let data = await POST('trainer/getalltrainer',{});  // Fetch all trainers
        console.log("Fetched trainers data:\n", data);

        if (data && data.trainers && data.trainers.length > 0) {
            const trainerArray = data.trainers.map((trainer: any) => ({
                first_name: trainer.first_name,
                last_name: trainer.last_name,
                email: trainer.email,
                dob: trainer.dob,
                experience: trainer.experience,
                phone: trainer.phone,
                image: trainer.image,
                trainingSchedule: trainer.trainingSchedule,
                Posts: trainer.Posts,
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
