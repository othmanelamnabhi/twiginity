import { Stack, Container } from "@mui/material";
import { CustomH2, CustomButton } from "./StyledComponents";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReplayIcon from "@mui/icons-material/Replay";

export default function SuccessScreen({ setState, setLoading }) {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 100, color: "lightgreen" }} />

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
          All your tweets have been processed.
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
