import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomSelect from '../components/CustomSelect';
import CustomCheckbox from '../components/CustomCheckbox';
import CustomRadioGroup from '../components/CustomRadioGroup';

const FormPage = () => {
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('');
  const [checked, setChecked] = useState(false);
  const [radioVal, setRadioVal] = useState('a');

  return (
    <MainLayout>
      <h2>表单页面</h2>
      <CustomInput label="输入内容" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      <br /><br />
      <CustomSelect
        label="下拉选项"
        value={selectVal}
        onChange={(e) => setSelectVal(e.target.value)}
        options={[
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ]}
      />
      <br /><br />
      <CustomCheckbox label="是否勾选" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <br /><br />
      <CustomRadioGroup
        label="选择一个"
        value={radioVal}
        onChange={(e) => setRadioVal(e.target.value)}
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
      <br /><br />
      <CustomButton onClick={() => alert('提交成功！')}>提交</CustomButton>
    </MainLayout>
  );
};

export default FormPage;
