import React, { useState } from "react";

const EditModal = ({ todo, onClose, onSave }) => {
  const [editedTodo, setEditedTodo] = useState(todo.todo);

  return (
    <div className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center">
      <div className="bg-white p-6 rounded-3xl w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>

        <input
          type="text"
          value={editedTodo}
          onChange={(e) => setEditedTodo(e.target.value)}
          className="w-full border p-2 rounded mb-4"
           onKeyDown={(e) => {
                if(e.key === "Enter"){
                  onSave({ ...todo, todo: editedTodo });
                }
            }} 
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-500 transition-all duration-300 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({ ...todo, todo: editedTodo })
            }
            
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-900 transition-all duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
