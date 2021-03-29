export interface editFormProps {
    editDisplay: boolean;
    onClick: () => void;
    setRender: () => void;
    todoId: string;
    todoStatus: boolean;
    existingDescription: string;
    existingTitle: string;
};
