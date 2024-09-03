//ייבוא אובייקט 
import { Router } from 'express';
import { physicDeleteUser, GetAll, GetUserById, LoginTrainer, RegisterTrainer, UpdatePassword, updatePayment, addNewPost, getAllPostsById, showallposts, deletePost } from './trainer.controller';


const TrainerRouter = Router();

TrainerRouter
    .get('/', GetAll) 
    .get('/:id/', GetUserById) 
    .post('/login', LoginTrainer) 
    .post('/register', RegisterTrainer) 
    // .put('/update/:id', update) 
    .delete('/physic/delete/:id', physicDeleteUser)
    .put('/updatepassword/:id',UpdatePassword)
    .put('/updatePayment/:id', updatePayment)
    .post('/addnewpost/:id', addNewPost)
    .get('/getallpostsbyid/:id',getAllPostsById)
    .post('/showallposts',showallposts)
    .put('/deletePost/:id', deletePost)
    // .post('/addnewdates/:id', AddNewDate)
    // .put('/removedate/:id', RemoveDate)

export default TrainerRouter;