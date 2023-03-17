import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
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
  onSearch: (i: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => void;
}) {
  const helperText: false | string = error && "* this field is required";
  return (
    <form onSubmit={onSearch}>
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
