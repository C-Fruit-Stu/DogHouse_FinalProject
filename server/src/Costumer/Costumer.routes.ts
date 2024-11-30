import { Router } from "express";
import { GetAllCostumrs, getCostumerById, logicDeleteUser, LoginCostumer, RegisterCostumer, UpdateInfo, UpdatePassword, updatePayment,addTrainer,addSchedule } from "./Costumer.controler";




const CostumerRouter = Router();

CostumerRouter
    .get('/', GetAllCostumrs)
    .get('/:id/', getCostumerById)
    .post('/login',LoginCostumer)
    .post('/register', RegisterCostumer)
    .post('/updatePayment/:id', updatePayment)
    .put('/updateinfo/:id',UpdateInfo)
    .post('/updatepassword/:id',UpdatePassword)
    .post('/physic/delete/:id', logicDeleteUser)
    .post('/addTrainer', addTrainer)
    .post('/addSchedule',addSchedule)
    

export default CostumerRouter;