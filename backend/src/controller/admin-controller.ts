import { Request, Response } from "express";
import {
  RoomOccupancy,
  DamageReporting,
  UserReport,
  UserDetail,
  Room,
  InvoiceHistory,
} from "../models/penghuni-model";
import { User } from "../models/home-model";

// Get Dashboard Occupancy
export const getOccupancy = async (req: Request, res: Response) => {
  try {
    const occupancy = await RoomOccupancy.find();
    res.status(200).json(occupancy);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room occupancy", error });
  }
};

// Get All Facility Reports
export const getFacilityReports = async (req: Request, res: Response) => {
  try {
    const reports = await DamageReporting.find()
      .populate("user", "username role") // Menambahkan detail user (username & role)
      .exec();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching facility reports", error });
  }
};

// Get All User Reports
export const getUserReports = async (req: Request, res: Response) => {
  try {
    const reports = await UserReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user reports", error });
  }
};

// Get User Details by ID (with Invoice History)
export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // ID pengguna yang diminta

    // Cari data pengguna berdasarkan ID
    const user = await User.findById(id).select("username role");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Cari riwayat tagihan (invoice history) untuk pengguna ini
    const invoiceHistory = await InvoiceHistory.find({ user: user._id });

    // Gabungkan detail pengguna dan riwayat tagihan
    const userDetail = {
      user: {
        username: user.username,
        role: user.role,
      },
      invoice_history: invoiceHistory,
    };

    res.status(200).json(userDetail); // Kirimkan data detail pengguna
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

// Remove User by ID
export const removeUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Hapus dari UserDetail terlebih dahulu
    await UserDetail.deleteMany({ user: id });

    // Hapus user dari koleksi User
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing user", error });
  }
};

// Get All Users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: "USER" }, "username role _id"); // Filter role USER
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get All Rooms
export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find().sort({ room_number: 1 }); // Mengurutkan berdasarkan nomor kamar
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error });
  }
};