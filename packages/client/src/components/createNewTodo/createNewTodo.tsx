import React from "react";
import "./createNewTodo.css";

type createNewTodoProps = {
    onOpen: () => void;
};

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
