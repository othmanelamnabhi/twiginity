import { Stack, Container } from "@mui/material";
import { CustomH2, CustomButton } from "./StyledComponents";
import ErrorIcon from "@mui/icons-material/Error";
import ReplayIcon from "@mui/icons-material/Replay";
import noResults from "../twitter-no-results.png";

export default function ErrorOrNoResults({ error, message, setState, setLoading }) {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        {error ? (
          <ErrorIcon sx={{ fontSize: 100, color: "white" }} />
        ) : (
          <img src={noResults} alt='no results' width={300} />
        )}

        <CustomH2
          variant='body1'
          sx={{
            fontSize: {
              xs: "1.5em",
              md: "1.5em",
            },
            textAlign: {
              xs: "center",
              md: "initial",
            },
          }}>
          {error ? message : "No tweets corresponding to your search criteria."}
        </CustomH2>
        <CustomButton
          variant='contained'
          startIcon={<ReplayIcon />}
          onClick={() => {
            setState({ type: "ready" });
            setLoading(false);
          }}
          sx={{ width: "fit-content" }}>
          Try again ?
        </CustomButton>
      </Stack>
    </Container>
  );
}
