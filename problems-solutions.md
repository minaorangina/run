# Problems encountered, solutions found

A record problems/bugs encountered during the build, for future learning.

### Getting the access token in the correct format for SOAP
http://stackoverflow.com/questions/28399266/typeerror-when-trying-to-call-national-rail-soap-api-via-node

### Null values being rejected in National Rail request
 No solution found, worked around by putting in some values

### Running babel-cli
babel-cli needs to be installed globally

### Pushing changes to heroku
If on master
`git push heroku master`
If on a working branch
`git push heroku [yourBranch]:master`

### Getting sass files to load
webpack loaders are read from right to left.  sass-loader must go at the end of the array!

### Unexpected token on jsx during tests
`.babelrc` only specified `react` preset.
webpack.config specified both `react` and `es2015`
mocha uses babel and looks for presets in `.babelrc`
removed presets query from webpack config, now all babel config exist in `.babelrc` and shared between mocha and webpack

### DLR component only receiving correct props once (on initial mount)
To do with assignment quirk in reducer


### Cannot run dev server
```bash
 React Hot Loader: The Webpack loader is now exported separately. If you use Babel, we recommend that you remove "react-hot-loader" from the "loaders" section of your Webpack configuration altogether...
```
* Configuration for loaders has changed: (https://teamtreehouse.com/community/anyone-else-getting-an-error-when-including-react-hot-loader-in-the-webpack-config)
