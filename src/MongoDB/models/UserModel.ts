import MongoCollections from '../../util/enums/MongoCollectionNames.ts';
import { TUser } from '../../util/types/index.ts';
import { TMongoConfig } from '../../util/types/MongoTypes.ts';
import { generateMongoModel } from './MongoModel.ts';

const userConfig: TMongoConfig<TUser> = {
    bsonType: 'object',
    unique: ['email', 'id'],
    required: ['id', 'email', 'name', 'password'],
    properties: {
        email: {
            bsonType: 'string',
        },
        id: {
            bsonType: 'string',
        },
        name: {
            bsonType: 'string',
        },
        password: {
            bsonType: 'string',
        },
    },
};

const User = await generateMongoModel<TUser>(
    userConfig,
    MongoCollections.Users,
);

export default User;
