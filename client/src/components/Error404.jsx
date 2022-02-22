import { Stack, Container, useMediaQuery, useTheme } from "@mui/material";
import { CustomH2, CustomButton } from "./StyledComponents";
import HomeIcon from "@mui/icons-material/Home";
import error404 from "../404.png";

export function useAppBarHeight() {
  const {
    mixins: { toolbar },
    breakpoints,
  } = useTheme();
  const toolbarDesktopQuery = breakpoints.up("sm");
  const toolbarLandscapeQuery = `${breakpoints.up("xs")} and (orientation: landscape)`;
  const isDesktop = useMediaQuery(toolbarDesktopQuery);
  const isLandscape = useMediaQuery(toolbarLandscapeQuery);
  let currentToolbarMinHeight;
  if (isDesktop) {
    currentToolbarMinHeight = toolbar[toolbarDesktopQuery];
  } else if (isLandscape) {
    currentToolbarMinHeight = toolbar[toolbarLandscapeQuery];
  } else {
    currentToolbarMinHeight = toolbar;
  }
  return currentToolbarMinHeight.minHeight;
}

export default function Error404() {
  const lol = useAppBarHeight();
  console.log(lol);
  return (
    <Container
      sx={{ height: `calc(100% - 90px)`, display: "flex", justifyContent: "center" }}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <img src={error404} alt='error 404' width={300} />
        <CustomH2
          variant='body1'
          //   sx={{
          //     fontSize: {
          //       xs: "2em",
          //       md: "3.75em",
          //     },
          //     textAlign: {
          //       xs: "center",
          //       md: "initial",
          //     },
          //   }}
        >
          You seem to be lost.
        </CustomH2>
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
