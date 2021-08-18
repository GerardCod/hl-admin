import { useState } from "react";

const useForm = (initialState) => {
  const [data, setData] = useState(initialState);

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trimLeft(),
    });
  }

  const reset = () => {
   setData({...initialState});
  }

  return [data, handleChange, reset];
}

export default useForm;