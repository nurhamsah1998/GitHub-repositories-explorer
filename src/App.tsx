import React from "react";
import Box from "@mui/material/Box";
import { AxiosResponse } from "axios";
import api from "./client/api";
import Form from "./component/Form";
import UserList from "./component/UserList";
import Loading from "./component/Loading";
import Typography from "@mui/material/Typography";
import AlertDialog from "./component/AlertDialog";
import { REDUCER_STATE, reducer } from "./Hook/reducer";
import StartList from "./component/StartList";
import Drawer from "./component/Drawer";
import grey from "@mui/material/colors/grey";

const initialState = {
  isLoading: false,
  isEmptyField: false,
  isNotFound: false,
  startScreen: true,
};
function App() {
  const inputRef: any = React.useRef<{ search: string }>({ search: "" });
  const [searchHelperText, setSearchHelperText] = React.useState<string>("");
  const [data, setData] = React.useState<[]>([]);
  const [state, dispatch]: REDUCER_STATE | any = React.useReducer<any>(
    reducer,
    initialState
  );
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
    if (inputRef.current.search === "")
      return dispatch({ type: "showRequiredField" });
    dispatch({ type: "showLoading" });
    dispatch({ type: "startScreen", startScreen: false });
    setSearchHelperText(inputRef.current.search);
    await api
      .get(`/search/users?q=${inputRef.current.search}&per_page=5`)
      .then((res: AxiosResponse<any, any>) => {
        const dataRebuild = res.data?.items?.map((i: any) => ({
          ...i,
          repos: [],
        }));
        setData(dataRebuild);
        dispatch({
          type: "isNotFound",
          value: Boolean(res.data?.items?.length <= 0),
        });
        dispatch({ type: "hideLoading" });
        dispatch({ type: "hideRequiredField" });
      })
      .catch((error: any) => {
        if (error.code?.includes("ERR_NETWORK")) {
          setDialog({
            headerTitle: error.message,
            open: true,
            message:
              "Check your internet network. It seems you are not connected to the internet",
          });
          dispatch({
            type: "isNotFound",
            value: false,
          });
          dispatch({ type: "hideLoading" });
          dispatch({ type: "hideRequiredField" });
        }
      });
  };

  const showTextSearchInfo: boolean = Boolean(searchHelperText);
  return (
    <Drawer
      headerContent={
        <Box sx={{ width: "100%" }}>
          <Form
            autoFocus={!state.isLoading}
            error={state.isEmptyField}
            isLoading={state.isLoading}
            search={inputRef.current.search}
            onSearch={onSearch}
            handleChange={handleChange}
          />
          {showTextSearchInfo ? (
            <Typography sx={{ mt: 1, color: grey[800] }}>
              Showing users for "{searchHelperText}"
            </Typography>
          ) : null}
        </Box>
      }
    >
      <AlertDialog
        message={dialog.message}
        headerTitle={dialog.headerTitle}
        open={dialog.open}
        setOpen={setDialog}
      />
      {state.startScreen && <StartList />}
      <Box sx={{ px: { xs: 1, md: 3 }, my: 2 }}>
        {state.isLoading ? (
          <Loading />
        ) : (
          <UserList
            setData={setData}
            data={data}
            isNotFound={state.isNotFound}
          />
        )}
      </Box>
    </Drawer>
  );
}

export default App;
