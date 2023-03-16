import React from "react";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import GradeIcon from "@mui/icons-material/Grade";
import { grey, yellow } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

function ReposList({
  name,
  star,
  description,
}: {
  name: string;
  star: number;
  description: string | any;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: grey[300],
        p: 2,
      }}
    >
      <ListItemText primary={name} secondary={description} />
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <Typography>{star}</Typography>
        <GradeIcon
          sx={{
            color: "#000",
          }}
        />
      </Box>
    </Box>
  );
}

export default ReposList;
