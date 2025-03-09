import cors from 'cors';

const whiteList = ['http://localhost:4200'];
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No Permitido'));
        }
    },
};

const corsMiddleware = cors(options);

export default corsMiddleware;