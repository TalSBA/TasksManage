import React from "react";
import { Container } from "react-bootstrap";
import Todos from "./Pages/Todos";
import "./Styles/App.css";


function App(props) {
  return (
    <Container className="container">
      <Todos />
    </Container>
  );
}

export default App;
