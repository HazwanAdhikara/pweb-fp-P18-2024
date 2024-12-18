import express from "express";
import { connectToDatabase } from "./db-connection";
import { authRouter } from "./routes/home-route";

const app = express();

app.use(express.json());

// check endpoint
app.get("/", (_, response) => {
  response.status(200).send("Server is up and running 💫");
});

app.use("/", authRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});

connectToDatabase();
