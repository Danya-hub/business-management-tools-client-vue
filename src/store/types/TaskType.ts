export type StoredTaskType = {
    id: number;
    title: string;
    created_at: number;
    description?: string | undefined;
    completed: boolean;
};

export type UnpackedTaskType = {
    id?: number,
    title: string;
    created_at: number;
    description?: string;
    completed: boolean;
};
