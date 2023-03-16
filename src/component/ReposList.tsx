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
        bgcolor: grey[200],
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: 19 }}>
          {name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
          <Typography>{star}</Typography>
          <GradeIcon
            sx={{
              color: "#000",
            }}
          />
        </Box>
      </Box>
      <Typography sx={{ mt: 2, minWidth: "40px" }}>{description}</Typography>
    </Box>
  );
}

export default ReposList;
