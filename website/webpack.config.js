// webpack.config.js
const { ProvidePlugin } = require('webpack'); // Remember to import

module.exports = {
    entry: {
        App: './output/App.js',
        RockPaperScissors: './output/RockPaperScissors.js',
        MovieManagement: './output/MovieManagement/MovieApp.js',
    },
    output: {
      	// default output to ./dist folder
        filename: '[name].js', // Retain original file name
    },
    mode: 'development',
    watch: true,
    // Add plugins
    plugins: [
        new ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom/client'
        }),
    ],
};