import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CompanyDetails } from "../entity/CompanyDetails";
const AWS = require("aws-sdk");

const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to a file
    new winston.transports.File({ filename: "combined.log" }), // Log all levels to a file
  ],
});
const s3Client = new AWS.S3({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
export class CompanyDetailsController {
  private CompanyDetails = AppDataSource.getRepository(CompanyDetails);

  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const companies = await this.CompanyDetails.find({
        order: {
          createdAt: "DESC",
        },
      });
      response.json(companies);
    } catch (error) {
      logger.error(`Error in getAll: ${error}`);
      response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async byId(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const user = await this.CompanyDetails.findOne({ where: { id } });
      if (!user) {
        response.status(404).json({ message: "User not found" });
      } else {
        response.json(user);
      }
    } catch (error) {
      logger.error(`Error in byId: ${error}`);
      response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createCompanyDetails(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { companyName, companyUEN, contactName, position, email, mobile } =
        request.body;
      const company = Object.assign(new CompanyDetails(), {
        companyName,
        companyUEN,
        contactName,
        position,
        email,
        mobile,
        currentDate: new Date().toISOString(), // Get current date in yyyy-mm-dd format
      });

      const savedCompany = await this.CompanyDetails.save(company);

      response.status(201).json(savedCompany);
    } catch (error) {
      logger.error(`Error in createCompanyDetails: ${error}`);
      response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async generateUploadURL(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { fileName } = request.body;
      if (!fileName) {
        return response.status(400).json({ message: "File name is required!" });
      }

      const params = {
        Bucket: "credilinq-assignment",
        Key: fileName,
        Expires: 120,
      };
      const uploadURL = await s3Client.getSignedUrlPromise("putObject", params);
      return uploadURL;
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Error uploading files!" });
    }
  }
}
