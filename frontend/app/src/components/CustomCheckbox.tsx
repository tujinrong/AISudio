import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface Props {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox: React.FC<Props> = ({ label, ...rest }) => {
  return <FormControlLabel control={<Checkbox {...rest} />} label={label} />;
};

export default CustomCheckbox;
