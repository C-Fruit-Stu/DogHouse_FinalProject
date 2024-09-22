import { createContext, useState } from "react";
import { TrainerType } from "../types/TrainerType";
import { POST } from "../api";


export const TrainerContext = createContext<any>({});

function TrainerContextProvidor({ children }: any) {

    const [allTrainer, setAllTrainer] = useState<TrainerType[]>([]);
    const [currentTrainer, setCurrentTrainer] = useState<TrainerType>();
    const [image,setimage] = useState<string[]>([])

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

    async function LogInTrainer(loggingInfo : any) {
        try{
            console.log('email ====>>>', loggingInfo.email, '\npassword ====>>>', loggingInfo.password);
            let data = await POST('trainer/login',loggingInfo); 
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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
      
        if (files) {
          const promises: Promise<string>[] = [];
      
          Array.from(files).forEach((file) => {
            const reader = new FileReader();
            const promise = new Promise<string>((resolve) => {
              reader.onloadend = () => {
                const image = new Image();
                image.src = reader.result as string;
      
                image.onload = () => {
                  // Set maximum width and height for resized image
                  const maxWidth = 800;
                  const maxHeight = 600;
      
                  // Calculate new dimensions to maintain aspect ratio
                  let newWidth = image.width;
                  let newHeight = image.height;
      
                  if (image.width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = (image.height * maxWidth) / image.width;
                  }
      
                  if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = (image.width * maxHeight) / image.height;
                  }
      
                  // Create a canvas element
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
      
                  // Set canvas dimensions to match the resized image
                  canvas.width = newWidth;
                  canvas.height = newHeight;
      
                  // Draw the resized image onto the canvas
                  ctx?.drawImage(image, 0, 0, newWidth, newHeight);
      
                  // Convert canvas content to a compressed data URL
                  const compressedDataURL = canvas.toDataURL('image/jpeg', 0.5); // Adjust quality (0.5 is 50% quality)
      
                  resolve(compressedDataURL);
                };
              };
            });
      
            reader.readAsDataURL(file);
            promises.push(promise);
          });
      
          Promise.all(promises).then((results) => {
            const updatedImages = [...image, ...results];
            setimage(updatedImages);
            localStorage.setItem('images', JSON.stringify(updatedImages));
          });
        }
      };

  return (
    <TrainerContext.Provider
    value={{
        allTrainer,
        currentTrainer,
        setCurrentTrainer,
        RegisterNewTrainer,
        LogInTrainer,
        handleImageChange
    }}>
    {children}
    </TrainerContext.Provider>
  )
}

export default TrainerContextProvidor


