import { Request, Response } from "express";
import {
  InvoiceHistory,
  Payment,
  DamageReporting,
  UserReport,
  RoomOccupancy,
} from "../models/penghuni-model"; // Sesuaikan dengan path model Anda

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
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: "Error creating payment", error });
  }
};

// Controller untuk membuat laporan kerusakan fasilitas
export const createDamageReport = async (req: Request, res: Response) => {
  const { message } = req.body;

  try {
    const newReport = new DamageReporting({
      message,
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
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
