const {
    models: { User }
} = global.$context;

export const user = new User({ firstname: 'User' });

global.$context.user = user;

export function userMiddleware(req, res, next) {
    req.app.user = user;
    req.user = user;
    next();
}