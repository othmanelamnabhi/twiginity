import { Stack, Container } from "@mui/material";
import { CustomH2, CustomButton } from "./StyledComponents";
import HomeIcon from "@mui/icons-material/Home";
import error404 from "../404.png";

export default function Error404() {
  return (
    <Container
      sx={{ height: `calc(100% - 90px)`, display: "flex", justifyContent: "center" }}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <img src={error404} alt='error 404' width={300} />
        <CustomH2 variant='body1'>You seem to be lost.</CustomH2>
        <CustomButton
          variant='contained'
          startIcon={<HomeIcon />}
          href='/'
          size='large'
          sx={{ width: "fit-content" }}>
          Go back home ?
        </CustomButton>
      </Stack>
    </Container>
  );
}
