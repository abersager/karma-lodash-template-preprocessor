# karma-lodash-template-preprocessor

[Karma](http://karma-runner.github.com) preprocessor to compile
[Lo-Dash templates](http://lodash.com/docs#template) on the fly.

## Installation

```bash
npm install karma-lodash-template-preprocessor --save-dev
```

## Configuration
Following code shows all configuration options:

```js
// karma.conf.js
module.exports = function( config ) {
  config.set({
    preprocessors: {
      "**/*.template.js": [ "lodash" ]
    },

    lodashPreprocessor: {
      // Template data. You can use function, which returns object
      // When omitted, templates are compiled into functions that take data
      // arguments.
      data: {
        "this will be passed": "to _.template as second argument"
      },

      // Name of global namespace object that template functions are attached
      // to. Only useful in conjunction with compiled function (i.e. when no
      // data object is defined).
      globalVariable: 'JST'

      // Options set as _.templateSettings
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
