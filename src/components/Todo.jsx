import React, { useState } from "react";

function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [editid, setEditId] = useState("");

  const handleAddTodo = () => {
    if (inputValue?.trim() === "") return;
    if (editid) {
      const updatedTodo = list.map((l) =>
        l.id === editid ? { id: l.id, value: inputValue, checked: l.check } : l,
      );
      setList(updatedTodo);
    } else {
      setList([
        ...list,
        { id: crypto.randomUUID(), value: inputValue, checked: false },
      ]);
    }
    setInputValue("");
  };

  const handleDelete = (id) => {
    const updatedTodo = list.filter((l) => l.id !== id);
    setList(updatedTodo);
  };

  const handleCheck = (id) => {
    const updatedData = list.map((l) => {
      if (l.id === id) {
        l.checked = true;
      }
      return l;
    });
    setList(updatedData);
  };

  const handleEdit = (id) => {
    const selectedTodo = list.find((l) => l.id === id);
    setEditId(id);
    setInputValue(selectedTodo.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={handleAddTodo}>{editid ? "Save" : "Add"}</button>
      {list?.map((l) => (
        <div key={l.id}>
          <input type="checkbox" onChange={() => handleCheck(l.id)} />
          <span style={{ textDecoration: l.checked ? "line-through" : "none" }}>
            {l.value}
          </span>
          <button onClick={() => handleEdit(l.id)}>Edit</button>
          <button onClick={() => handleDelete(l.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
