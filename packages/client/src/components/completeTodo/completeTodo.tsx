import React from 'react'
import "./completeTodo.css"


type completeTodoProps = {
    statusChange: string;
    handleCompleted: (event: any) => void;
}

const CompleteTodo: React.FC<completeTodoProps> = ({ statusChange, handleCompleted }) => {

    return (
        <button className="statusButton" onClick={handleCompleted}>
            {statusChange}
        </button>
    )
}

export default CompleteTodo
