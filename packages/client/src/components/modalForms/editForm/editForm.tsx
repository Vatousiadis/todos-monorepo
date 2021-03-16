import React, { useState } from "react";
import client from "../../../apis/todos";
import "./editForm.css";

type createFormProps = {
    editDisplay: boolean;
    onClick: () => void;
    setRender: () => void;
    todoId: string;
    todoStatus: boolean;
};

const EditForm: React.FC<createFormProps> = ({ onClick, editDisplay, setRender, todoId, todoStatus }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessages, setErrorMessages] = useState<string[]>(["You must change at least one of either Title or Descript to edit this Todo"]);
    const [isLoading, setIsLoading] = useState(false);

    const populateErrorMessages = (error: string) => {
        if (errorMessages.includes(error)) {
            return;
        } else {
            setErrorMessages((state) => [...state, error]);
        }
    };

    const deleteErrorMessage = (error: string) => {
        if (errorMessages.includes(error)) {
            setErrorMessages(errorMessages.filter((e) => e !== error))
        } else {
            return;
        }
    };

    const onSubmit = async (event: any) => {
        setIsLoading(true)
        event.preventDefault();

        if (title || description) {
            try {
                const res = await client.put(`todo/${todoId}`, {
                    title: title,
                    description: description,
                    completed: todoStatus,
                });
                setIsLoading(false)
                if (res.status === 200) {
                    onClick()
                    setRender()
                }
            } catch (error) {
                if (error.response.status === 409) {
                    populateErrorMessages(
                        "Item Could not be updated"
                    );
                }
            }
        }
    };

    const handleTitle = (event: any) => {
        event.preventDefault();
        setTitle(event.target.value);
        if (title || description) {
            deleteErrorMessage("You must change at least one of either Title or Descript to edit this Todo")
        }
    };

    const handleDescription = (event: any) => {
        event.preventDefault();
        setDescription(event.target.value);
        if (title || description) {
            deleteErrorMessage("You must change at least one of either Title or Descript to edit this Todo")
        }
    };

    return (
        <div className={editDisplay ? "show" : "hidden"}>
            <div className="modal">
                <div className="editForm">
                    <form className="formContainer" onSubmit={onSubmit}>
                        <label className="label">
                            Title
              <input
                                type="text"
                                name="Title"
                                className="editInput"
                                onChange={handleTitle}
                            />
                        </label>
                        <label className="label">
                            Description
              <input
                                type="text"
                                name="Description"
                                className="editInput"
                                onChange={handleDescription}
                            />
                        </label>
                        <div className="editButtonGroup">
                            <button className="editCancel" onClick={onClick} type="button">
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
                        {isLoading ?
                            <progress />
                            : null}
                    </form>
                    {errorMessages &&
                        errorMessages.map((error, key) => (
                            <div className={errorMessages ? "editErrors" : "hidden"} key={key}>
                                {error}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default EditForm;
