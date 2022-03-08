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
          {state?.queuedTweets > 100 ? (
            <>
              <CustomH2>{`There are currently ${state.queuedTweets} tweets being processed.`}</CustomH2>
              <CustomH2>{`You can safely close this window, we'll get to yours.`}</CustomH2>
            </>
          ) : (
            <CustomH2>{`Processing your ${state.tweetCount} tweet(s)`}</CustomH2>
          )}
        </Stack>
      </Backdrop>
    </div>
  );
}
