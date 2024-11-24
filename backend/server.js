import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";


const port = process.env.PORT || 9000;

connectDB();

const app = express();

// Body parser middleware to parse the body of the request (req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware to parse the cookies from the request object
// alows to acces reqest.cookies and since  the cookie is called JWT we can access it by req.cookies.JWT
// we can do this in the authMiddleware.js file
app.use(cookieParser());


app.use("/api/auth", authRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});