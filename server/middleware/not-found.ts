export default function notFoundMiddleware(req, res) {
    res.status(404).send('Route does not exist')
}