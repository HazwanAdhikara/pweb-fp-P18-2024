// controllers/invoiceController.ts
import { Request, Response } from "express";
import path from "path";

export const downloadInvoice = (req: Request, res: Response) => {
  const { paymentId } = req.params;

  // Pastikan path mengarah ke folder invoice Anda
  const filePath = path.join(
    __dirname,
    "../invoice",
    `invoice-${paymentId}.pdf`
  );

  // Kirim file dengan opsi inline agar bisa ditampilkan di browser
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=invoice.pdf");

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Gagal mengunduh file");
    }
  });
};
