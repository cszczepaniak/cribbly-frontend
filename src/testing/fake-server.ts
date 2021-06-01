import { rest, RestContext, RestRequest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer();
const executedRequests: RestRequest[] = [];

function start() {
    server.listen();
}

function reset() {
    executedRequests.splice(0);
    server.resetHandlers();
}

function stop() {
    server.close();
}

function createResponseTransformers<T>(ctx: RestContext, status = 200, body?: T) {
    const result = [ctx.status(status)];
    if (body !== undefined) {
        result.push(ctx.json(body));
    }
    return result;
}

function setupGetRequest<T>(path: string, status = 200, body?: T) {
    server.use(
        rest.get(path, (req, res, ctx) => {
            executedRequests.push(req);
            return res(...createResponseTransformers(ctx, status, body));
        }),
    );
}

function setupPostRequest<T>(path: string, status = 200, body?: T) {
    server.use(
        rest.post(path, (req, res, ctx) => {
            executedRequests.push(req);
            return res(...createResponseTransformers(ctx, status, body));
        }),
    );
}

export const FakeServer = {
    start,
    reset,
    stop,
    executedRequests,
    setupGetRequest,
    setupPostRequest,
};
