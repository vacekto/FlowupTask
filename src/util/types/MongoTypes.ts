import { Collection, Document } from 'mongodb';
import { MongoModel } from '../../MongoDB/models/MongoModel.ts';
import { AssertArrayType, NonEmptyArray } from './index.ts';

type TPrimitive =
    | string
    | number
    | boolean
    | null
    | undefined
    | bigint;

type TPlainObjectValue = TPrimitive | TPlainObject | any[];

export type TPlainObject = {
    [key: string]: TPlainObjectValue;
};

export type TInstanceProps<T> = {
    props: T;
};

type TStaticProps = {
    initCollections: () => void;
    collection: Collection<Document>;
};

export type TMongoModel<T extends TPlainObject = any> =
    & (new (init: T) => MongoModel & TInstanceProps<T>)
    & TStaticProps;

type TBsonType =
    | 'string'
    | 'number'
    | 'object'
    | 'objectId'
    | 'array'
    | 'bool';

type TMongoType<T extends TBsonType> = {
    bsonType: T;
    description?: string;
    title?: string;
};

type TMongoArray<T extends TPlainObjectValue> = TMongoType<'array'> & {
    items?: T extends TPrimitive ? TMongoPrimitive<T>
        : T extends any[] ? TMongoArray<AssertArrayType<T>>
        : T extends TPlainObject ? TMongoObject<T>
        : never;
    additionalItems?: boolean;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
};

type TMongoString = TMongoType<'string'> & {
    description?: string;
};

type TMongoObjectId<T extends TPlainObject> = TMongoType<'objectId'> & {
    collectionModel: TMongoModel<T>;
};

type TMongoBoolean = TMongoType<'bool'>;

type TMongoNumber = TMongoType<'number'> & {
    minimum?: number;
    maximum?: number;
};

type TMongoPrimitive<T extends TPrimitive> = T extends string ? TMongoString
    : T extends number ? TMongoNumber
    : T extends boolean ? TMongoBoolean
    : never;

type TMongoProps<T extends TPlainObject> = {
    [key in keyof T]: T[key] extends TPrimitive ? TMongoPrimitive<T[key]>
        : T[key] extends any[] ? TMongoArray<AssertArrayType<T[key]>>
        : T[key] extends TPlainObject ? TMongoObject<T[key]>
        : never;
};

type TMongoObject<T extends TPlainObject> =
    | (
        & TMongoType<'object'>
        & {
            required?: NonEmptyArray<keyof T>;
            unique?: (keyof T)[];
            properties: TMongoProps<T>;
        }
    )
    | TMongoObjectId<T>;

export type TMongoConfig<T extends TPlainObject> = TMongoObject<T>;
