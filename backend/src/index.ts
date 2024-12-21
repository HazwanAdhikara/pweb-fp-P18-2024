// index.ts
import express from "express";
import { connectToDatabase } from "./db-connection";
import { authRouter } from "./routes/home-route";
import { Verification } from "./middleware/auth";
import { penghuniRouter } from "./routes/penghuni-route";
import {} from "./routes/penghuni-route";
import adminRouter from "./routes/admin-route";
import invoiceRoute from "./routes/invoiceRoute";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Check endpoint
app.get("/", (_, response) => {
  response.status(200).send("Server is up and running 💫");
});

app.use("/", authRouter);
app.use("/", penghuniRouter);
app.use("/admin", adminRouter);
app.use("/api", invoiceRoute);

// Port yang digunakan untuk menjalankan server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});

// Menghubungkan ke database
connectToDatabase();
