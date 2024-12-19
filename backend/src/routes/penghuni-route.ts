import { Router } from "express";
import { Verification } from "../middleware/auth";
import {
  getInvoiceHistory,
  createPayment,
  createDamageReport,
  createUserReport,
  getRoomOccupancy,
} from "../controller/penghuni-controller";

export const penghuniRouter = Router();

penghuniRouter.get("/user", Verification, getInvoiceHistory);
penghuniRouter.get("/user/sewa", Verification, getRoomOccupancy);
penghuniRouter.post("/user/sewa/bayar", Verification, createPayment);
penghuniRouter.post(
  "/user/laporan/fasilitas",
  Verification,
  createDamageReport
);
penghuniRouter.post("/user/laporan/penghuni", Verification, createUserReport);

export default penghuniRouter;
