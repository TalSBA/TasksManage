import React, { useEffect, useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import InputTask from "../Components/InputTask";
import ModalMessage from "../Components/ModalMessage";
import TasksList from "../Components/TasksList";
import "../Styles/Todos.css";

function Todos(props) {
  const [tasks, setTasks] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [variant, setVariant] = useState("all");
  const [showModal, setShowModal] = useState({ show: false, task: {} });

  useEffect(() => {
    let count = 0;
    tasks.forEach((task) => {
      if (task.status === "active") {
        count++;
      }
    });
    setActiveCount(count);
  }, [tasks]);

  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  function addTask(task) {
    setTasks(tasks.concat({ id: ID(), value: task, status: "active" }));
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
  }

  function handleDeleteClick(id) {
    tasks.forEach((task) => {
      if (task.id === id) {
        if (task.status === "active") {
          setShowModal({ show: true, task: task });
        } else {
          deleteTask(id);
        }
      }
    });
  }

  function handleCloseModal(res, task) {
    setShowModal({ show: false, task: {} });
    if (res.target.id === "ok") {
      deleteTask(task.id);
    }
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  let todosList;
  if (tasks) {
    todosList = tasks.filter((task) => {
      return variant === "all" ? task : task.status === variant;
    });
  }
  return (
    <Row>
      <div className="background">
        <div className="p-todos">
          <div className="input-list">
            <h1>Todos</h1>
            <InputTask onAddTask={addTask} />
            <TasksList
              tasks={todosList}
              checkedChange={updateTaskStatus}
              onDelete={handleDeleteClick}
            />
          </div>
          <span className="bottom-lable">{activeCount} items left</span>
          <Badge
            pill
            variant={variant === "all" ? "primary" : ""}
            onClick={() => setVariant("all")}
          >
            All
          </Badge>
          <Badge
            pill
            variant={variant === "active" ? "primary" : ""}
            onClick={() => setVariant("active")}
          >
            Active
          </Badge>
          <Badge
            pill
            variant={variant === "completed" ? "primary" : ""}
            onClick={() => setVariant("completed")}
          >
            Completed
          </Badge>
          <ModalMessage
            show={showModal.show}
            onCloseModal={handleCloseModal}
            message="Are you sure you want to delete an active item :"
            title="Confirm Deletion"
            task={showModal.task}
          />
        </div>
      </div>
    </Row>
  );
}

export default Todos;
