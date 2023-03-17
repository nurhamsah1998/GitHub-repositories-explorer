import Typography from "@mui/material/Typography";

function Link({
  children,
  onClick,
}: {
  children: any;
  onClick?: (i: any) => Promise<void> | any;
}) {
  return (
    <Typography
      onClick={onClick}
      component="span"
      sx={{
        color: "#1976d2",
        fontWeight: "bold",
        textDecoration: "underline",
        cursor: "pointer",
        "&:hover": {
          color: "blue",
        },
      }}
    >
      {children}
    </Typography>
  );
}

export default Link;
