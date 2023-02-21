import React, { useEffect, useState } from "react";

const ToDoLists = ({ onSelect, id, text, update }) => {
  const [editable, setEditable] = useState(false);
  const [newInputItem, setNewInputItem] = useState(text.value);

  const updateValue = () => {
    setEditable(false);
    let newItems = JSON.parse(localStorage.getItem("list"));
    newItems[id] = { value: newInputItem, isChecked: false };
    update(newItems);
  };

  const onChecked = () => {
    let newItems = JSON.parse(localStorage.getItem("list"));
    newItems[id] = {
      value: newItems[id].value,
      isChecked: newItems[id].isChecked === true ? false : true,
    };
    update(newItems);
  };

  useEffect(() => {
    setNewInputItem(text.value);
  }, [text]);

  return (
    <>
      <div className="todo-style">
        <p className="btn" aria-hidden="true" onClick={() => onSelect(id)}>
          x
        </p>
        <p className="btn" aria-hidden="true" onClick={() => onChecked(id)}>
          {text.isChecked ? "⭕" : "✅"}
        </p>
        {editable ? (
          <>
            <input
              value={newInputItem}
              onChange={(e) => setNewInputItem(e.target.value)}
            />
            <button onClick={updateValue}>+</button>
          </>
        ) : (
          <li
            onClick={() => setEditable(true)}
            style={{
              textDecoration: text.isChecked === true ? "line-through" : "none",
            }}
          >
            {text.value}
          </li>
        )}
      </div>
    </>
  );
};

export default ToDoLists;
