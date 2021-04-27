import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import "../Styles/Tasks.css";
import { BsX } from "react-icons/bs";

function TasksList({ tasks, checkedChange, onDelete }) {
  return (
    <div className="c-tasks">
      {tasks &&
        tasks.map((task, index) => {
          return (
            <div key={index}>
              <FormControlLabel
                key={task.id}
                className={`tasks ${
                  task.status === "completed" ? "completed" : ""
                }`}
                checked={task.status === "completed" ? true : false}
                control={
                  <Checkbox
                    color="primary"
                    onChange={(e) => checkedChange(e.target.checked, task.id)}
                  />
                }
                label={task.value}
              />
              <span
                className="delete"
                id={task.id}
                onClick={(e) => onDelete(e.target.id)}
              >
                x
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default TasksList;
