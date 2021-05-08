import React, { useState, useEffect } from "react";

//Api
import client from "apis/todos";

//Components
import { ListItem } from "components/listItem";
import { CreateNewTodo } from "components/createNewTodo";
import { EditForm } from "components/modalForms/editForm";
import { DeleteForm } from "components/modalForms/deleteForm";
import { CreateForm } from "components/modalForms/createForm";

//Props
import { todoData } from "modulesProps/list.props";

//Styles
import "./list.css";

const defaultTodo: todoData[] = [];

export const List: React.FC = () => {
  const [editDisplay, setEditDisplay] = useState<boolean>(false);
  const [createDisplay, setCreateDisplay] = useState<boolean>(false);
  const [deleteDisplay, setDeleteDisplay] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const [todosId, setTodosId] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [existingDescription, setExistingDescription] = useState<string>("");
  const [existingtitle, setExistingtitle] = useState<string>("");
  const [error, setError]: [string, (error: string) => void] = useState<string>(
    ""
  );
  const [todos, setTodos]: [todoData[], (todos: todoData[]) => void] = useState(
    defaultTodo
  );

  const getData = () => {
    client
      .get<todoData[]>("todos")
      .then((response: any) => {
        setTodos(response.data);
        setRender(true);
        setIsLoading(false);
      })
      .catch((er: any) => {
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
        .then((res: any) => {
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
      const response = client.delete(`todo/${todosId}`, {}).then((res: any) => {
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

