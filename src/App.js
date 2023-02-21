import "./App.css";
import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList";

const getLocalItems = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [inputItem, setInputItem] = useState("");
  const [Items, setItems] = useState(getLocalItems());

  const itemChanger = (event) => {
    setInputItem(event.target.value);
  };

  const addItem = () => {
    if (inputItem.trim() !== "") {
      setItems((oldItems) => {
        return [...oldItems, { value: inputItem, isChecked: false }];
      });
      setInputItem("");
    }
  };

  const onEnterClick = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      addItem();
    }
  };

  const deleteItems = (id) => {
    setItems((oldItems) => {
      return oldItems.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };

  const deleteChecked = () => {
    setItems((oldItems) => {
      return oldItems.filter((item, index) => {
        return item.isChecked === false;
      });
    });
  };

  const update = (newItems) => {
    setItems(newItems);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(Items));
  }, [Items]);

  return (
    <>
      <div className="main-div">
        <div className="center-div">
          <br />
          <h1>To-do List</h1>
          <br />
          <input
            type="text"
            placeholder="Enter Your Todo 📑"
            value={inputItem}
            onChange={itemChanger}
            onKeyPress={onEnterClick}
          />
          <button onClick={addItem}> + </button>

          <ol>
            {Items.map((itemval, index) => {
              return (
                <ToDoList
                  key={index}
                  id={index}
                  text={itemval}
                  onSelect={deleteItems}
                  update={update}
                />
              );
            })}
          </ol>
          <p className="clearAll" onClick={deleteChecked}>
            Clear Completed
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
