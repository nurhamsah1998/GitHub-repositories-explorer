import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";

function Form({
  search,
  handleChange,
  isLoading,
  onSearch,
  error,
  autoFocus,
}: {
  search: string;
  error: boolean;
  autoFocus: boolean;
  handleChange: (
    i: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  isLoading: boolean;
  onSearch: (i: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => void;
}) {
  const helperText = error && "* this field is required";
  const isEmptyField = Boolean(search);
  return (
    <form onSubmit={onSearch}>
      <TextField
        error={error}
        defaultValue={search}
        onChange={handleChange}
        fullWidth
        autoFocus={autoFocus}
        helperText={helperText}
        sx={{
          bgcolor: grey[200],
        }}
        size="small"
        // InputProps={{
        //   endAdornment: (
        //     <Box>
        //       {isEmptyField && (
        //         <Button
        //           variant="contained"
        //           color="inherit"
        //           sx={{
        //             borderRadius: 100,
        //             m: 1,
        //             minWidth: 0,
        //             minHeight: 0,
        //             px: 1,
        //             py: 0,
        //           }}
        //         >
        //           x
        //         </Button>
        //       )}
        //     </Box>
        //   ),
        // }}
        placeholder="Enter username"
      />
      <LoadingButton
        sx={{ mt: 2, textTransform: "capitalize" }}
        fullWidth
        loading={isLoading}
        type="submit"
        size="small"
        onClick={onSearch}
        variant="contained"
      >
        Search
      </LoadingButton>
    </form>
  );
}

export default Form;
