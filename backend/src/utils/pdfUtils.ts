import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const ensureInvoicesFolderExists = () => {
  const invoicesDir = path.resolve("./invoices");
  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir);
  }
};

export const generateInvoicePDF = (payment: any) => {
  // Pastikan folder 'invoices' ada
  ensureInvoicesFolderExists();

  const doc = new PDFDocument();
  const filePath = `./invoices/invoice-${payment._id}.pdf`;

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Isi dokumen PDF
  doc.fontSize(20).text("Invoice Pembayaran", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Invoice ID: ${payment._id}`);
  doc.text(`Tanggal: ${new Date().toLocaleDateString()}`);

  doc.moveDown();
  doc.text("Detail Pembayaran:");
  if (payment.payment_method === "QRIS") {
    doc.text(`Metode Pembayaran: QRIS`);
  } else if (payment.payment_method === "BANK_TRANSFER") {
    doc.text(`Metode Pembayaran: Transfer Bank`);
    doc.text(`Nama Bank: ${payment.bank_name || "Tidak Disebutkan"}`);
  }

  doc.moveDown();
  doc.text("Rincian Biaya:");
  doc.text(`Total Tagihan: Rp ${payment.total_bill.toLocaleString("id-ID")}`);
  doc.text(`Periode Sewa: ${payment.rent_periods} bulan`);
  doc.moveDown();
  doc.text("Terima kasih atas pembayaran Anda!", { align: "center" });

  doc.end();

  return new Promise<string>((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", (err) => reject(err));
  });
};
