// routes/invoiceRoute.ts
import { Router } from "express";
import { downloadInvoice } from "../controller/invoiceController";

const invoiceRouter = Router();

// Route untuk mengunduh invoice berdasarkan paymentId
invoiceRouter.get("/downloads/:filename", downloadInvoice);

export default invoiceRouter;
