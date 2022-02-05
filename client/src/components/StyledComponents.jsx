import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { styled } from "@mui/system";

const WhiteFormLabel = styled(FormLabel)({
  color: "white",
});

const CustomH2 = styled(Typography)({
  color: "white",
});

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
});

const CustomCheckbox = styled(Checkbox)({
  color: "white",
  "&.Mui-checked": {
    color: red[100],
  },
});

const CustomFormControlLabel = styled(FormControlLabel)({
  color: "white",
});

const CustomButton = styled(Button)({
  backgroundColor: "#B23842",
  "&:hover": {
    backgroundColor: "#D6535D",
  },
  "&:active": {
    backgroundColor: "#FFF",
    color: "#202020",
  },
});

export {
  WhiteFormLabel,
  CustomH2,
  CustomTextField,
  CustomCheckbox,
  CustomFormControlLabel,
  CustomButton,
};
