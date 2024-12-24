import { compare, hash } from 'bcrypt';
import { create } from 'djwt';
import { Middleware } from 'oak';
import { Project } from '../MongoDB/models/ProjectModel.ts';
import Task from '../MongoDB/models/TaskModel.ts';
import User from '../MongoDB/models/UserModel.ts';
import config from '../serverConfig.ts';
import { TJwtPayload, TProject } from '../util/types/index.ts';
import { TTask } from '../util/types/structTypes.ts';

export const createUser: Middleware = async (ctx) => {
    const user = await ctx.request.body.json();
    user.id = crypto.randomUUID();
    user.password = await hash(user.password);
    await User.collection.insertOne(user);
    ctx.response.status = 201;
};

export const generateToken: Middleware = async (ctx) => {
    const credentials = await ctx.request.body.json();
    const user = await User.collection.findOne({ email: credentials.email });
    if (!user) throw new Error(`no user with email ${credentials.email}`);
    const match = await compare(credentials.password, user.password);
    if (!match) throw new Error('incorrect password');
    const payload: TJwtPayload = {
        email: user.email,
        id: user.id,
        username: user.name,
    };
    const jwt = await create(
        { alg: 'HS512', typ: 'JWT' },
        payload,
        config.JWT_SECRET,
    );
    ctx.response.body = { token: jwt };
    ctx.response.status = 200;
};

export const createProject: Middleware = async (ctx) => {
    const userId = ctx.state.id;
    const user = await User.collection.findOne({ id: userId });
    if (!user) throw new Error(`no user with id: ${userId}`);
    const { projectName } = await ctx.request.body.json();
    const project: TProject = {
        id: crypto.randomUUID(),
        name: projectName,
        ownerId: userId,
    };
    await Project.collection.insertOne(project);
};

export const createTask: Middleware = async (ctx) => {
    const { taskName, projectId } = await ctx.request.body.json();
    const project = await Project.collection.findOne({ id: projectId });
    if (!project) throw new Error(`no project with id: ${projectId}`);
    const authorized = ctx.state.id === project.ownerId;
    if (!authorized) throw new Error('not authorized');
    const newTask: TTask = {
        id: crypto.randomUUID(),
        name: taskName,
        projectId,
        timeLapse: 0,
        startTime: -1,
    };
    const task = await Task.collection.insertOne(newTask);
};

export const startTask: Middleware = async (ctx, next) => {
    const { taskId } = await ctx.request.body.json();
    const task = await Task.collection.findOne({ id: taskId });
    if (!task) throw new Error(`no task with id ${taskId}`);
    const project = await Project.collection.findOne({ id: task.projectId });
    if (!project) {
        throw new Error(
            `task with id ${taskId} does not belong to any project`,
        );
    }
    const authorized = ctx.state.id === project.ownerId;
    if (!authorized) throw new Error('not authorized');
    if (task.startTime !== -1) {
        next();
        return;
    }
    Task.collection.updateOne({
        id: taskId,
    }, {
        $set: { startTime: Date.now() },
    });
};

export const stopTask: Middleware = async (ctx, next) => {
    const { taskId } = await ctx.request.body.json();
    const task = await Task.collection.findOne({ id: taskId });
    if (!task) throw new Error(`no task with id ${taskId}`);
    const project = await Project.collection.findOne({ id: task.projectId });
    if (!project) {
        throw new Error(
            `task with id ${taskId} does not belong to any project`,
        );
    }
    const authorized = ctx.state.id === project.ownerId;
    if (!authorized) throw new Error('not authorized');
    if (task.startTime === -1) {
        next();
        return;
    }
    await Task.collection.updateOne({
        id: taskId,
    }, {
        $set: {
            startTime: -1,
            timeLapse: task.timeLapse + (Date.now() - task.startTime),
        },
    });
};
