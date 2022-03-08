import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { CustomH2 } from "./StyledComponents";
import { Box } from "@mui/material";
import SuccessScreen from "./SuccessScreen";
import { useLayoutEffect, useRef } from "react";

export default function ProgressBar({
  tweetsProcessed,
  numberOfTweets,
  messages,
  setLoading,
  setState,
}) {
  const scrollToBottomRef = useRef();

  const done = tweetsProcessed === numberOfTweets;

  useLayoutEffect(() => {
    scrollToBottomRef.current?.scrollIntoView();
  });
  return (
    <>
      {done ? (
        <SuccessScreen setLoading={setLoading} setState={setState} />
      ) : (
        <LinearProgressWithLabel
          value={Math.round((tweetsProcessed / numberOfTweets) * 100)}
        />
      )}

      {messages.length > 0 ? (
        <Box
          sx={{
            overflowY: "scroll",
            height: "250px",
            backgroundColor: "#322f2f",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "2em",
            "::-webkit-scrollbar": {
              width: "0.7em",
              backgroundColor: "#544c4c",
              borderRadius: "5px",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "white",
              borderRadius: "5px",
            },
            md: {
              height: "150px",
            },
          }}>
          {" "}
          {messages.map(({ tweetId, deleteError, username }, index, arr) => {
            return (
              <div
                style={{ display: "flex", alignItems: "center" }}
                key={index}
                ref={arr[index + 1] ? null : scrollToBottomRef}>
                <CancelIcon sx={{ marginRight: ".5rem", color: "#B23842" }} />
                <CustomH2>
                  {deleteError === "notFound" ? (
                    `No tweet found with ID: ${tweetId}.`
                  ) : (
                    <span>
                      Tweet with ID:{" "}
                      <a
                        style={{ color: "white" }}
                        target='_blank'
                        href={`https://twitter.com/${username}/status/${tweetId}`}
                        rel='noreferrer'>
                        {tweetId}
                      </a>{" "}
                      failed to delete.
                    </span>
                  )}
                </CustomH2>
              </div>
            );
          })}
        </Box>
      ) : null}
    </>
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant='determinate'
          {...props}
          sx={{
            height: "10px",
            borderRadius: "20px",
            backgroundColor: "white",
            "& .MuiLinearProgress-bar": {
              backgroundColor: props.value === 100 ? "lightgreen" : "#B23842",
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35, textAlign: "right" }}>
        {props.value === 100 ? (
          <CheckCircleIcon sx={{ color: "lightgreen" }} />
        ) : (
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              textAlign: "right",
              color: "white",
            }}>{`${props.value}%`}</Typography>
        )}
      </Box>
    </Box>
  );
}
