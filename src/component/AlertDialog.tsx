import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  open,
  setOpen,
  headerTitle,
  message,
}: {
  open: boolean;
  headerTitle: string;
  message: string;
  setOpen: any;
}) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen((prev: any) => ({ ...prev, open: false }))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{headerTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={() => setOpen((prev: any) => ({ ...prev, open: false }))}
          autoFocus
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
