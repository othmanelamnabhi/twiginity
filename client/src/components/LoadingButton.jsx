import { CustomButton } from "./StyledComponents";
import { Delete } from "@mui/icons-material";

export default function LoadingButton({ loadingState }) {
  return (
    <CustomButton
      variant='contained'
      startIcon={<Delete />}
      type='submit'
      loading={loadingState}
      loadingPosition='start'
      fullWidth>
      Delete
    </CustomButton>
  );
}
