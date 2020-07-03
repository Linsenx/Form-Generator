import React from "react";
import { Input } from "antd";
import { GElementprops } from "../type";

interface GInputProps extends GElementprops {}
const GInput: React.FC<GInputProps> = props => {
  const { value, onChange, label } = props;
  return (
    <Input
      value={value}
      onChange={e => {
        onChange(label, e.target.value);
      }}
    />
  );
};

export { GInput };
