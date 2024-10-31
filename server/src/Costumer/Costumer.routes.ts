import { Router } from "express";
import { GetAllCostumrs, getCostumerById, logicDeleteUser, LoginCostumer, RegisterCostumer, UpdateInfo, UpdatePassword, updatePayment } from "./Costumer.controler";




const CostumerRouter = Router();

CostumerRouter
    .get('/', GetAllCostumrs)
    .get('/:id/', getCostumerById)
    .post('/login',LoginCostumer)
    .post('/register', RegisterCostumer)
    .put('/updatePayment/:id', updatePayment)
    .put('/updateinfo/:id',UpdateInfo)
    .put('/updatepassword/:id',UpdatePassword)
    .delete('/physic/delete/:id', logicDeleteUser)

export default CostumerRouter;