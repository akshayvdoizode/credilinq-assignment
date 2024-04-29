import { CompanyDetailsController } from "./controller/CompanyDetails";

export const Routes = [
  {
    method: "get",
    route: "/company",
    controller: CompanyDetailsController,
    action: "getAll",
  },
  {
    method: "get",
    route: "/company/:id",
    controller: CompanyDetailsController,
    action: "byId",
  },
  {
    method: "post",
    route: "/company",
    controller: CompanyDetailsController,
    action: "createCompanyDetails",
  },
  {
    method: "post",
    route: "/s3token",
    controller: CompanyDetailsController,
    action: "generateUploadURL",
  },
];
