import { Request, Response } from "express";
import { User } from "../models/home-model";
import {
  InvoiceHistory,
  Payment,
  DamageReporting,
  UserReport,
  RoomOccupancy,
} from "../models/penghuni-model";
import { generateInvoicePDF } from "../utils/pdfUtils";
import path from "path";

// Controller untuk menampilkan history tagihan
export const getInvoiceHistory = async (req: Request, res: Response) => {
  try {
    const invoiceHistory = await InvoiceHistory.find();
    res.status(200).json(invoiceHistory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoice history", error });
  }
};

// Controller untuk membuat pembayaran
export const createPayment = async (req: Request, res: Response) => {
  const { total_bill, payment_method, rent_periods } = req.body;

  try {
    const newPayment = new Payment({
      total_bill,
      payment_method,
      rent_periods,
    });
    await newPayment.save();

    const pdfPath = await generateInvoicePDF(newPayment);

    res.status(201).json({
      message: "Payment created successfully",
      payment: newPayment,
      invoice: path.basename(pdfPath),
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment", error });
  }
};

export const createDamageReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { message, username } = req.body; // Ambil message dan username dari request body

  try {
    // Cari pengguna berdasarkan username (atau nama) yang diberikan di request body
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Buat laporan kerusakan dengan menggunakan ID pengguna
    const newReport = new DamageReporting({
      user: user._id, // Menyimpan ID pengguna (referensi ke model User)
      message,
    });

    // Simpan laporan kerusakan ke database
    await newReport.save();

    // Kembalikan respons sukses dengan message dan nama pengguna
    res.status(201).json({
      message: "Damage report created successfully",
      report: {
        message: newReport.message,
        user: user.username, // Menambahkan nama pengguna pada respons
      },
    });
  } catch (error) {
    // Tangani error jika ada
    res.status(500).json({ message: "Error creating damage report", error });
  }
};

// Controller untuk membuat laporan penghuni
export const createUserReport = async (req: Request, res: Response) => {
  const { message } = req.body;

  try {
    const newReport = new UserReport({
      message,
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: "Error creating user report", error });
  }
};

// Controller untuk menampilkan status okupansi kamar
export const getRoomOccupancy = async (req: Request, res: Response) => {
  try {
    const occupancy = await RoomOccupancy.find();
    res.status(200).json(occupancy);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room occupancy", error });
  }
};
