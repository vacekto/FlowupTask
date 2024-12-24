import MongoCollections from '../../util/enums/MongoCollectionNames.ts';
import { TMongoConfig } from '../../util/types/MongoTypes.ts';
import { TProject } from '../../util/types/structTypes.ts';
import { generateMongoModel } from './MongoModel.ts';

const projectConfig: TMongoConfig<TProject> = {
    bsonType: 'object',
    unique: ['id', 'ownerId', 'name'],
    required: ['ownerId', 'id', 'name'],
    properties: {
        id: {
            bsonType: 'string',
        },
        name: {
            bsonType: 'string',
        },
        ownerId: {
            bsonType: 'string',
        },
    },
};

export const Project = await generateMongoModel<TProject>(
    projectConfig,
    MongoCollections.Projects,
);
