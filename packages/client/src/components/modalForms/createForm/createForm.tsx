import React, { useState } from "react";

//Api
import client from "apis/todos";

//Props
import { createFormProps } from "componentProps/formProps/createFrom.props";

//Styles
import "./createForm.css";

export const CreateForm: React.FC<createFormProps> = ({
  onClick,
  display,
  setRender,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([
    "You must enter both a Title and a Description to create a new Todo",
  ]);

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

    if (title && description) {
      try {
        const res = await client.post(`todo/create`, {
          title: title,
          description: description,
          completed: false,
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
          populateErrorMessages(
            "A Todo with the same title already exists, please choose a different title"
          );
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
    <div className={display ? "show" : "hidden"}>
      <div className="modal">
        <div className="createForm">
          <form className="createFormContainer" onSubmit={onSubmit}>
            <label className="label">
              Title
              <input
                autoComplete="off"
                type="text"
                name="Title"
                className="input"
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
                className="input"
                value={description ? description : ""}
                onChange={handleDescription}
              />
            </label>
            <div className="createButtonGroup">
              <button
                className="createCancel"
                onClick={handleCancel}
                type="button"
              >
                CANCEL
              </button>
              <button
                className="createSubmit"
                type="submit"
                onClick={onSubmit}
                disabled={!(title && description)}
              >
                SUBMIT
              </button>
            </div>
            {isLoading ? <progress /> : null}
          </form>
          {!(title && description)
            ? errorMessages.map((error, key) => (
                <div
                  className={errorMessages ? "createErrors" : "hidden"}
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


