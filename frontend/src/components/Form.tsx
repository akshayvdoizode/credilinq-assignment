import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Stepper from "./Stepper";
const Form = () => {
  const theme = useTheme();

  const marginSpacingValue = theme.spacing(2);
  const gridWidth = theme.breakpoints.up("lg") ? 10 : 8;
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        bgcolor={"whitesmoke"}
      >
        <Grid item xs={12} lg={gridWidth}>
          <Box
            sx={{
              "& > :not(style)": {
                margin: marginSpacingValue,
                marginTop: 0,
                marginBottom: 0,
              },
            }}
          >
            <Paper elevation={3}>
              <Stepper />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
