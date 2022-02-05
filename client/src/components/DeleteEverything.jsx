import { Container, Alert, FormControl, Grid, Stack } from "@mui/material";
import {
  WhiteFormLabel,
  CustomH2,
  CustomTextField,
  CustomCheckbox,
  CustomFormControlLabel,
  CustomButton,
} from "./StyledComponents";
import { Delete } from "@mui/icons-material";

export default function DeleteEverything() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={1}></Grid>
      <Grid item xs={12} md={6}>
        <Container>
          <Stack spacing={5}>
            <CustomH2 variant='h2'>Delete everything</CustomH2>
            <ul className='li-spacing white'>
              <li>Submit your Twitter data file for processing to delete more tweets.</li>
              <li>
                Please read the upload instructions for details on where to get this file
                from.
              </li>
            </ul>
            <Alert severity='warning' variant='filled'>
              With Twitter API v2 now released, the new rate limits will render the
              "delete" feature of this app almost useless. So use it while you can !
            </Alert>
            <form>
              <Stack spacing={5}>
                <FormControl fullWidth>
                  <WhiteFormLabel>Upload your “tweet.js” here.</WhiteFormLabel>
                  <CustomTextField type='file' />
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
      <Grid item xs={12} md={5}></Grid>
    </Grid>
  );
}
