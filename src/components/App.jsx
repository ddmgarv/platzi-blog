import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./menu";
import Users from "./users";
import Posts from "./posts";
import Tasks from "./tasks";
import AddTask from "./tasks/AddTask";

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margin">
      <Route exact path="/" component={Users} />
      <Route exact path="/tareas" component={Tasks} />
      <Route exact path="/tareas/añadir-tarea" component={AddTask} />
      <Route exact path="/publicaciones/:key" component={Posts} />
    </div>
  </BrowserRouter>
);

export default App;
