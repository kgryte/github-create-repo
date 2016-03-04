'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var isString = require( 'validate.io-string-primitive' );
var copy = require( 'utils-copy' );
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var request = require( './request.js' );


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
* @param {Boolean} [options.wiki=true] - boolean indicating whether a repository should have a Wiki
* @param {Boolean} [options.downloads=true] - boolean indicating whether downloads should be enabled
* @param {Boolean} [options.init=false] - boolean indicating whether to initialize the repository with an empty README
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for creating a Github repository
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
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
		if ( !isString( name ) ) {
			throw new TypeError( 'invalid input argument. Repository name must be a string primitive. Value: `' + name + '`.' );
		}
		// TODO: something with the name

		request( opts, done );
		/**
		* FUNCTION: done( error )
		*	Callback invoked after receiving an API response.
		*
		* @private
		* @param {Error|Null} error - error object
		* @returns {Void}
		*/
		function done( error ) {
			if ( error ) {
				return clbk( error );
			}
			clbk( null );
		} // end FUNCTION done()
	}; // end FUNCTION createRepo()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
