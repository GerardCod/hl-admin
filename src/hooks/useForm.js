import { useState } from "react";

const useForm = (initialState, submitHandler) => {
  const [state, setState] = useState(initialState);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    submitHandler(data);
  }

  return [state, handleChange, handleSubmit];
}

export default useForm;