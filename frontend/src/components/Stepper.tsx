import { CheckCircle } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Step,
  StepContent,
  StepIconProps,
  StepLabel,
  Stepper as Steps,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SingaporeFLag from "../assets/images/singapore-flag-icon.svg";
import FileUpload from "./FileUpload";
import {
  validateCompanyName,
  validateCompanyUEN,
  validateEmail,
  validateMobile,
  validateName,
  validatePosition,
} from "./Validations";
const steps = [
  "Company Information",
  "Applicant Information",
  "Upload Documents",
  "Terms & Conditions",
];
export type FormValues = {
  companyName: string;
  companyUEN: string;
  contactName: string;
  position: string;
  email: string;
  mobile: string;
  confirmEmail: string;
};

export default function Stepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [agree, setIagree] = useState(false);
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      companyName: "",
      companyUEN: "",
      contactName: "",
      position: "",
      email: "",
      mobile: "",
      confirmEmail: "",
    },
  });
  const { handleSubmit, formState, control, getValues, register } = methods;
  const { errors } = formState;
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const isEmailMatch = (confirmEmail: string) => {
    const email = getValues("email");
    if (!confirmEmail) {
      return "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(confirmEmail)) {
      return "Invalid email address format";
    } else if (email !== confirmEmail) {
      return "Email addresses do not match";
    }
  };
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/company",
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      navigate("/list");
      return response.data;
    } catch (error) {
      console.error("Error creating CompanyDetails:", error);
      throw error;
    }
  };

  function CustomStepIcon(props: StepIconProps) {
    const { active, completed } = props;

    if (completed) {
      return (
        <Box sx={{ color: "green" }}>
          <CheckCircle />
        </Box>
      );
    }

    if (active) {
      return (
        <Box
          sx={{
            backgroundColor: "rgb(236, 0, 85) ",
            borderRadius: "50%",
            padding: "6px",
            color: "white",
          }}
        >
          {props.icon}
        </Box>
      );
    }

    return (
      <Box
        sx={{
          backgroundColor: "#ccc",
          borderRadius: "50%",
          padding: "6px",
          color: "#333",
        }}
      >
        {props.icon}
      </Box>
    );
  }
  const CompanyInformation: React.FC = () => {
    return (
      <Box sx={{ pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="companyUEN"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("companyUEN", {
                    validate: validateCompanyUEN,
                  })}
                  label="Company UEN"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!errors.companyUEN}
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  helperText={errors.companyUEN?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="companyName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("companyName", {
                    validate: validateCompanyName,
                  })}
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const ApplicantInformation: React.FC = () => {
    return (
      <Box sx={{ pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="contactName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("contactName", {
                    validate: validateName,
                  })}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!errors.contactName}
                  helperText={errors.contactName?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="position"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("position", {
                    validate: validatePosition,
                  })}
                  label="Position within company"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!errors.position}
                  helperText={errors.position?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("email", {
                    validate: validateEmail,
                  })}
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="confirmEmail"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("confirmEmail", {
                    validate: isEmailMatch,
                  })}
                  label="Re-enter Email Address"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!errors.confirmEmail}
                  helperText={errors.confirmEmail?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="mobile"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("mobile", {
                    validate: validateMobile,
                  })}
                  label="Mobile"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  InputProps={{
                    style: { position: "relative" },
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={SingaporeFLag}
                          alt="/"
                          style={{ height: 20, marginRight: 8 }}
                        />
                        <span style={{ fontSize: "0.875rem" }}>+65</span>
                      </InputAdornment>
                    ),
                  }}
                  value={value}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    onChange(newValue);
                  }}
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const UploadDcouments: React.FC = () => {
    return (
      <Box sx={{ pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FileUpload
              setUploadedFiles={setUploadedFiles}
              uploadedFiles={uploadedFiles}
            />
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <Typography variant="body1">
                  <ListItemText>
                    PDFs (not scanned copies) of your company's operating bank
                    current account(s) statements for the past 6 months.
                    Example: If today is <br />
                    {new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    , then please upload bank statements from Oct 23 to Mar 24
                    (both months inclusive).
                  </ListItemText>
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <Typography variant="body1">
                  <ListItemText>
                    If your company is multi-banked, then please upload 6 months
                    bank statements for each bank account
                  </ListItemText>
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <Typography variant="body1">
                  <ListItemText>
                    If your file is password protected, we request you to remove
                    the password and upload the file to avoid submission failure
                  </ListItemText>
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <span>
                  In case if you are facing any issue while uploading bank
                  statements, Please contact us on
                  <Link
                    href="mailto:support@credilinq.ai"
                    underline="none"
                    sx={{ margin: 0, color: "rebeccapurple" }}
                  >
                    support@credilinq.ai
                  </Link>
                  .
                </span>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    );
  };
  const TermsAndConditions: React.FC = () => {
    return (
      <Grid container spacing={2} p={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox checked={agree} onChange={() => setIagree(!agree)} />
            }
            label=" By ticking, you are confirming that you have
                            understood and are agreeing to the details
                            mentioned:"
          />
          <List>
            <ListItem>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText>
                I confirm that I am the authorized person to upload bank
                statements on behalf of my company
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText>
                I assure you that uploaded bank statements and provided company
                information match and are of the same company, if there is a
                mismatch then my report will not be generated.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText>
                I understand that this is a general report based on the bank
                statements and Credilinq is not providing a solution or guiding
                me for my business growth
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <span>
                I have read and understand the
                <Link
                  href="https://smehealthcheck.credilinq.ai/terms-and-conditions"
                  underline="none"
                  target="_blank"
                  sx={{ margin: 0, color: "rebeccapurple" }}
                >
                  Terms & Conditions
                </Link>
                .
              </span>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Steps activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step} active completed={index < activeStep}>
              <StepLabel
                // @ts-ignore
                StepIconComponent={CustomStepIcon}
                StepIconProps={{
                  active: activeStep === index,
                  completed: index < activeStep,
                }}
              >
                <Box
                  color={"white"}
                  bgcolor={"rgb(96, 26, 121)"}
                  borderRadius={"5px"}
                  p={"8px 16px"}
                  fontSize={"20px"}
                  ml={"8px"}
                >
                  {step}
                </Box>
              </StepLabel>
              <StepContent>
                {index === 0 && <CompanyInformation />}
                {index === 1 && <ApplicantInformation />}
                {index === 2 && <UploadDcouments />}
                {index === 3 && <TermsAndConditions />}
              </StepContent>
            </Step>
          ))}
        </Steps>
        <Box display={"flex"} justifyContent="flex-end">
          <Button variant="contained" type="submit" disabled={!agree}>
            submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
