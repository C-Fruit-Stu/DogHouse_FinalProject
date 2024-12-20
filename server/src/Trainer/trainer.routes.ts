//ייבוא אובייקט 
import { Router } from 'express';
import { physicDeleteUser, getAll, getUserById, LoginTrainer, RegisterTrainer, UpdatePassword, updatePayment, addNewPost, getAllPostsById, showallposts, deletePost, addNewTraining, deleteTrainiging, openTrainingDates, closeTrainingDates, getAllTrainers,getAllPostsByEmail,getUserByemail,AddCostumerToArr,getAllTrainersSchedules, UpdateInfo,addPayment, updateonepost } from './trainer.controller';




const TrainerRouter = Router();

TrainerRouter
    .get('/', getAll) 
    .get('/:id/', getUserById) 
    .post('/login', LoginTrainer) 
    .post('/register', RegisterTrainer) 
    .delete('/physic/delete/:id', physicDeleteUser)
    .post('/updatepassword/:id',UpdatePassword)
    .post('/updatePayment/:id', updatePayment)
    .post('/getalltrainer', getAllTrainers)
    .get('/getallpostsbyemail/:email', getAllPostsByEmail)
    .post('/gettrainerbyemail', getUserByemail)
    .post('/addEmailToArr', AddCostumerToArr)
    .post('/updateinfo/:id',UpdateInfo)
    .post('/addlike/:id',updateonepost)


    // מוסיף פוסט
    .post('/addnewpost', addNewPost)
    .get('/getallpostsbyid/:id',getAllPostsById)
    .post('/showallposts',showallposts)     
    .put('/deletePost/:id', deletePost)
    // .post('/addnewdates/:id', AddNewDate)
    // .put('/removedate/:id', RemoveDate)

    // מוסיף תור
    .post('/addnewtraining', addNewTraining)
    .put('/deletetraining',deleteTrainiging)

    // פתיחת תורים
    .post('/opentrainingdates',openTrainingDates)
    .put('/deleteopenDate',closeTrainingDates)

    // שולף אימונים
    .post('/getallschedules',getAllTrainersSchedules)
    .post('/addpayment',addPayment)

export default TrainerRouter;