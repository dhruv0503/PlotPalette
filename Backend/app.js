const express = require("express")
const app = express();
const userRouter = require("./Routes/userRoutes")
const authRouter = require("./Routes/authRoutes")
const expressError = require("./util/expressError")

app.use(express.json())

app.use("/users", userRouter);
app.use("/", authRouter);

app.get("/", () => {
    res.send("Welcome to Plot Palette")
})

app.all('*', (req, res, next) =>{
    next(new expressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if(!err.message) err.message = 'Internal Server Error';
    res.status(statusCode).send(err)  ;
})

app.listen(3000, () => {
    console.log("App Listening on port 3000");
})