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

		if ( lodash.isEmpty( data ) ) {
			log.error( "No data specified for Lo-Dash!" );
			return;
		}

		return function( content, file, done ) {
			log.debug( "Processing " + file.originalPath + "." );
			file.path = transformPath( file.originalPath );
			done( lodash.template( content, data, options ) );
		};
	};

createLodashPreprocessor.$inject = [ "args", "config.lodashPreprocessor",
	"logger" ];

module.exports = {
	"preprocessor:lodash": [ "factory", createLodashPreprocessor ]
};
