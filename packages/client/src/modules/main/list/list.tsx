import React, { useState, useEffect } from "react";

//Api
import client from "apis/todos";

//Components
import ListItem from "components/listItem/listItem";
import CreateNewTodo from "components/createNewTodo/createNewTodo";
import EditForm from "modules/modalForms/editForm/editForm";
import DeleteForm from "modules/modalForms/deleteForm/deleteForm";
import CreateForm from "modules/modalForms/createForm/createForm";

//Props
import { todoData } from "modulesProps/list.props";

//Styles
import "./list.css";

const defaultTodo: todoData[] = [];

const List: React.FC = () => {
  const [editDisplay, setEditDisplay] = useState(false);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const [render, setRender] = useState(false);
  const [todosId, setTodosId] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [existingDescription, setExistingDescription] = useState("");
  const [existingtitle, setExistingtitle] = useState("");
  const [todos, setTodos]: [todoData[], (todos: todoData[]) => void] = useState(
    defaultTodo
  );
  const [error, setError]: [string, (error: string) => void] = useState("");

  const getData = () => {
    client
      .get<todoData[]>("todos")
      .then((response) => {
        setTodos(response.data);
        setRender(true);
        setIsLoading(false);
      })
      .catch((er) => {
        const err = (er.response.status = 404
          ? "Data not found"
          : "Unexpected error");
        setError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [render]);

  const handleCompleted = async (todo: todoData) => {
    if (todos) {
      const response = await client
        .put(`todo/${todo._id}`, {
          ...todo,
          completed: !todo.completed,
        })
        .then((res) => {
          const updated = todos.map((el) => {
            if (res.data._id === el._id) {
              return res.data;
            }
            return el;
          });
          setTodos(updated);
          setRender(!render);
        });
    }
  };

  const handleDelete = (todosId: string) => {
    setDeleteLoading(true);
    if (todos) {
      const response = client.delete(`todo/${todosId}`, {}).then((res) => {
        setDeleteLoading(false);
        const updated = todos.map((el) => {
          if (res.data._id === el._id) {
            return res.data;
          }
          return el;
        });
        setTodos(updated);
        setDeleteDisplay(false);
        setRender(!render);
      });
    }
  };

  const openDelete = (todos: todoData) => {
    setDeleteDisplay(true);
    setTodosId(`${todos._id}`);
  };

  const openEdit = (todos: todoData) => {
    setEditDisplay(true);
    setTodosId(`${todos._id}`);
    setExistingtitle(`${todos.title}`);
    setExistingDescription(`${todos.description}`);
    setCompleted(todos.completed);
  };

  return (
    <div className="listContainer">
      <CreateNewTodo onOpen={() => setCreateDisplay(true)} />
      <ul className="list">
        <div className="item-container">
          {todos.length > 0 ? ( //check if the any items exist in database
            todos.map((todo, key) => (
              <li>
                <ListItem
                  key={key}
                  title={todo.title}
                  description={todo.description}
                  completed={todo.completed}
                  handleCompleted={() => handleCompleted(todo)}
                  onDeleteShow={() => openDelete(todo)}
                  onEditShow={() => openEdit(todo)}
                />
              </li>
            ))
          ) : !isLoading ? ( //if not display message
            <div className="entryText">Create a new Todo to start with!</div>
          ) : null}
          {isLoading ? ( //if items exist show loader until items load into DOM
            <div className="progress">
              <progress />
            </div>
          ) : null}
          <EditForm
            existingDescription={existingDescription}
            existingTitle={existingtitle}
            editDisplay={editDisplay}
            onClick={() => setEditDisplay(false)}
            setRender={() => setRender(!render)}
            todoId={todosId}
            todoStatus={completed}
          />
          <DeleteForm
            isLoading={deleteLoading}
            display={deleteDisplay}
            onCancel={() => setDeleteDisplay(false)}
            onDelete={() => handleDelete(todosId)}
          />
          <CreateForm
            setRender={() => setRender(!render)}
            onClick={() => setCreateDisplay(false)}
            display={createDisplay}
          />
        </div>
      </ul>
    </div>
  );
};

export default List;
