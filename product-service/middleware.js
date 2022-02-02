const tinyLogger = (tokens, req, res) => {
    return [
        tokens['date'](req, res, 'clf'),
        '|',
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
        JSON.stringify(req.body),
        '...',
    ].join(' ')
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unkown endpoint'
    })
}

const errorHandler = (error, rquest, response, next) => {
    console.error(error.name)
    console.error(error.message)

    next(error)
}

export {
    tinyLogger,
    unknownEndpoint,
    errorHandler,
}