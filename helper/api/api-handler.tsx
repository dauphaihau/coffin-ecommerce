import {errorHandler} from "./error-handler";
import {jwtMiddleware} from "./jwt-middleware";
import {NextApiRequest, NextApiResponse} from "next";

export { apiHandler };

function apiHandler(handler) {
    return async (req: NextApiRequest , res: NextApiResponse) => {
        const method = req.method.toLowerCase();

        // check handler supports HTTP method
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // global middleware
            await jwtMiddleware(req, res);

            // route handler
            await handler[method](req, res);
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}