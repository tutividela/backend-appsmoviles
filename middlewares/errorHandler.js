export function errorHandler(error, req, res, next) {
    console.log(error);
    return res.status(error.name? 400: 500).json(error);
}