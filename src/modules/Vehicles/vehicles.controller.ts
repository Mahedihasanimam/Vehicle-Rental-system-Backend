import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service";

const createvehicleINDB = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.createvehicleINDB(req.body);
    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
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

const getAllvehiclesFromDB = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getAllVehicls();

    return res.status(200).json({
      success: true,
      message:
        result.length > 0
          ? "Vehicles retrieved successfully"
          : "No vehicles found",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const getsingleVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getsingleVehicles({
      vehicleId: req.params.vehicleId as string,
    });

    if (!result) {
      return res.status(404).json({
        success: true,
        message: "Vehicle not found",
        data: result,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const updatevehiclefromController = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.vehicleId;
    const result = await vehicleService.updatevehicleByid(
      vehicleId as string,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
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
const deletevehiclefromController = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.vehicleId;
    const result = await vehicleService.deletevehiclesByID({
      vehicleId: vehicleId as string,
    });
    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
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

export const vehicleController = {
  createvehicleINDB,
  getAllvehiclesFromDB,
  getsingleVehicles,
  updatevehiclefromController,
  deletevehiclefromController,
};
