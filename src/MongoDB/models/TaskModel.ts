import MongoCollections from '../../util/enums/MongoCollectionNames.ts';
import { TMongoConfig } from '../../util/types/MongoTypes.ts';
import { TTask } from '../../util/types/structTypes.ts';
import { generateMongoModel } from './MongoModel.ts';

const userConfig: TMongoConfig<TTask> = {
    bsonType: 'object',
    unique: ['id'],
    required: ['id', 'projectId', 'timeLapse', 'startTime'],
    properties: {
        id: {
            bsonType: 'string',
        },
        name: {
            bsonType: 'string',
        },

        timeLapse: {
            bsonType: 'number',
        },
        projectId: {
            bsonType: 'string',
        },
        startTime: {
            bsonType: 'number',
        },
    },
};

export const Task = await generateMongoModel<TTask>(
    userConfig,
    MongoCollections.Tasks,
);

export default Task;
