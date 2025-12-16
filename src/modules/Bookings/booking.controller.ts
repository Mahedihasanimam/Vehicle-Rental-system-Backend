import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createbookingINDB = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createbookingINDB(req.body);
    return res.status(201).json({
      success: true,
      message: "booking created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

const getAllbookingsFromDB = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getallBookings();

    return res.status(200).json({
      success: true,
      message:
        result.length > 0
          ? "bookings retrieved successfully"
          : "No bookings found",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const updatebookingfromController = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const result = await bookingService.updatebookingByid(
      bookingId as string,
      req.body.status as string
    );
    return res.status(200).json({
      success: true,
      message: `booking ${result.status} successfully`,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const bookingController = {
  createbookingINDB,
  getAllbookingsFromDB,
  updatebookingfromController,
};
