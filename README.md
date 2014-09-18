# karma-lodash-template-preprocessor

[Karma](http://karma-runner.github.com) preprocessor to compile
[Lo-Dash templates](http://lodash.com/docs#template) on the fly.

## Installation

```bash
npm install karma-lodash-template-preprocessor --save-dev
```

## Configuration
Following code shows the default configuration.
```js
// karma.conf.js
module.exports = function( config ) {
  config.set({
    preprocessors: {
      "**/*.template.js": [ "lodash" ]
    },

    lodashPreprocessor: {
      // Template data. You can use function, which returns object
      data: {
        "this will be passed": "to _.template as second argument"
      },
      // Options passed to the _.template function as third argument:
      options: {
        interpolate: /regexp/,
        variable: "info"
        // Full list: http://lodash.com/docs#template
      },

      // Filename transform function ("file.template.js" > "file.js"):
      transformPath: function( path ) {
        return path.replace( /\.template\./i, "." );
      }
    }
  });
};
```
