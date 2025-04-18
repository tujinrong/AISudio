import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
}

const CustomRadioGroup: React.FC<Props> = ({ label, value, onChange, options }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup value={value} onChange={onChange}>
        {options.map((opt) => (
          <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
