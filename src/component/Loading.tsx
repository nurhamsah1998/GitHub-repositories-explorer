import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Loading({ height = "50vh" }: { height?: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <CircularProgress />
        <Typography>Please Wait</Typography>
      </Box>
    </Box>
  );
}

export default Loading;
