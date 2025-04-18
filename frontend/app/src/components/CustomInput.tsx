import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const CustomInput: React.FC<TextFieldProps> = (props) => {
  return <TextField fullWidth variant="outlined" {...props} />;
};

export default CustomInput;
