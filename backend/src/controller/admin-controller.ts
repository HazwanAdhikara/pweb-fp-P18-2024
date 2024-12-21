import { Request, Response } from "express";
import {
  RoomOccupancy,
  DamageReporting,
  UserReport,
  UserDetail,
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
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userDetail = await UserDetail.findOne({ user: id })
      .populate("user", "username role") // Populate detail user
      .populate("invoice_history") // Populate detail invoice history
      .exec();

    if (!userDetail) {
      res.status(404).json({ message: "User details not found" });
      return;
    }

    res.status(200).json(userDetail);
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
