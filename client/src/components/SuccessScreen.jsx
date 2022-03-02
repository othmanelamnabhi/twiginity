import { Stack, Container } from "@mui/material";
import { CustomH2 } from "./StyledComponents";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SuccessScreen() {
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
      </Stack>
    </Container>
  );
}
