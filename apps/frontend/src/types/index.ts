export interface Action {
    type: string;
    createdAt: Date;
}

export type Credit = {
    type: string;
    remaining: number;
}