import { useState } from "react";

export const useForm = (quantityInputs = {}) => {
  const [inputs, setInputs] = useState(quantityInputs);

  const reset = () => {
    setInputs(quantityInputs);
  };

  const handleInputChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  return [inputs, handleInputChange, reset];
};
