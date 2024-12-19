import mongoose from "mongoose";

// Enum untuk PaymentMethod
enum PaymentMethod {
  QRIS = "QRIS",
  BANK_TRANSFER = "BANK_TRANSFER",
}

// Schema untuk InvoiceHistory
const InvoiceHistorySchema = new mongoose.Schema(
  {
    bill: {
      type: Number,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Schema untuk Payment
const PaymentSchema = new mongoose.Schema(
  {
    total_bill: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    rent_periods: {
      type: Number,
      enum: [3, 6],
      required: true,
    },
  },
  { timestamps: true }
);

// Schema untuk DamageReporting
const DamageReportingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Referensi ke model Users
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Schema untuk UserReport
const UserReportSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Schema untuk RoomOccupancy
const RoomOccupancySchema = new mongoose.Schema(
  {
    empty: {
      type: Number,
      required: true,
    },
    filled: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Schema untuk UserDetail
const UserDetailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Referensi ke model User
      required: true,
    },
    invoice_history: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InvoiceHistory", // Referensi ke model InvoiceHistory
      required: true,
    },
  },
  { timestamps: true }
);

// Model untuk InvoiceHistory, Payment, DamageReporting, UserReport, RoomOccupancy
const InvoiceHistory = mongoose.model("InvoiceHistory", InvoiceHistorySchema);
const Payment = mongoose.model("Payment", PaymentSchema);
const DamageReporting = mongoose.model(
  "DamageReporting",
  DamageReportingSchema
);
const UserReport = mongoose.model("UserReport", UserReportSchema);
const RoomOccupancy = mongoose.model("RoomOccupancy", RoomOccupancySchema);
const UserDetail = mongoose.model("UserDetail", UserDetailSchema);

// Ekspor model agar bisa digunakan di controller atau file lain
export { InvoiceHistory, Payment, DamageReporting, UserReport, RoomOccupancy, UserDetail };
