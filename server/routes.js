
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: {
            file: 'index.html'
        }
    },
    {
        method: 'GET',
        path: '/{someFile*}',
        handler: {
            directory: {
                path: '../dist',
                redirectToSlash: false,
                index: true
            }
        }
    }
];
