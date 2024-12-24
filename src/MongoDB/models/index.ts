// import MongoCollections from '../../util/enums/MongoCollectionNames.ts';
// import { TMongoModel } from '../../util/types/MongoTypes.ts';
// import { TMongoModelConfig } from '../../util/types/structTypes.ts';
// import MongoModel from './MongoModel.ts';

// /**
//  * This type describes static props of classes that model Mongo collections.
//  */
// type TMongoModel = (new (...args: any[]) => MongoModel) & {
//     config: TMongoModelConfig;
//     initCollection: () => void;
// };

// type TModels = {
//     [key in MongoCollections]: TMongoModel;
// };

// const models: TModels = {
//     [MongoCollections.User]: User   ,
// };

// export default models;
