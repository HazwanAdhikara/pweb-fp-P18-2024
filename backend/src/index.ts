// index.ts
import express from "express";
import { connectToDatabase } from "./db-connection";
import { authRouter } from "./routes/home-route";
import { Verification } from "./middleware/auth";
import { penghuniRouter } from "./routes/penghuni-route";
import adminRouter from "./routes/admin-route";

const app = express();

app.use(express.json());

// Check endpoint
app.get("/", (_, response) => {
  response.status(200).send("Server is up and running 💫");
});

app.use("/", authRouter);
app.use("/", Verification, penghuniRouter);
app.use("/admin", adminRouter);

// Port yang digunakan untuk menjalankan server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});

// Menghubungkan ke database
connectToDatabase();
