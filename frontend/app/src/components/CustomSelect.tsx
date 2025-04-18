import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectProps } from '@mui/material';

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps extends SelectProps {
  label: string;
  options: Option[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, ...rest }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select label={label} {...rest}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
