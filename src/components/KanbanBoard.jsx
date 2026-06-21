import React, { useState } from "react";
import "./styles.css";
const columns = ["todo", "in-progress", "completed"];

export default function KanbanBoard() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    const newObject = {
      id: new Date().toISOString(),
      title: input,
      status: columns[0],
    };
    setTasks([...tasks, newObject]);
    setInput("");
  };

  const moveTask = (id, direction) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== id) return task;

        if (direction === "forward") {
          if (task.status === "todo") return { ...task, status: "in-progress" };
          if (task.status === "in-progress")
            return { ...task, status: "completed" };
        }

        if (direction === "backward") {
          if (task.status === "in-progress") return { ...task, status: "todo" };
          if (task.status === "completed")
            return { ...task, status: "in-progress" };
        }

        return task;
      }),
    );
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const saveTitle = (id) => {
    //const selectedObject = tasks.find((task) => task.id === id);
    const updatedData = tasks.map((task) =>
      task.id === id ? { ...task, title: editTitle } : task,
    );
    setTasks(updatedData);
    setEditId(null);
  };

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleEdit(task) {
    setEditId(task.id);
    setEditTitle(task.title);
  }

  return (
    <div>
      <h2>Kanban Board</h2>
      <input
        data-testid="task-input"
        placeholder="Enter task"
        className="inputBox"
        value={input}
        onChange={(e) => handleInputChange(e)}
      />
      <button
        data-testid="add-task-button"
        className="addTaskBtn"
        onClick={addTask}
      >
        Add Task
      </button>
      <div className="kanban-board">
        {columns.map((col) => (
          <div key={col} className="column" data-testid={`column-${col}`}>
            <h4>{col.replace("-", " ").toUpperCase()}</h4>
            {tasks.map((task) => {
              if (task.status === col)
                return (
                  <div className="task-card" key={task.id}>
                    {editId === task.id ? (
                      <input
                        type="text"
                        data-testid={`task-title-edit-${task.id}`}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() => saveTitle(task.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveTitle(task.id);
                          }
                        }}
                      />
                    ) : (
                      <h4 data-testid={`task-title-${task.id}`}>
                        {task.title}
                      </h4>
                    )}
                    <div className="task-buttons">
                      {task.status === "in-progress" ||
                      task.status === "completed" ? (
                        <button
                          className="shiftBtn"
                          data-testid="move-left-button"
                          onClick={() => moveTask(task.id, "backward")}
                        >
                          ⬅️
                        </button>
                      ) : null}
                      {task.status === "in-progress" ||
                      task.status === "todo" ? (
                        <button
                          className="shiftBtn"
                          data-testid="move-right-button"
                          onClick={() => moveTask(task.id, "forward")}
                        >
                          ➡️
                        </button>
                      ) : null}
                      <button
                        className="editBtn"
                        data-testid={`edit-button-${task.id}`}
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="deleteBtn"
                        data-testid={`delete-button-${task.id}`}
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
