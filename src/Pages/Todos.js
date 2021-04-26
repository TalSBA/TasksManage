import React, { useEffect, useState } from "react";
import { Badge, Container, Nav, NavbarBrand } from "react-bootstrap";
import InputTask from "../Components/InputTask";
import TasksList from "../Components/TasksList";
import "../Styles/Todos.css";

function Todos(props) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [allVariant, setAllVariant] = useState("primary");
  const [activeVariant, setActiveVariant] = useState("");
  const [completedVariant, setCompletedVariant] = useState("");

  useEffect(() => {
    let count = 0;
    filteredTasks.forEach((task) => {
      if (task.status === "active") {
        count++;
      }
    });
    setActiveCount(count);
  }, [filteredTasks]);

  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  function addTask(task) {
    setTasks(tasks.concat({ id: ID(), value: task, status: "active" }));
    setFilteredTasks(filteredTasks.concat({ id: ID(), value: task, status: "active" }));
  }
  function updateTaskStatus(isChecked, id) {
    setTasks((prevState) => {
      let task = prevState.find((task) => id === task.id);
      if (task !== undefined) {
        if (isChecked) {
          task.status = "completed";
        } else {
          task.status = "active";
        }
      }
      return [...prevState];
    });

    setFilteredTasks((prevState) => {
      let task = prevState.find((task) => id === task.id);
      if (task !== undefined) {
        if (isChecked) {
          task.status = "completed";
        } else {
          task.status = "active";
        }
      }
      return [...prevState];
    });
  }

  function setVariant(value) {
    let filterTasks;
    if (value === "all") {
      setAllVariant("primary");
      setActiveVariant("");
      setCompletedVariant("");
      filterTasks = tasks;
    }
    if (value === "active") {
      setAllVariant("");
      setActiveVariant("primary");
      setCompletedVariant("");
      filterTasks = tasks.filter((task) => task.status === "active");
    }
    if (value === "completed") {
      setAllVariant("");
      setActiveVariant("");
      setCompletedVariant("primary");
      filterTasks = tasks.filter((task) => task.status === "completed");
    }
    setFilteredTasks(filterTasks);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);

    const newFilteredTasks = filteredTasks.filter((task) => task.id !== id);
    setFilteredTasks(newFilteredTasks);
  }
  return (
    <div className="p-todos">
      <div className="input-list">
        <h1>Todos</h1>
        <InputTask onAddTask={addTask} />
        <TasksList
          tasks={filteredTasks}
          checkedChange={updateTaskStatus}
          onDelete={deleteTask}
        />
      </div>
      <span className="bottom-lable">{activeCount} items left</span>
      <Badge pill variant={allVariant} onClick={() => setVariant("all")}>
        All
      </Badge>
      <Badge pill variant={activeVariant} onClick={() => setVariant("active")}>
        Active
      </Badge>
      <Badge
        pill
        variant={completedVariant}
        onClick={() => setVariant("completed")}
      >
        Completed
      </Badge>
    </div>
  );
}

export default Todos;
