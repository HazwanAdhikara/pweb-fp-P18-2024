import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path";

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
  const filePath = `./src/invoices/invoice-${payment._id}.pdf`;

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Isi dokumen PDF
  doc.fontSize(20).text("Invoice Pembayaran", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Invoice ID: ${payment._id}`);
  doc.text(`Tanggal: ${new Date().toLocaleDateString()}`);
  doc.text(`Metode Pembayaran: ${payment.payment_method}`);
  doc.text(`Jumlah Tagihan: Rp ${payment.total_bill}`);
  doc.text(`Periode Sewa: ${payment.rent_periods} bulan`);
  doc.moveDown();
  doc.text("Terima kasih atas pembayaran Anda!", { align: "center" });
  doc.end();

  return new Promise<string>((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", (err) => reject(err));
  });
};
