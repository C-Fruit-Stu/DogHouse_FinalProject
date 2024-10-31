//אתחול משתני סביבה
import 'dotenv/config';
import cors from 'cors';

//ייבוא את האקספרס
import express from 'express';
import TrainerRouter from './Trainer/trainer.routes';
import CostumerRouter from './Costumer/Costumer.routes';
import AdminRouter from './admin/admin.routes';

//הגדרת הפורט
const PORT = process.env.PORT || 7777;

//מייצר את אובייקט השרת
const server = express();
 
//הגדרת יכולות שונות
server.use(express.urlencoded({ extended: true }));
server.use(express.json({ limit: '1000mb' })); //json עבודה עם 
// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost:3000'] // Whitelist the domains you want to allow
};
server.use(cors(corsOptions)); //רשימת הכתובות שיכולות לגשת לשרת

//שימוש בקבצים סטטיים - בהמשך

//routes אפשרויות הניווט השונות
server.use('/api/trainer', TrainerRouter);
server.use('/api/costumer', CostumerRouter)
server.use('/api/admin', AdminRouter)

//הפעלת השרת
server.listen(PORT, () => { console.log(`[SERVER] running... http://localhost:${PORT}`) })


// חובה לעלות את הפרויקט  render.com 
// בשביל לבדוק אם שמירת המשתמש החדש במונגו עובד
// fetch ללמוד על פעולת

// לא להוסיף בדיקה על תמונה
// ליצור פונקצייה שתבדוק אותה בנפרד
// in register




