import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import grey from "@mui/material/colors/grey";

function StartList() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "50vh",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: grey[500], textAlign: "center" }}
        >
          Hello, Welcome To GitHub Repositories Explorer
        </Typography>
        <Typography sx={{ color: grey[500], textAlign: "center" }}>
          give it a try by entering your github username
        </Typography>
      </Box>
    </Box>
  );
}

export default StartList;
