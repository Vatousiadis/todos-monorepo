import React from "react";

//Props
import { completeTodoProps } from "componentProps/completeTodo.props";

//Styles
import "./completeTodo.css";

export const CompleteTodo: React.FC<completeTodoProps> = ({
  statusChange,
  handleCompleted,
}) => {
  return (
    <button className="statusButton" onClick={handleCompleted}>
      {statusChange}
    </button>
  );
};

