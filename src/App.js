import './App.css';
import React, {useState} from 'react';
import ToDoList from './ToDoList';

function App(){

    const [inputItem, setInputItem] = useState();
    const [Items, setItems] = useState([]);
// 
    const itemChanger = (event)  => {
        console.log("put value in input!");
        setInputItem(event.target.value);
    };
// 
    const addItem = () => {
        console.log("Item added in spread array!");
        setItems((oldItems) => {
            return [...oldItems, inputItem];
        });
        setInputItem("");
    };
// 
    const deleteItems = (id) => {
        console.log("deleted!");
        setItems((oldItems)=> {
            return oldItems.filter((arrElem, index)=>{
                return index !== id;
            })
        })
    }   
    return(
       <>
       <div className="main-div">
       <div className="center-div">
           <br/>
        <h1>To-do List</h1>
           <br/>
        <input type="text" placeholder="Enter Your Todo 😀" value={inputItem} onChange={itemChanger} />
        <button onClick={addItem}> + </button>

        <ol>
           
           { Items.map( (itemval, index) => {
               return <ToDoList 
               key={index} 
               id={index} 
               text= {itemval}
               onSelect = {deleteItems} />
            } ) }
        </ol>
       </div>
       </div>
       
       </>
    )
}

export default App;