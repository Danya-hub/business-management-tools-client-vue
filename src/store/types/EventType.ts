export type StoredEventType = {
    id: number;
    title: string;
    description: string;
    start: number;
    finish: number;
};

export type UnpackedEventType = {
    id: number;
    title: string;
    description: string;
    start: Date;
    finish: Date;
};