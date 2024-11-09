import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

const ChipSelect: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected);
  };

  const options: Option[] = [
    { value: "example1@mail.com", label: "example1@mail.com" },
    { value: "example2@mail.com", label: "example2@mail.com" },
  ];

  return (
    <Select
      isMulti
      value={selectedOptions}
      onChange={handleChange}
      options={options}
      placeholder="Add emails"
    />
  );
};

export default ChipSelect;
