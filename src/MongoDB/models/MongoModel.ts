import MongoCollections from '../../util/enums/MongoCollectionNames.ts';
import {
    TInstanceProps,
    TMongoConfig,
    TMongoModel,
    TPlainObject,
} from '../../util/types/MongoTypes.ts';
import { DB } from '../config/index.ts';

export abstract class MongoModel {
    abstract save(): void;
}

export const generateMongoModel = async <T extends TPlainObject>(
    config: TMongoConfig<T>,
    collectionName: MongoCollections,
): Promise<TMongoModel<T>> => {
    const generatedModel = class extends MongoModel
        implements TInstanceProps<T> {
        props: T;

        private static config: TMongoConfig<T> = config;

        static collection = DB.collection(
            collectionName,
        );

        static initCollections = async () => {
            await generatedModel.generateSchema();
            await generatedModel.registerIndexes(generatedModel.config);
        };

        private static registerIndexes = async (
            obj: any,
            path: string = '',
        ) => {
            const props: string[] = [];

            obj?.unique?.forEach((prop: string) => {
                props.push(
                    `${path}${path === '' ? '' : '.'}${prop}`,
                );
            });

            await Promise.all(
                props.map((p) =>
                    generatedModel.collection.createIndex(
                        { [p]: 1 },
                        { unique: true },
                    )
                ),
            );

            for (const key of Object.keys(obj.properties)) {
                if (obj.properties[key]?.bsonType === 'object') {
                    generatedModel.registerIndexes(
                        obj.properties[key],
                        path + (path === '' ? '' : '.') + key,
                    );
                }
            }
        };

        private static generateSchema = async () => {
            const schema: any = structuredClone(generatedModel.config);

            const cleanSchema = (obj: any) => {
                delete obj.unique;
                delete obj.collectionModel;
                for (const key of Object.keys(obj)) {
                    if (
                        typeof obj[key] === 'object' &&
                        !Array.isArray(obj[key])
                    ) cleanSchema(obj[key]);
                }
            };

            cleanSchema(schema);

            const collections = await DB.listCollections().toArray();
            const userCollectionExists = collections.some((coll) =>
                coll.name === collectionName
            );

            if (userCollectionExists) {
                DB.command({
                    collMod: collectionName,
                    validator: { $jsonSchema: schema },
                    validationLevel: 'strict',
                    validationAction: 'error',
                });
            } else {
                DB.createCollection(
                    collectionName,
                    {
                        validator: {
                            $jsonSchema: schema,
                        },
                        validationLevel: 'strict',
                        validationAction: 'error',
                    },
                );
            }
        };

        constructor(init: T) {
            super();
            this.props = init;
        }

        override async save() {
        }
    };

    await generatedModel.initCollections();

    return generatedModel;
};

export default generateMongoModel;
