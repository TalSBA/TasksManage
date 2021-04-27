import React, { useState } from "react";
import { Form } from "react-bootstrap";


function InputTask({onAddTask}) {
  const [inputValue, setValue] = useState("");

  function onEnterPress(e){
    if (e.charCode === 13 && e.target.value.trim()) {
      onAddTask(e.target.value);
      setValue("");
    }
  }
  return (
    <div className="c-input">
      <Form.Control
        type="text"
        placeholder="Add new task..."
        value={inputValue}
        onChange={(e)=> setValue(e.target.value)}
        onKeyPress={onEnterPress}
      />
    </div>
  );
}

export default InputTask;
