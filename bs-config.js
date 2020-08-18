module.exports = {
    server: {
        middleware: {
            1: require('connect-history-api-fallback')({
                index: './src/views/index.html',
                verbose: true
            })
        }
    }
};
