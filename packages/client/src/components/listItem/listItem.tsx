import React from "react";
import CompleteTodo from "../completeTodo/completeTodo";
import DeleteTodo from "../deleteTodo/deleteTodo";
import EditTodo from "../editTodo/editTodo";
import "./listItem.css";

type ListItemProps = {
    title: string;
    description: string;
    completed: boolean;
    handleCompleted: (event: any) => void;
    onDeleteShow: () => void;
    onEditShow: () => void;
};

const ListItem: React.FC<ListItemProps> = ({
    title,
    description,
    completed,
    handleCompleted,
    onDeleteShow,
    onEditShow
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
                    <CompleteTodo statusChange="INCOMPLETE TASK" handleCompleted={handleCompleted} />
                ) : (
                    <CompleteTodo statusChange="COMPLETED TASK" handleCompleted={handleCompleted} />
                )}
                <DeleteTodo onDeleteShow={onDeleteShow} />
            </div>
            <hr />
        </div>
    );
};

export default ListItem;
