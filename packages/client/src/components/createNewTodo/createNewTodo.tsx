import React from "react";

//Props
import { createNewTodoProps } from "componentProps/createNewTodo.props";

//Styles
import "./createNewTodo.css";

const CreateNewTodo: React.FC<createNewTodoProps> = ({ onOpen }) => {
  return (
    <>
      <button className="button" onClick={onOpen}>
        Create New Todo
      </button>
    </>
  );
};

export default CreateNewTodo;
