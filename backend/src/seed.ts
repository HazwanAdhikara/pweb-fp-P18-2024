import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "./models/home-model";
import {
  RoomOccupancy,
  InvoiceHistory,
  Payment,
  DamageReporting,
  UserReport,
  UserDetail,
} from "./models/penghuni-model";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "";

const seedDatabase = async () => {
  if (!mongoURI) {
    console.error("Error: MONGO_URI is not defined in the .env file.");
    return;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Seed Admin User
    const admin = {
      username: "admin",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    };

    const existingAdmin = await User.findOne({ username: admin.username });
    if (!existingAdmin) {
      await User.create(admin);
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }

    // Seed Regular Users
    const users = [
      {
        username: "lana",
        password: await bcrypt.hash("lana123", 10),
        role: "USER",
      },
      {
        username: "karen",
        password: await bcrypt.hash("karen123", 10),
        role: "USER",
      },
      {
        username: "nayla",
        password: await bcrypt.hash("nayla123", 10),
        role: "USER",
      },
    ];

    const savedUsers = [];
    for (const user of users) {
      let savedUser = await User.findOne({ username: user.username });
      if (!savedUser) {
        savedUser = await User.create(user);
        console.log(`User "${user.username}" added successfully.`);
      } else {
        console.log(`User "${user.username}" already exists. Skipping.`);
      }
      savedUsers.push(savedUser);
    }

    // Seed Room Occupancy
    const roomOccupancyData = [
      { empty: 5, filled: 5 }, // Example data
    ];

    await RoomOccupancy.deleteMany({});
    await RoomOccupancy.insertMany(roomOccupancyData);
    console.log("Room occupancy data seeded");

    // Seed Invoice History
    const invoiceHistoryData = [
      { bill: 6000000, created_at: new Date("2024-01-01") },
      { bill: 12000000, created_at: new Date("2024-06-01") },
    ];

    await InvoiceHistory.deleteMany({});
    const savedInvoices = await InvoiceHistory.insertMany(invoiceHistoryData);
    console.log("Invoice history data seeded");

    // Seed Payments
    const paymentData = [
      {
        total_bill: 6000000,
        payment_method: "QRIS",
        rent_periods: 3,
      },
      {
        total_bill: 12000000,
        payment_method: "BANK_TRANSFER",
        rent_periods: 6,
      },
    ];

    await Payment.deleteMany({});
    await Payment.insertMany(paymentData);
    console.log("Payment data seeded");

    // Seed Damage Reports
    const damageReports = [
      {
        user: savedUsers[0]._id, // User Lana
        message: "AC tidak berfungsi",
      },
      {
        user: savedUsers[1]._id, // User Karen
        message: "Lampu kamar mati",
      },
    ];

    await DamageReporting.deleteMany({});
    await DamageReporting.insertMany(damageReports);
    console.log("Damage reports seeded");

    // Seed User Reports
    const userReports = [
      {
        message: "Penghuni kamar sebelah terlalu berisik",
      },
      {
        message: "Penghuni tidak menjaga kebersihan dapur bersama",
      },
    ];

    await UserReport.deleteMany({});
    await UserReport.insertMany(userReports);
    console.log("User reports seeded");

    // Seed User Details
    const userDetails = savedUsers.map((user, index) => ({
      user: user._id, // Simpan ID referensi user
      invoice_history: savedInvoices[index % savedInvoices.length]._id, // Simpan ID invoice
    }));

    await UserDetail.deleteMany({});
    await UserDetail.insertMany(userDetails);
    console.log("User details seeded");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Run the seed function
seedDatabase();
