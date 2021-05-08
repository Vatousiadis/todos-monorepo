import React from "react";

//Props
import { editTodoProps } from "componentProps/editTodo.props";

//Styles
import "./editTodo.css";

export const EditTodo: React.FC<editTodoProps> = ({ onEditShow }) => {
  return (
      <button className="editButton" onClick={onEditShow}>
        EDIT
      </button>
  );
};

