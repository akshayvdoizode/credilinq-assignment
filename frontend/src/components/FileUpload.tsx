import {
  CancelRounded,
  CircleNotifications,
  Done,
  RotateRightRounded,
} from "@mui/icons-material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState } from "react";
interface Props {
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}
interface UploadStatus {
  [fileName: string]: { error: boolean | null; uploading: boolean };
}
const FileUpload = ({ setUploadedFiles, uploadedFiles }: Props) => {
  const [uploadStatus, setUploadStatus] = useState({} as UploadStatus);

  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0 && files.length <= 6) {
      const filesArray = Array.from(files);
      setUploadedFiles(filesArray);
      uploadAllFiles(files);
    } else {
      alert("Please select up to 6 files.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleFileUpload(files);
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const filesArray = Array.from(event.dataTransfer.files);
    setUploadedFiles(filesArray);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  async function requestSignedUrl(file: File): Promise<string | null> {
    try {
      const response = await axios.post("http://localhost:5000/s3token", {
        fileName: file.name,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error getting signed URL for",
        file.name,
        ":",
        (error as Error).message
      );
      return null;
    }
  }

  async function uploadFile(
    file: File,
    signedUrl: string
  ): Promise<{ success: boolean; progress: number }> {
    try {
      const formData = new FormData();
      formData.append("files", file);

      let percentCompleted = 0;

      await axios.put(signedUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent?.total!
          );
          return percentCompleted;
        },
      });

      return { success: true, progress: percentCompleted };
    } catch (error) {
      console.error(
        "Error uploading",
        file.name,
        ":",
        (error as Error).message
      );
      return { success: false, progress: 0 };
    }
  }

  async function uploadAllFiles(files: FileList) {
    const status: UploadStatus = {};
    const filesArray = Array.from(files);

    for (const file of filesArray) {
      const signedUrl = await requestSignedUrl(file);
      if (signedUrl) {
        const uploadResult = await uploadFile(file, signedUrl);
        status[file.name] = {
          error: !uploadResult.success,
          uploading: uploadResult.progress < 100,
        };
      } else {
        status[file.name] = {
          error: true, // There's an error if signedUrl is not available
          uploading: false, // Not uploading if signedUrl is not available
        };
      }
    }

    setUploadStatus(status);
  }

  const ErrorMessage = () => (
    <Typography
      variant="body2"
      color="error"
      align="center"
      sx={{ marginTop: 1 }}
    >
      We cannot process the request at this time
    </Typography>
  );
  const handleRemoveClick = (fileToRemove: File) => {
    const updatedFiles = uploadedFiles.filter((file) => file !== fileToRemove);
    setUploadedFiles(updatedFiles);
  };
  const FileListItem = ({
    file,
    uploadStatus,
  }: {
    file: File;
    uploadStatus: UploadStatus;
  }) => {
    const isError = uploadStatus[file.name]?.error === false;
    const { uploading } = uploadStatus[file.name] || false;
    return (
      <>
        <ListItem
          key={file.name}
          sx={{
            border: isError ? "1px solid red" : "1px solid green",
            borderRadius: "45px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <ListItemIcon>
                {isError ? (
                  <RotateRightRounded color={"error"} />
                ) : uploading ? (
                  <CircleNotifications />
                ) : (
                  <Done color={"success"} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                title={file.name}
                sx={{
                  display: "inline",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              />
            </Box>
            <ListItemIcon
              onClick={() => handleRemoveClick(file)}
              sx={{ cursor: "pointer" }}
            >
              <CancelRounded color={isError ? "error" : "success"} />
            </ListItemIcon>
          </Box>
        </ListItem>
        {isError && <ErrorMessage />}
      </>
    );
  };

  return (
    <Box>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          padding: "40px 24px",
          borderRadius: 4,
          border: "1px dashed rgba(0, 0, 0, 0.118)",
          backgroundColor: "rgb(250, 250, 250)",
          color: "rgb(189, 189, 189)",
          height: "200px",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Grid item>
          <Box sx={{ textAlign: "center" }} color={"rebeccapurple"}>
            <label htmlFor="upload-button" style={{ cursor: "pointer" }}>
              <input
                id="upload-button"
                type="file"
                multiple
                style={{ display: "none" }}
                accept="application/pdf"
                onChange={handleInputChange}
                disabled={uploadedFiles.length > 0}
              />
              <IconButton sx={{ bgcolor: "white" }}>
                <UploadFileIcon />
              </IconButton>

              <Box sx={{ cursor: "pointer" }}>
                <Box
                  display={"inline"}
                  borderBottom={"1px solid rgb(0, 0, 84)"}
                >
                  Click to upload{" "}
                </Box>
                or drag and drop Bank statements
              </Box>
            </label>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          pt: 5,
          width: 200,
        }}
      >
        {uploadedFiles.map((file, index) => (
          <FileListItem key={index} file={file} uploadStatus={uploadStatus} />
        ))}
      </Box>
    </Box>
  );
};

export default FileUpload;
