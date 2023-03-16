import React from "react";
import Box from "@mui/material/Box";
import { AxiosResponse } from "axios";
import api from "./client/api";
import Form from "./component/Form";
import UserList from "./component/UserList";
import Loading from "./component/Loading";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function App() {
  const inputRef: any = React.useRef<{ search: string }>({ search: "" });
  const [searchHelperText, setSearchHelperText] = React.useState<string>("");
  const [data, setData] = React.useState<[]>([]);
  const [isEmptyField, setIsEmptyField] = React.useState<boolean>(false);
  const [isLoading, setIsloading] = React.useState<boolean>(false);
  const [isNotFound, setIsNotFound] = React.useState<boolean>(false);
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
        console.log(error);
        setIsNotFound(false);
        setIsloading(false);
        setIsEmptyField(false);
      });
  };
  const showTextSearchInfo = Boolean(searchHelperText);
  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          bgcolor: "#eeee",
          py: 1,
          px: 3,
        }}
      >
        <Form
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
      <Box sx={{ mx: 3, my: 2 }}>
        {isLoading ? (
          <Loading />
        ) : (
          <UserList setData={setData} data={data} isNotFound={isNotFound} />
        )}
      </Box>
    </Box>
  );
}

export default App;
