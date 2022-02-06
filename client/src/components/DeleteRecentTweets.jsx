import { useState } from "react";

import { Container, FormControl, Grid, Stack, Alert } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  CustomH2,
  CustomTextField,
  WhiteFormLabel,
  CustomFormControlLabel,
  CustomCheckbox,
  CustomButton,
} from "./StyledComponents";

// grab timezone
// transform time into right format

const tweetAgeValues = [
  {
    value: "1",
    label: "Tweets older than one week",
  },
  {
    value: "2",
    label: "Tweets older than two weeks",
  },
  {
    value: "3",
    label: "Tweets older than one month",
  },
  {
    value: "4",
    label: "Tweets older than two months",
  },
  {
    value: "5",
    label: "Tweets older than three months",
  },
  {
    value: "6",
    label: "Tweets older than six months",
  },
  {
    value: "7",
    label: "Tweets older than one year",
  },
  {
    value: "8",
    label: "All my tweets",
  },
];

export default function DeleteRecentTweets() {
  const [tweetAge, setTweetAge] = useState("Tweets older than one week");

  const handleChange = (event) => {
    setTweetAge(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={1} xl={1}></Grid>
      <Grid item xs={12} md={10} xl={7}>
        <Container>
          <Stack spacing={5}>
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
              With Twitter API v2 now released, the new rate limits will render the
              "delete" feature of this app almost useless. So use it while you can !
            </Alert>
            <form>
              <Stack spacing={5}>
                <FormControl fullWidth>
                  <WhiteFormLabel sx={{ color: "white" }}>
                    Age of tweets to delete
                  </WhiteFormLabel>
                  <CustomTextField
                    id='outlined-select-currency-native'
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
                  <CustomTextField helperText='Leave blank to delete all tweets matching the age above.' />
                </FormControl>

                <CustomFormControlLabel
                  control={<CustomCheckbox />}
                  label='I understand deleted tweets cannot be recovered.'
                />
                <CustomButton variant='contained' startIcon={<Delete />}>
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
