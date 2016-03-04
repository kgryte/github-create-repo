'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} options.token - Github access token
* @param {String} [options.useragent] - user agent string
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	opts.token = options.token;
	if ( !isString( opts.token ) ) {
		return new TypeError( 'invalid option. Token option must be a string primitive. Option: `' + opts.token + '`.' );
	}
	if ( options.hasOwnProperty( 'useragent' ) ) {
		opts.useragent = options.useragent;
		if ( !isString( opts.useragent ) ) {
			return new TypeError( 'invalid option. User agent option must be a string primitive. Option: `' + opts.useragent + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
