import dotenv from "dotenv";
dotenv.config();
import puppeteer from 'puppeteer';

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
import cors from "cors";
import {connect} from "./database/data-source";




declare global {
  namespace Express {
    interface Request{
      user?: {
        id: string,
        email: string,
      }
    }
  }
}

const PORT =  process.env.PORT || 8000;
const app = express();


// middleware setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));
app.use(helmet());
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  saveUninitialized: true,
  cookie: {secure: false, maxAge: 1000 * 60 * 60 * 24},
  resave: false
}));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');


// import route
import {userRoute} from './routes/user.routes';
import {authRoute} from "./routes/auth.routes";
import {leaveRouter} from "./routes/leave.routes";
import {deptRoute} from "./routes/department.routes";
import {relieveRoute} from "./routes/relieve_officer_routes";
import {coverletterRoute} from "./routes/coverletter.route";
import { entitled_leaveRoute } from "./routes/entitled_leave.routes";
import {userEntitledLeaveRoutes} from "./routes/user_entitled_leave.routes"

app.get('/home', (req, res) => {
  const url = req.url;
    res.status(200).json({
        message: 'welcome',
        url
    })
});


app.use('/api/', userRoute);
app.use('/api/', authRoute);
app.use('/api/', leaveRouter);
app.use("/api/", deptRoute);
app.use('/api/', relieveRoute);
app.use('/api/', coverletterRoute);
app.use('/api/', entitled_leaveRoute);
app.use('/api/', userEntitledLeaveRoutes);




//invalid routes
// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "public", "404.html"));
//   } else if (req.accepts("json")) {
//     console.log("json");
//     res.json({ error: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

async function startServer() {
    try {
      await connect();
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Failed to connect to the database:", error);
    }
  }


  startServer();