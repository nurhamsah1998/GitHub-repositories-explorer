import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";

function Form({
  search,
  handleChange,
  isLoading,
  onSearch,
  error,
}: {
  search: string;
  error: boolean;
  handleChange: (
    i: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  isLoading: boolean;
  onSearch: (i: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const helperText = error && "* this field is required";
  return (
    <form>
      <TextField
        error={error}
        defaultValue={search}
        onChange={handleChange}
        fullWidth
        helperText={helperText}
        sx={{
          bgcolor: grey[200],
        }}
        size="small"
        InputProps={{
          endAdornment: <SearchIcon sx={{ color: grey[500] }} />,
        }}
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
