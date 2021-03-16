import React, { useState } from "react";
import client from "../../../apis/todos";
import "./createForm.css";

type createFormProps = {
    display: boolean;
    onClick: () => void;
    setRender: () => void;
};

const CreateForm: React.FC<createFormProps> = ({ onClick, display, setRender }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>(["You must enter both a Title and a Description to create a new Todo"]);

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
                    onClick()
                    setRender()
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
        if (title && description) {
            deleteErrorMessage("You must enter both a Title and a Description to create a new Todo")
        }
    };

    const handleDescription = (event: any) => {
        event.preventDefault();
        setDescription(event.target.value);
        if (title && description) {
            deleteErrorMessage("You must enter both a Title and a Description to create a new Todo")
        }
    };

    return (
        <div className={display ? "show" : "hidden"}>
            <div className="modal">
                <div className="createForm">
                    <form className="createFormContainer" onSubmit={onSubmit}>
                        <label className="label">
                            Title
              <input
                                type="text"
                                name="Title"
                                className="input"
                                onChange={handleTitle}
                            />
                        </label>
                        <label className="label">
                            Description
              <input
                                type="text"
                                name="Description"
                                className="input"
                                onChange={handleDescription}
                            />
                        </label>
                        <div className="createButtonGroup">
                            <button className="createCancel" onClick={onClick} type="button">
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
                        {isLoading ?
                            <progress />
                            : null}
                    </form>
                    {errorMessages &&
                        errorMessages.map((error, key) => (
                            <div className={errorMessages ? "createErrors" : "hidden"} key={key}>
                                {error}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default CreateForm;
