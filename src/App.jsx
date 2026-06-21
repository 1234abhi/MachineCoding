import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BillingCounter from "./components/BillingCounter";
import GridLights from "./components/GridLights";
import KanbanBoard from "./components/KanbanBoard";
import TodoList from "./components/Todo";
import ExpenseTracker from "./components/ExpenseTracker";
import ListSorter from "./components/ListSorter";
import Modal from "./components/Modal";
import TicTacToe from "./components/TicTacToe";
import MCQApp from "./components/Mcq";
import TableRender from "./components/TableRender";
import NestedCheckbox from "./components/NestedCheckbox";

// Default list passed as prop
const defaultFruits = [
  "Banana",
  "Apple",
  "Cherry",
  "Mango",
  "Blueberry",
  "Kiwi",
  "Pineapple",
  "Fig",
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <BillingCounter /> */}
      {/* <GridLights /> */}
      {/* <KanbanBoard /> */}
      {/* <TodoList /> */}
      {/* <ExpenseTracker /> */}
      {/* <ListSorter initialList={defaultFruits} /> */}
      {/* <Modal /> */}
      {/* <TicTacToe /> */}
      {/* <MCQApp /> */}
      {/* <TableRender /> */}
      <NestedCheckbox />
    </>
  );
}

export default App;
