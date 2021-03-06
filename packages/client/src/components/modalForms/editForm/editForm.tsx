import React, { useState } from "react";

//Api
import client from "apis/todos";

//Props
import { editFormProps } from "componentProps/formProps/editForm.props";

//Styles
import "./editForm.css";

export const EditForm: React.FC<editFormProps> = ({
  onClick,
  editDisplay,
  setRender,
  todoId,
  todoStatus,
  existingDescription,
  existingTitle,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string[]>([
    "You must change at least one of either Title or Descript to edit this Todo",
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const populateErrorMessages = (error: string) => {
    if (errorMessages.includes(error)) {
      return;
    } else {
      setErrorMessages((state) => [...state, error]);
    }
  };

  const onSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();

    if (title || description) {
      try {
        const res = await client.put(`todo/${todoId}`, {
          title: title ? title : existingTitle,
          description: description ? description : existingDescription,
          completed: todoStatus,
        });
        setIsLoading(false);
        if (res.status === 200) {
          onClick();
          setRender();
          setDescription("");
          setTitle("");
        }
      } catch (error) {
        if (error.response.status === 409) {
          populateErrorMessages("Item Could not be updated");
        }
      }
    }
  };

  const handleTitle = (event: any) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleDescription = (event: any) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  const handleCancel = () => {
    onClick();
    setDescription("");
    setTitle("");
  };

  return (
    <div className={editDisplay ? "show" : "hidden"}>
      <div className="modal">
        <div className="editForm">
          <form className="formContainer" onSubmit={onSubmit}>
            <label className="label">
              Title
              <input
                autoComplete="off"
                type="text"
                name="Title"
                className="editInput"
                value={title ? title : ""}
                onChange={handleTitle}
              />
            </label>
            <label className="label">
              Description
              <input
                autoComplete="off"
                type="text"
                name="Description"
                className="editInput"
                value={description ? description : ""}
                onChange={handleDescription}
              />
            </label>
            <div className="editButtonGroup">
              <button
                className="editCancel"
                onClick={handleCancel}
                type="button"
              >
                CANCEL
              </button>
              <button
                className="editSubmit"
                type="submit"
                onClick={onSubmit}
                disabled={!(title || description)}
              >
                SUBMIT
              </button>
            </div>
            {isLoading ? <progress /> : null}
          </form>
          {!(title || description)
            ? errorMessages.map((error, key) => (
              <div
                className={errorMessages ? "editErrors" : "hidden"}
                key={key}
              >
                {error}
              </div>
            ))
            : null}
        </div>
      </div>
    </div>
  );
};


