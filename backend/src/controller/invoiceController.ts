// controllers/invoiceController.ts
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const downloadInvoice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { paymentId } = req.params;
    console.log("Requested Download ID:", paymentId);

    // clean up the invoice name for endpoint
    const cleanPaymentId = paymentId
      .replace(/^invoice-/, "")
      .replace(/\.pdf$/, "");

    // Validate paymentId
    if (!cleanPaymentId) {
      res.status(400).json({ message: "Payment ID is required" });
      return;
    }

    // Tentukan path file with cleaned ID
    const filePath = path.resolve(
      __dirname,
      `../../invoices/invoice-${cleanPaymentId}.pdf`
    );

    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        message: "Invoice not found",
        error: `No invoice found for payment ID: ${cleanPaymentId}`,
      });
      return;
    }

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${cleanPaymentId}.pdf`
    );
    res.setHeader("Cache-Control", "no-cache");

    // Stream the file instead of loading it entirely into memory
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // Handle streaming errors
    fileStream.on("error", (error) => {
      console.error("Error streaming file:", error);
      res.status(500).json({
        message: "Error downloading invoice",
        error: error.message,
      });
    });
  } catch (error) {
    console.error("Error in downloadInvoice:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
