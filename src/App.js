import './App.css';
import React, {useEffect, useState} from 'react';
import ToDoList from './ToDoList';

const getLocalItems = () =>{
let list = localStorage.getItem('list');
if(list){
    return JSON.parse(localStorage.getItem('list'))
} else {
    return [] ;
}
}


function App(){

    const [inputItem, setInputItem] = useState('');
    const [Items, setItems] = useState(getLocalItems());
// 
    const itemChanger = (event)  => {
        // console.log("put value in input!");
        setInputItem(event.target.value);
    };
// 
    const addItem = () => {
        // console.log("Item added in spread array!");
        setItems((oldItems) => {
            return [...oldItems, inputItem];
        });
        setInputItem("");
    };
// 
const onEnterClick = e => {
    if(e.code === "Enter" || e.code === "NumpadEnter"){
        addItem();
    }
}   
// 
    const deleteItems = (id) => {
        // console.log("deleted!");
        setItems((oldItems)=> {
            return oldItems.filter((arrElem, index)=>{
                return index !== id;
            })
        })
    }   
// 
    useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(Items));
    },[Items]);

    return(
       <>
       <div className="main-div">
       <div className="center-div">
           <br/>
        <h1>To-do List</h1>
           <br/>
        <input type="text" placeholder="Enter Your Todo 😀" value={inputItem} onChange={itemChanger} onKeyPress={onEnterClick}/>
        <button onClick={addItem} > + </button>

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