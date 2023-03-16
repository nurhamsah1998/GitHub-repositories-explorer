import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

function ListNotFound() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mt: 2,
            fontWeight: "bold",
            color: grey[500],
          }}
        >
          Oops! Not Found
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: grey[500],
          }}
        >
          Nothing to show, try to enter the correct word. for example "
          nurhamsah1998 "
        </Typography>
      </Box>
    </Box>
  );
}

export default ListNotFound;
