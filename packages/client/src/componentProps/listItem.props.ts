export interface listItemProps {
    title: string;
    description: string;
    completed: boolean;
    handleCompleted: (event: any) => void;
    onDeleteShow: () => void;
    onEditShow: () => void;
};