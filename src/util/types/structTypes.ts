import { TUniqueArray } from './index.ts';

export type TUser = {
    email: string;
    name: string;
    password: string;
    id: string;
    // projects: TProject[];
};

export type TProject = {
    id: string;
    name: string;
    // tasks: TTask[];
    ownerId: string;
};

export type TTask = {
    id: string;
    name: string;
    projectId: string;
    timeLapse: number;
    startTime: number;
};

export type TJwtPayload = {
    email: string;
    username: string;
    id: string;
};

export type TMongoModelConfig<T = any> = {
    collectionName: string;
    requiredProps: TUniqueArray<Exclude<keyof T, number | symbol>>;
    uniqueProps: TUniqueArray<Exclude<keyof T, number | symbol>>;
};
