import React from "react";

//Components
import CompleteTodo from "components/completeTodo/completeTodo";
import DeleteTodo from "components/deleteTodo/deleteTodo";
import EditTodo from "components/editTodo/editTodo";

//Props
import { listItemProps } from "componentProps/listItem.props";

//Styles
import "./listItem.css";

const ListItem: React.FC<listItemProps> = ({
  title,
  description,
  completed,
  handleCompleted,
  onDeleteShow,
  onEditShow,
}) => {
  return (
    <div className="listItem-container">
      <div className="header">
        {title}
        {completed ? (
          <div className="completed">Task Completed!</div>
        ) : (
          <div className="not-completed">Task Not Completed Yet!</div>
        )}
      </div>
      <div className="content">{description}</div>
      <div className="itemButtonGroup">
        <EditTodo onEditShow={onEditShow} />
        {completed ? (
          <CompleteTodo
            statusChange="INCOMPLETE TASK"
            handleCompleted={handleCompleted}
          />
        ) : (
          <CompleteTodo
            statusChange="COMPLETED TASK"
            handleCompleted={handleCompleted}
          />
        )}
        <DeleteTodo onDeleteShow={onDeleteShow} />
      </div>
      <hr />
    </div>
  );
};

export default ListItem;
