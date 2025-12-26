import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import EditModal from "./components/EditModal";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [todo, setTodo] = useState("");
  const [showFinished,setShowFinished] = useState(false);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos): [];
  });

  useEffect(() => {
   localStorage.setItem("todos",JSON.stringify(todos));

  }, [todos]);


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }]);
    setTodo("");
  };
  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setIsEditing(true);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => {
      return item.id === id;
    });
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleUpdateTodo = (updatedTodo) => {
  setTodos(
    todos.map((t) =>
      t.id === updatedTodo.id ? updatedTodo : t
    )
  );
  setIsEditing(false);
};


  return (
    <>
      <Navbar />

      {isEditing && (
        <EditModal
          todo={currentTodo}
          onClose={() => setIsEditing(false)}
          onSave={handleUpdateTodo}
        />
      )}
      <div className="container mx-auto my-5 rounded-xl p-5 bg-emerald-200 min-h-[70vh]">
        <div className="addTodo">
          <h2 className="text-2xl font-bold my-2">Add Todo</h2>
          <div className=" inputTodo border-2 border-emerald-900 rounded-md p-3 bg-white flex justify-between items-center w-full">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              placeholder="Enter your todo"
              className=" w-full border-emerald-900 rounded-md p-1 mx-2 focus:outline-none focus:ring-0 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdd();
                }
              }}
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
          {todos.length === 0 && (
            <div className="text-center my-5 p-3 bg-white rounded-md text-2xl font-bold">
              No todos available. Please add some todos.
            </div>
          )}
          <input type="checkbox" onChange={(e)=>setShowFinished(!showFinished)} checked={showFinished} /> Show Finished Todos
          {todos.map((item) => {
            if(showFinished && !item.isCompleted){
              return null;
            }
            return (
              <div
                key={item.id}
                className="todo flex my-4 justify-between items-center bg-green-50 p-3 rounded-md "
              >
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={handleCheckBox}
                  name={item.id}
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons">
                  <button
                     onClick={() => handleEdit(item)}
                    className="bg-emerald-900 text-white rounded-md px-3 py-1 hover:bg-emerald-700 transition-all duration-500 mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
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



