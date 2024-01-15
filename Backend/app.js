const express = require("express")
const app = express();
const userRouter = require("./Routes/userRoutes")

app.use(express.json())

app.use("/users", userRouter);

app.listen(3000, () => {
    console.log("App Listening on port 3000");
})