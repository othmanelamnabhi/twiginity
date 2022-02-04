import {
  Container,
  Typography,
  Alert,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function DeleteEverything() {
  return (
    <Container>
      <Typography variant='h1'>Delete everything</Typography>
      <ul>
        <li>Submit your Twitter data file for processing to delete more tweets</li>
        <li>
          Please read the upload instructions for details on where to get this file from.
        </li>
      </ul>
      <Alert severity='warning' variant='filled'>
        With Twitter API v2 now released, the rate limits have been drastically reduced.
        on v1.1 you could delete thousands of tweets whereas now, you’re limited to 50
        tweets every 15 minutes.
      </Alert>
      <form>
        <FormControl fullWidth>
          <FormLabel>Upload your “tweet.js” here.</FormLabel>
          <TextField type='file' />
        </FormControl>

        <FormControlLabel
          control={<Checkbox />}
          label='I understand deleted tweets cannot be recovered.'
        />
        <Button variant='contained' startIcon={<Delete />}>
          Delete
        </Button>
      </form>
    </Container>
  );
}
