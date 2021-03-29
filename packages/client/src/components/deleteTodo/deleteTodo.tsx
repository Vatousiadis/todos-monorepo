import React from "react";

//Props
import { deleteTodoProps } from "componentProps/deleteTodo.props";

//Styles
import "./deleteTodo.css";

const DeleteTodo: React.FC<deleteTodoProps> = ({ onDeleteShow }) => {
  return (
    <>
      <button className="deleteButton" onClick={onDeleteShow}>
        DELETE TASK
      </button>
    </>
  );
};

export default DeleteTodo;
