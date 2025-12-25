import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }]);
    setTodo("");
  };
  const handleEdit = () => {
    alert("Edit button clicked");
  };

  const handleDelete = () => {
    alert("Delete button clicked");
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    const id = e.target.name;
    console.log("Checkbox changed for todo with id:", id);
    const index = todos.findIndex((item) => {
      return item.id === id;
    })
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto  my-5 rounded-xl p-5 bg-emerald-200 min-h-[70vh]">
        <div className="addTodo">
          <h2 className="text-2xl font-bold my-2">Add Todo</h2>
          <div className=" inputTodo border-2 border-emerald-900 rounded-md p-3 bg-white flex justify-between items-center w-full">
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            placeholder="Enter your todo"
            className=" w-full border-emerald-900 rounded-md p-1 mx-2 focus:outline-none focus:ring-0 focus:border-transparent"
          />
          <button
            onClick={handleAdd}
            className="bg-emerald-900 text-white rounded-md px-6 py-1 hover:bg-emerald-700 transition-all duration-500"
          >
            Add
          </button>
        </div>
        </div>

        <h1 className="text-2xl font-bold my-2">Your Todos</h1>
        <div className="todos">
          {todos.map((item) => {
            return (
              <div key={item.id} className="todo flex my-4 justify-between items-center bg-green-50 p-3 rounded-md ">
                <input type="checkbox" value={item.isCompleted} onChange={handleCheckBox} name={item.id}/>
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                <div className="buttons">
                  <button
                    onClick={handleEdit}
                    className="bg-emerald-900 text-white rounded-md px-3 py-1 hover:bg-emerald-700 transition-all duration-500 mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-emerald-900 text-white rounded-md px-3 py-1 hover:bg-emerald-700 transition-all duration-500 mx-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
