const express = require("express")
const app = express();
const cors = require('cors');
const userRouter = require("./Routes/userRoutes")
const authRouter = require("./Routes/authRoutes")
const movieRouter = require("./Routes/movieRoutes")
const reviewRouter = require("./Routes/reviewRoutes")
const friendRouter = require("./Routes/friendRoutes")
const expressError = require("./util/expressError")

app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/friend", friendRouter);

// app.all('*', (req, res, next) => {
//     next(new expressError('Page Not Found', 404))
// })

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Internal Server Error';
//     res.status(statusCode).json({
//         error: {
//             message: err.message,
//             status: err.statusCode
//         }
//     });
// })

app.listen(3000, () => {
    console.log("App Listening on port 3000");
})