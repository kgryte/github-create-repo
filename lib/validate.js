'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );
var isBoolean = require( 'validate.io-boolean-primitive' );
var isURI = require( 'validate.io-uri' );
var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} options.token - Github access token
* @param {String} [options.useragent] - user agent string
* @param {String} [options.org] - organization name
* @param {String} [options.desc] - repository description
* @param {String} [options.homepage] - repository homepage
* @param {Number} [options.team] - team id (organizations)
* @param {String} [options.gitignore] - .gitignore template
* @param {String} [options.license] - LICENSE template
* @param {Boolean} [options.private] - boolean indicating whether a repository should be private
* @param {Boolean} [options.issues] - boolean indicating whether issues should be enabled
* @param {Boolean} [options.wiki] - boolean indicating whether a repository should have a Wiki
* @param {Boolean} [options.downloads] - boolean indicating whether downloads should be enabled
* @param {Boolean} [options.init] - boolean indicating whether to initialize the repository with an empty README
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	opts.token = options.token;
	if ( !isString( opts.token ) ) {
		return new TypeError( 'invalid option. `token` option must be a string primitive. Option: `' + opts.token + '`.' );
	}
	if ( options.hasOwnProperty( 'useragent' ) ) {
		opts.useragent = options.useragent;
		if ( !isString( opts.useragent ) ) {
			return new TypeError( 'invalid option. `useragent` option must be a string primitive. Option: `' + opts.useragent + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'org' ) ) {
		opts.org = options.org;
		if ( !isString( opts.org ) ) {
			return new TypeError( 'invalid option. `org` option must be a string primitive. Option: `' + opts.org + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'desc' ) ) {
		opts.desc = options.desc;
		if ( !isString( opts.desc ) ) {
			return new TypeError( 'invalid option. `desc` option must be a string primitive. Option: `' + opts.desc + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'homepage' ) ) {
		opts.homepage = options.homepage;
		if ( !isURI( opts.homepage ) ) {
			return new TypeError( 'invalid option. `homepage` option must be a valid URI. Option: `' + opts.homepage + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'team' ) ) {
		opts.team = options.team;
		if ( !isNonNegativeInteger( opts.team ) ) {
			return new TypeError( 'invalid option. `team` option must be a nonnegative integer. Option: `' + opts.team + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'gitignore' ) ) {
		opts.gitignore = options.gitignore;
		if ( !isString( opts.gitignore ) ) {
			return new TypeError( 'invalid option. `gitignore` option must be a string primitive. Option: `' + opts.gitignore + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'license' ) ) {
		opts.license = options.license;
		if ( !isString( opts.license ) ) {
			return new TypeError( 'invalid option. `license` option must be a string primitive. Option: `' + opts.license + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'private' ) ) {
		opts.private = options.private;
		if ( !isBoolean( opts.private ) ) {
			return new TypeError( 'invalid option. `private` option must be a boolean primitive. Option: `' + opts.private + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'issues' ) ) {
		opts.issues = options.issues;
		if ( !isBoolean( opts.issues ) ) {
			return new TypeError( 'invalid option. `issues` option must be a boolean primitive. Option: `' + opts.issues + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'wiki' ) ) {
		opts.wiki = options.wiki;
		if ( !isBoolean( opts.wiki ) ) {
			return new TypeError( 'invalid option. `wiki` option must be a boolean primitive. Option: `' + opts.wiki + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'downloads' ) ) {
		opts.downloads = options.downloads;
		if ( !isBoolean( opts.downloads ) ) {
			return new TypeError( 'invalid option. `downloads` option must be a boolean primitive. Option: `' + opts.downloads + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'init' ) ) {
		opts.init = options.init;
		if ( !isBoolean( opts.init ) ) {
			return new TypeError( 'invalid option. `init` option must be a boolean primitive. Option: `' + opts.init + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
