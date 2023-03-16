import React from "react";
import Box from "@mui/material/Box";
import { AxiosResponse } from "axios";
import { DialogContext } from "./Hook/context";
import api from "./client/api";
import Form from "./component/Form";
import UserList from "./component/UserList";
import Loading from "./component/Loading";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AlertDialog from "./component/AlertDialog";

function App() {
  const inputRef: any = React.useRef<{ search: string }>({ search: "" });
  const [searchHelperText, setSearchHelperText] = React.useState<string>("");
  const [data, setData] = React.useState<[]>([]);
  const [isEmptyField, setIsEmptyField] = React.useState<boolean>(false);
  const [isLoading, setIsloading] = React.useState<boolean>(false);
  const [isNotFound, setIsNotFound] = React.useState<boolean>(false);
  const [dialog, setDialog] = React.useState({
    open: false,
    message: "text",
    headerTitle: "text",
  });
  const handleChange = (
    i: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    inputRef.current.search = i.currentTarget.value;
  };
  const onSearch = async (
    i: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    i.preventDefault();
    if (inputRef.current.search === "") return setIsEmptyField(true);
    setIsloading(true);
    setSearchHelperText(inputRef.current.search);
    await api
      .get(`/search/users?q=${inputRef.current.search}&per_page=5`)
      .then((res: AxiosResponse<any, any>) => {
        const dataRebuild = res.data?.items?.map((i: any) => ({
          ...i,
          repos: [],
        }));
        setData(dataRebuild);
        setIsNotFound(Boolean(res.data?.items?.length <= 0));
        setIsloading(false);
        setIsEmptyField(false);
      })
      .catch((error: any) => {
        if (error.code?.includes("ERR_NETWORK")) {
          setDialog({
            headerTitle: error.message,
            open: true,
            message:
              "Check your internet network. It seems you are not connected to the internet",
          });
          setIsNotFound(false);
          setIsloading(false);
          setIsEmptyField(false);
        }
      });
  };
  const showTextSearchInfo = Boolean(searchHelperText);
  return (
    <Box>
      <AlertDialog
        message={dialog.message}
        headerTitle={dialog.headerTitle}
        open={dialog.open}
        setOpen={setDialog}
      />
      <DialogContext.Provider value={{ setDialog }}>
        <Paper
          elevation={3}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 999,
            bgcolor: "#eeee",
            py: 1,
            px: { xs: 1, md: 3 },
          }}
        >
          <Form
            autoFocus={!isLoading}
            error={isEmptyField}
            isLoading={isLoading}
            search={inputRef.current.search}
            onSearch={onSearch}
            handleChange={handleChange}
          />
          {showTextSearchInfo ? (
            <Typography sx={{ mt: 1 }}>
              Showing users for "{searchHelperText}"
            </Typography>
          ) : null}
        </Paper>
        <Box sx={{ px: { xs: 1, md: 3 }, my: 2 }}>
          {isLoading ? (
            <Loading />
          ) : (
            <UserList setData={setData} data={data} isNotFound={isNotFound} />
          )}
        </Box>
      </DialogContext.Provider>
    </Box>
  );
}

export default App;
