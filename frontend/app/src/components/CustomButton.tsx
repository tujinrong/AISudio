import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="contained" {...props} />;
};

export default CustomButton;
