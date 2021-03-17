import React from "react";
import "./deleteTodo.css";

type deleteToDoProps = {
  onDeleteShow: () => void;
};

const DeleteTodo: React.FC<deleteToDoProps> = ({ onDeleteShow }) => {
  return (
    <>
      <button className="deleteButton" onClick={onDeleteShow}>
        DELETE TASK
      </button>
    </>
  );
};

export default DeleteTodo;
