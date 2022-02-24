import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import { Container, FormControl, Grid, Stack, Alert, AlertTitle } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  CustomH2,
  CustomTextField,
  WhiteFormLabel,
  CustomFormControlLabel,
  CustomCheckbox,
  CustomButton,
} from "./StyledComponents";

import { useAuth } from "./AuthProvider";

import { deletionState, reducer } from "./DeleteEverything";

const tweetAgeValues = [
  {
    value: "604800000",
    label: "Tweets older than one week",
  },
  {
    value: "1209600000",
    label: "Tweets older than two weeks",
  },
  {
    value: "2592000000",
    label: "Tweets older than one month",
  },
  {
    value: "5184000000",
    label: "Tweets older than two months",
  },
  {
    value: "7776000000",
    label: "Tweets older than three months",
  },
  {
    value: "15552000000",
    label: "Tweets older than six months",
  },
  {
    value: "31536000000",
    label: "Tweets older than one year",
  },
  {
    value: "",
    label: "All my tweets",
  },
];

export default function DeleteRecentTweets() {
  const [tweetAge, setTweetAge] = useState("Tweets older than one week");
  const [state, setState] = useReducer(reducer);
  const { socket, handleLogoutClick } = useAuth();
  let [searchParams] = useSearchParams();

  const isExpired = searchParams.get("session") === "expired";

  console.log("DeleteRecentTweets => state update");
  console.log("state right now => ", state);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const timeNow = new Date().getTime();
    const timeToSubstract = Number(event.target.elements.tweetAge.value);
    const pastTime = new Date(timeNow - timeToSubstract)
      .toISOString()
      .replace(/\.[0-9]{3}/, "");
    const keyword = event.target.elements.tweetKeyword.value;

    axios
      .delete("/tweets/delete-recent-tweets", {
        data: { time: pastTime, keyword },
        withCredentials: true,
      })
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          return handleLogoutClick(undefined, true);
        }
        setState({ type: deletionState.error, message: error.response.data.message });
      });
  };

  const handleChange = (event) => {
    setTweetAge(event.target.value);
  };

  useEffect(() => {
    if (!socket) return;
    socket.connect();

    socket.on("connect", () => {
      console.log("socket.io client connected! => ", socket.id);
    });

    // socket.on(deletionState.processing, (data) => {
    //   console.log("socket ID => ", socket.id);
    //   setState(data);
    // });

    socket.on(deletionState.deleting, (data) => {
      console.log("socket ID => ", socket.id);
      setState(data);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={1} xl={1}></Grid>
      <Grid item xs={12} md={10} xl={7}>
        <Container>
          <Stack spacing={5}>
            {isExpired ? (
              <Alert severity='error'>
                <AlertTitle>Session Expired</AlertTitle>
                Your tokens are no longer valid. Please <strong>login</strong> again!
              </Alert>
            ) : null}
            <CustomH2
              variant='h2'
              sx={{
                fontSize: {
                  xs: "2em",
                  md: "3.75em",
                },
                textAlign: {
                  xs: "center",
                  md: "initial",
                },
              }}>
              Delete recent tweets
            </CustomH2>
            <ul className='white li-spacing'>
              <li>Deletes up to 3,200 of your most recent tweets (limitations).</li>
              <li>
                Premium users can delete from their whole tweet history after uploading
                their Twitter data file.
              </li>
            </ul>
            <Alert severity='warning' variant='filled'>
              With Twitter API v2 now released, the new (and very low) rate limits will
              render the "delete" feature of this app almost useless. So use it while you
              can !
            </Alert>
            <form onSubmit={handleSubmit}>
              <Stack spacing={5}>
                <FormControl fullWidth>
                  <WhiteFormLabel sx={{ color: "white" }}>
                    Age of tweets to delete
                  </WhiteFormLabel>
                  <CustomTextField
                    id='tweetAge'
                    select
                    value={tweetAge}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}>
                    {tweetAgeValues.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </CustomTextField>
                </FormControl>

                <FormControl fullWidth>
                  <WhiteFormLabel>Only tweets containing this word/phrase</WhiteFormLabel>
                  <CustomTextField
                    helperText='Leave blank to delete all tweets matching the age above.'
                    id='tweetKeyword'
                  />
                </FormControl>

                <CustomFormControlLabel
                  control={<CustomCheckbox id='acceptTerms' required />}
                  label='I understand deleted tweets cannot be recovered.'
                />
                <CustomButton variant='contained' startIcon={<Delete />} type='submit'>
                  Delete
                </CustomButton>
              </Stack>
            </form>
          </Stack>
        </Container>
      </Grid>
      <Grid item xs={12} md={1} xl={4}></Grid>
    </Grid>
  );
}
