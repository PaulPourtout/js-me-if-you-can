import { IKata } from "./IKata";

export interface ISerie {
    _id: number;
    title: string;
    description: string;
    katas: IKata[];
    created_at: Date;
    updated_at: Date;
}
