import * as React from "react";
import { SetStateAction } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios, { AxiosResponse } from "axios";
import Loading from "./Loading";
import ReposList from "./ReposList";
import ListNotFound from "./ListNotFound";
import EmptyList from "./EmptyList";
import Link from "./Link";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",

  "& .css-3vmltg": {
    transform: "rotate(-90deg)",
  },
  ".css-v84d5j-MuiSvgIcon-root": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
function UserList({
  data,
  setData,
  isNotFound,
}: {
  data: [];
  isNotFound: boolean;
  setData: React.Dispatch<SetStateAction<[]>> | any;
}) {
  const [isLoading, setIsloading] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<number | false>(6);
  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const handleClickAccordion: (i: any) => Promise<void> = async (i: any) => {
    setIsloading(true);
    /// prevent it from refetching again after getting the repo list
    if (i?.repos?.length <= 0 || i?.repos?.isError) {
      console.log("hello");
      await axios
        .get(i?.repos_url)
        .then((res: AxiosResponse<any, any>) => {
          const newData: any[] = data?.map((x: any) => {
            if (x?.id === i?.id) {
              return {
                ...x,
                repos: res.data,
                isEmptyRepos: Boolean(res.data?.length <= 0),
              };
            }
            return x;
          });
          setData(newData);
          setIsloading(false);
        })
        .catch((error: any) => {
          if (error.code?.includes("ERR_NETWORK")) {
            const newDataIfNetworkLost: any[] = data?.map((x: any) => {
              if (x?.id === i?.id) {
                return {
                  ...x,
                  repos: { isError: true, message: "Network Error" },
                };
              }
              return x;
            });
            setData(newDataIfNetworkLost);
            setIsloading(false);
          }
        });
    } else {
      setIsloading(false);
      return;
    }
  };

  return (
    <Box>
      {isNotFound ? (
        <ListNotFound />
      ) : (
        <Box sx={{ mt: 1, display: "grid", gap: 2 }}>
          {data?.map((item: any, index: number) => {
            const isEmpty: boolean = item?.repos?.length <= 0;
            const isNoNetworkConnection: boolean = item?.repos?.isError;
            const Content: () => JSX.Element = () => {
              return (
                <Box>
                  {isEmpty ? (
                    <EmptyList title="Empty" tag="No public repos to show" />
                  ) : (
                    <Box sx={{ display: "grid", gap: 2 }}>
                      {item?.repos?.map((repos: any, keyindex: number) => {
                        return (
                          <ReposList
                            star={repos?.stargazers_count}
                            key={keyindex}
                            name={repos?.name}
                            description={repos?.description}
                          />
                        );
                      })}
                    </Box>
                  )}
                </Box>
              );
            };
            return (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  onClick={(
                    i: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => {
                    if (expanded !== index) {
                      handleClickAccordion(item);
                    }
                  }}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{
                    bgcolor:
                      item?.repos?.length >= 1 || item?.isEmptyRepos
                        ? "#c6e2ff"
                        : isNoNetworkConnection
                        ? "#ffc6c6"
                        : grey[200],
                    transition: "0.5s",
                    position: expanded === index ? "sticky" : "relative",
                    top: 0,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {item?.login}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ borderBottom: `${grey[300]} 1px solid` }}
                >
                  {isLoading ? (
                    <Loading height="10vh" />
                  ) : isNoNetworkConnection ? (
                    <EmptyList
                      title={item?.repos?.message}
                      customTag={
                        <Typography
                          sx={{ textAlign: "center", color: grey[500] }}
                        >
                          Check your internet network. It seems you are not
                          connected to the internet.{" "}
                          <Link onClick={() => handleClickAccordion(item)}>
                            Refresh
                          </Link>
                        </Typography>
                      }
                    />
                  ) : (
                    <Content />
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default UserList;
