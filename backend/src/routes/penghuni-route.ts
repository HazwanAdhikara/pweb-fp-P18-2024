// routes/penghuni-route.ts
import { Router } from "express";
import { Verification } from "../middleware/auth"; // Anda perlu membuat middleware ini
import {
  getInvoiceHistory,
  createPayment,
  createDamageReport,
  createUserReport,
  getRoomOccupancy,
} from "../controller/penghuni-controller"; // Sesuaikan dengan path controller Anda

export const penghuniRouter = Router();

// Landing Page Penghuni
penghuniRouter.get("/user", Verification, getInvoiceHistory);

// Sewa Kamar
penghuniRouter.get("/user/sewa", Verification, getRoomOccupancy);

// Pembayaran
penghuniRouter.post("/user/sewa/bayar", Verification, createPayment);

// Laporan Fasilitas
penghuniRouter.post(
  "/user/laporan/fasilitas",
  Verification,
  createDamageReport
);

// Laporan Penghuni
penghuniRouter.post("/user/laporan/penghuni", Verification, createUserReport);

export default penghuniRouter;
