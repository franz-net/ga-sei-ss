import 'express-async-errors'
import express from "express";
import path from "path";
import morgan from 'morgan';
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";
import courtRouter from "./routes/courtRoutes";
import authVerification from "./middleware/authVerification";
import reservationRouter from "./routes/reservationRoutes";

if (process.env.NODE_ENV !== "production") {
    const dotenv = require("dotenv");
    dotenv.config();
}
const app = express();

// Middleware
app.set("trust proxy", 1);
if (process.env.NODE_ENV !== 'production') {
    //app.use(morgan('dev'))
    app.use(morgan('combined'));
}
app.use(express.json()); // support json encoded bodies

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/court', authVerification, courtRouter)
app.use('/api/v1/reservation', authVerification, reservationRouter)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "build")));
    console.log(express.static(path.join(__dirname, "..", "client", "build")))

    app.get("/*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "build", "index.html")
        );
    });
}

// End Middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const PORT =
    process.env.PORT || (process.env.NODE_ENV === "production" && 3000) || 3001;

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()