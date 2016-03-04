'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var isString = require( 'validate.io-string-primitive' );
var copy = require( 'utils-copy' );
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var post = require( './post.js' );


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for creating a Github repository.
*
* @param {Object} options - function options
* @param {String} options.token - Github access token
* @param {String} [options.useragent] - user agent string
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
	* FUNCTION: createRepo( slug )
	*	Creates a Github repository.
	*
	* @param {String} slug - repository slug
	* @returns {Void}
	*/
	return function createRepo( slug ) {
		if ( !isString( slug ) ) {
			throw new TypeError( 'invalid input argument. Repository slug must be a string primitive. Value: `' + slug + '`.' );
		}
		// TODO: something with the slug

		post( opts, done );
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
