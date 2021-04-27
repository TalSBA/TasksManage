import React, { useEffect, useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import InputTask from "../Components/InputTask";
import ModalMessage from "../Components/ModalMessage";
import TasksList from "../Components/TasksList";
import "../Styles/Todos.css";

function Todos(props) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [allVariant, setAllVariant] = useState("primary");
  const [activeVariant, setActiveVariant] = useState("");
  const [completedVariant, setCompletedVariant] = useState("");
  const [showModal, setShowModal] = useState({ show: false, task: {} });

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
    setFilteredTasks(
      filteredTasks.concat({ id: ID(), value: task, status: "active" })
    );
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
  function handleDeleteClick(id) {
    filteredTasks.forEach((task) => {
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

    const newFilteredTasks = filteredTasks.filter((task) => task.id !== id);
    setFilteredTasks(newFilteredTasks);
  }
  return (
    <Row>
      <div className="background">
        <div className="p-todos">
          <div className="input-list">
            <h1>Todos</h1>
            <InputTask onAddTask={addTask} />
            <TasksList
              tasks={filteredTasks}
              checkedChange={updateTaskStatus}
              onDelete={handleDeleteClick}
            />
          </div>
          <span className="bottom-lable">{activeCount} items left</span>
          <Badge pill variant={allVariant} onClick={() => setVariant("all")}>
            All
          </Badge>
          <Badge
            pill
            variant={activeVariant}
            onClick={() => setVariant("active")}
          >
            Active
          </Badge>
          <Badge
            pill
            variant={completedVariant}
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