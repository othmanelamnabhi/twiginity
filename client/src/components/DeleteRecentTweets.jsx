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

export default function DeleteRecentTweets() {
  return (
    <Container>
      <Typography variant='h1'>Delete recent tweets</Typography>
      <ul>
        <li>Deletes up to 3,200 of your most recent tweets (limitations).</li>
        <li>
          Premium users can delete from their whole tweet history after uploading their
          Twitter data file.
        </li>
      </ul>
      <Alert severity='warning' variant='filled'>
        With Twitter API v2 now released, the rate limits have been drastically reduced.
        on v1.1 you could delete thousands of tweets whereas now, you’re limited to 50
        tweets every 15 minutes.
      </Alert>
      <form>
        <FormControl fullWidth>
          <FormLabel>Age of tweets to delete</FormLabel>
          <TextField select></TextField>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Only tweets containing this word/phrase</FormLabel>
          <TextField helperText='Leave blank to delete all tweets matching the age above.' />
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
