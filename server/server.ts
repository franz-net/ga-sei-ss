import dotenv from 'dotenv';
import express, {Request, Response} from "express";
import path from "path";
import morgan from 'morgan';
import connectDB from "./db/connect.js";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
const app = express();

// Middleware
app.set("trust proxy", 1);
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
app.use(express.json()); // support json encoded bodies

app.get("/api/test", (req: Request<any, any, any, any>, res: Response<any>) => {
    res.json({date: new Date().toString()});
});


// End Middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "build")));

    app.get("/*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "build", "index.html")
        );
    });
}


const PORT =
    process.env.PORT || (process.env.NODE_ENV === "production" && 3000) || 3001;

const start = async () => {
    try {
        await connectDB(process.env.DB_URL)
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()