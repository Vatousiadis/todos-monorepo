import React from "react";
import "./deleteForm.css";

type deleteFormProps = {
  display: boolean;
  onCancel: () => void;
  onDelete: (event: any) => void;
  isLoading: boolean;
};

const DeleteForm: React.FC<deleteFormProps> = ({
  display,
  onCancel,
  onDelete,
  isLoading,
}) => {
  return (
    <div className={display ? "show" : "hidden"}>
      <div className="modal">
        <div className="deleteForm">
          Are you sure you wish to delete this Todo?
          <div className="deleteButtonGroup">
            <button className="cancelDelete" onClick={onCancel}>
              CANCEL
            </button>
            <button className="deleteConfirm" onClick={onDelete}>
              DELETE
            </button>
          </div>
          {isLoading ? <progress /> : null}
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
