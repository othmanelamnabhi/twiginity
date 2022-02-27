import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Toolbar,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
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

const CustomButton = styled(LoadingButton)({
  backgroundColor: "#B23842",
  "&:hover": {
    backgroundColor: "#D6535D",
  },
  "&:active": {
    backgroundColor: "#FFF",
    color: "#202020",
  },
  "&.Mui-disabled": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    color: "rgba(255, 255, 255, 0.3)",
  },
});

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  "@media all": {
    minHeight: 90,
  },
}));

export {
  WhiteFormLabel,
  CustomH2,
  CustomTextField,
  CustomCheckbox,
  CustomFormControlLabel,
  CustomButton,
  CustomToolbar,
};
