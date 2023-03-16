import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

function EmptyList({
  title,
  tag,
  customTag,
}: {
  title: string;
  tag?: string;
  customTag?: string | JSX.Element;
}) {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: grey[500],
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: grey[500],
          textAlign: "center",
          fontSize: 15,
        }}
      >
        {tag}
      </Typography>
      {customTag}
    </Box>
  );
}

export default EmptyList;
