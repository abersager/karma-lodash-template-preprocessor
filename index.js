var lodash = require( "lodash" ),
	createLodashPreprocessor = function( args, config, logger ) {
		"use strict";

		config = config || {};

		var log = logger.create( "preprocessor.lodash" ),
			options = lodash.merge( args.options || {}, config.options || {} ),
			argsData = args.data ? lodash.result(args, 'data') : {},
			configData = config.data ? lodash.result(config, 'data') : {},
			data = lodash.merge(argsData, configData),
			transformPath = args.transformPath || config.transformPath || function( path ) {
				return path.replace( /\.template\./i, "." );
			};

		var compileWithData = lodash.isEmpty( data );

		return function( content, file, done ) {
			log.debug( "Processing " + file.originalPath + "." );
			file.path = transformPath( file.originalPath );
			lodash.templateSettings = options;
			if (compileWithData) {
				var compiled = lodash.template( content );
			} else {
				var compiled = lodash.template( content, data );
			}

			if (config.globalVariable) {
				compiled = 'window.' + config.globalVariable + ' = window.' + config.globalVariable + ' || {}; window.' + config.globalVariable + '["' + file.path + '"] = ' + compiled.toString();
			}
			done( compiled );
		};
	};

createLodashPreprocessor.$inject = [ "args", "config.lodashPreprocessor",
	"logger" ];

module.exports = {
	"preprocessor:lodash": [ "factory", createLodashPreprocessor ]
};
