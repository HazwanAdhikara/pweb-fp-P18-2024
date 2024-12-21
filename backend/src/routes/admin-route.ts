import { Router } from "express";
import { Verification, VerifyAdmin } from "../middleware/auth";
import {
    getOccupancy,
    getFacilityReports,
    getUserReports,
    getUserDetails,
    removeUser,
    getUsers,
    getRooms
} from "../controller/admin-controller";

const adminRouter = Router();

// Middleware untuk verifikasi admin
adminRouter.use(Verification);
adminRouter.use(VerifyAdmin);

// Routes
adminRouter.get("/dashboard", getOccupancy);
adminRouter.get("/laporan/fasilitas", getFacilityReports);
adminRouter.get("/laporan/penghuni", getUserReports);
adminRouter.get("/penghuni/:id", getUserDetails);
adminRouter.delete("/penghuni/:id", removeUser);
adminRouter.get("/users", getUsers);
adminRouter.get("/rooms", getRooms);

export default adminRouter;