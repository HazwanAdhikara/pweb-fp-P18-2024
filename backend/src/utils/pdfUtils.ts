import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path";

const invoicesDir = path.resolve(__dirname, "../../invoices");

const ensureInvoicesFolderExists = () => {
  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
  }
};

export const generateInvoicePDF = (payment: any) => {
  return new Promise<string>((resolve, reject) => {
    ensureInvoicesFolderExists();

    const filePath = path.join(invoicesDir, `invoice-${payment._id}.pdf`);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Isi dokumen PDF
    doc.fontSize(20).text("Invoice Pembayaran", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice ID: ${payment._id}`);
    doc.text(`Tanggal: ${new Date().toLocaleDateString()}`);

    // Informasi Metode Pembayaran
    if (payment.payment_method === "QRIS") {
      doc.text(`Metode Pembayaran: QRIS`);
    } else if (payment.payment_method === "BANK_TRANSFER") {
      doc.text(`Metode Pembayaran: ${payment.payment_method}`);
    }

    doc.text(`Jumlah Tagihan: Rp ${payment.total_bill}`);
    doc.text(`Periode Sewa: ${payment.rent_periods} bulan`);
    doc.moveDown();
    doc.text("Terima kasih atas pembayaran Anda!", { align: "center" });
    doc.end();

    stream.on("finish", () => {
      console.log(`File berhasil dibuat di ${filePath}`);
      resolve(filePath); // Resolve the promise when the file is created
    });
    stream.on("error", (err) => {
      console.error(`Error saat membuat file: ${err.message}`);
      reject(err); // Reject the promise if there's an error
    });
  });
};
