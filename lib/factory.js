'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var isString = require( 'validate.io-string-primitive' );
var copy = require( 'utils-copy' );
var validate = require( './validate.js' );
var getDefaults = require( './defaults.js' );
var query = require( './query.js' );


// VARIABLES //

var DEFAULT_HTTP_PORT = 80;
var DEFAULT_HTTPS_PORT = 443;


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for creating a Github repository.
*
* @param {Object} options - function options
* @param {String} options.token - Github access token
* @param {String} [options.useragent] - user agent string
* @param {String} [options.org] - organization name
* @param {String} [options.desc=""] - repository description
* @param {String} [options.homepage=""] - repository homepage
* @param {Number} [options.team] - team id (organizations)
* @param {String} [options.gitignore] - .gitignore template
* @param {String} [options.license] - LICENSE template
* @param {Boolean} [options.private=false] - boolean indicating whether a repository should be private
* @param {Boolean} [options.issues=true] - boolean indicating whether issues should be enabled
* @param {Boolean} [options.wiki=true] - boolean indicating whether a repository should have a wiki
* @param {Boolean} [options.downloads=true] - boolean indicating whether downloads should be enabled
* @param {Boolean} [options.init=false] - boolean indicating whether to initialize the repository with an empty README
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for creating a Github repository
*/
function factory( options, clbk ) {
	var opts;
	var err;
	var defaults = getDefaults(options);
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( opts.port === null ) {
		if ( opts.protocol === 'https' ) {
			opts.port = DEFAULT_HTTPS_PORT;
		} else {
			opts.port = DEFAULT_HTTP_PORT;
		}
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	/**
	* FUNCTION: createRepo( name )
	*	Creates a Github repository.
	*
	* @param {String} name - repository name
	* @returns {Void}
	*/
	return function createRepo( name ) {
		name = name || opts.name;
		if ( !isString( name ) ) {
			throw new TypeError( 'invalid input argument. Repository name must be a string primitive. Value: `' + name + '`.' );
		}
		query( name, opts, done );
		/**
		* FUNCTION: done( error, data, info )
		*	Callback invoked after receiving an API response.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Object[]} data - query data
		* @param {Object} info - response info
		* @returns {Void}
		*/
		function done( error, data, info ) {
			error = error || null;
			data = data || null;
			info = info || null;
			clbk( error, data, info );
		} // end FUNCTION done()
	}; // end FUNCTION createRepo()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
