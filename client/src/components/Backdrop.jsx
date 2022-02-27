import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { CustomH2 } from "./StyledComponents";
import { Stack } from "@mui/material";

export default function SimpleBackdrop({ state }) {
  return (
    <div>
      <Backdrop sx={{ color: "#fff" }} open={state.processing ? true : false}>
        <Stack justifyContent='center' alignItems='center' spacing={2}>
          <CircularProgress color='inherit' />
          <CustomH2>{`Processing your ${state.tweetCount} tweets`}</CustomH2>
        </Stack>
      </Backdrop>
    </div>
  );
}
