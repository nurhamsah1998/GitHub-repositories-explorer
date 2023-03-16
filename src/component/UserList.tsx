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

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
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
  const handleClickAccordion = async (i: any) => {
    setIsloading(true);
    /// prevent it from refetching again after getting the repo list
    if (i?.repos?.length <= 0) {
      await axios
        .get(i?.repos_url)
        .then((res: AxiosResponse<any, any>) => {
          const newData: any[] = data?.map((x: any) => {
            if (x?.id === i?.id) {
              return { ...x, repos: res.data };
            }
            return x;
          });
          setData(newData);
          setIsloading(false);
        })
        .catch((error: any) => {
          console.log(error);
          setIsloading(false);
        });
    } else {
      setIsloading(false);
      return;
    }
  };

  return (
    <Box>
      {isNotFound ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <Box>
            <img
              src="/no-data.svg"
              style={{
                maxWidth: "230px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mt: 2,
                fontWeight: "bold",
                color: grey[500],
              }}
            >
              Not Found
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 1, display: "grid", gap: 2 }}>
          {data?.map((item: any, index: number) => {
            const isEmpty = item?.repos?.length <= 0;

            const Content = () => {
              return (
                <Box>
                  {isEmpty ? (
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: grey[500],
                          textAlign: "center",
                        }}
                      >
                        Empty
                      </Typography>
                      <Typography
                        sx={{
                          color: grey[500],
                          textAlign: "center",
                          fontSize: 15,
                        }}
                      >
                        there may not be shared repos
                      </Typography>
                    </Box>
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
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {item?.login}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ borderBottom: `${grey[300]} 1px solid` }}
                >
                  {isLoading ? <Loading height="10vh" /> : <Content />}
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
