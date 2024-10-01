//ייבוא אובייקט 
import { Router } from 'express';
import { physicDeleteUser, getAll, getUserById, LoginTrainer, RegisterTrainer, UpdatePassword, updatePayment, addNewPost, getAllPostsById, showallposts, deletePost, addNewTraining } from './trainer.controller';


const TrainerRouter = Router();

TrainerRouter
    .get('/', getAll) 
    .get('/:id/', getUserById) 
    .post('/login', LoginTrainer) 
    .post('/register', RegisterTrainer) 
    .delete('/physic/delete/:id', physicDeleteUser)
    .put('/updatepassword/:id',UpdatePassword)
    .put('/updatePayment/:id', updatePayment)

    // מוסיף פוסט
    .post('/addnewpost', addNewPost)
    .get('/getallpostsbyid/:id',getAllPostsById)
    .post('/showallposts',showallposts)
    .put('/deletePost/:id', deletePost)
    // .post('/addnewdates/:id', AddNewDate)
    // .put('/removedate/:id', RemoveDate)

    .post('/addnewtraining', addNewTraining)

export default TrainerRouter;