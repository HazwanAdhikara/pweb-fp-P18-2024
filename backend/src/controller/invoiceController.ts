// controllers/invoiceController.ts
import { Request, Response } from "express";
import path from "path";

export const downloadInvoice = (req: Request, res: Response) => {
  const { paymentId } = req.params; // Ambil paymentId dari URL parameter

  // Tentukan path file PDF yang ingin diunduh
  const filePath = path.resolve(
    __dirname,
    `./invoices/invoice-${paymentId}.pdf`
  );

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=invoice.pdf");

  // Kirimkan file PDF ke frontend
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      return res.status(500).send("Gagal mengunduh file");
    }
  });
};
