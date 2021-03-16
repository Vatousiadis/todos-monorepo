import React from 'react'
import "./editTodo.css"

type editTodoProps = {
    onEditShow: () => void;
};

const EditTodo: React.FC<editTodoProps> = ({ onEditShow }) => {

    return (
        <>
            <button className="editButton" onClick={onEditShow}>
                EDIT
        </button>
        </>
    )
}

export default EditTodo
