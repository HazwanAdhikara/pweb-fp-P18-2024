// index.ts
import express from "express";
import { connectToDatabase } from "./db-connection";
import { authRouter } from "./routes/home-route";
import { Verification } from "./middleware/auth";
import { penghuniRouter } from "./routes/penghuni-route";

const app = express();

app.use(express.json());

// Check endpoint
app.get("/", (_, response) => {
  response.status(200).send("Server is up and running 💫");
});

app.use("/", authRouter);
app.use("/user", Verification, penghuniRouter);
app.use("/user/sewa", Verification, penghuniRouter);
app.use("/user/sewa/bayar", Verification, penghuniRouter);
app.use("/user/laporan/fasilitas", Verification, penghuniRouter);
app.use("/user/laporan/penghuni", Verification, penghuniRouter);

// Port yang digunakan untuk menjalankan server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});

// Menghubungkan ke database
connectToDatabase();
