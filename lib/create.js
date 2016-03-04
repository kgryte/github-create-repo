'use strict';

// MODULES //

var factory = require( './factory.js' );


// CREATE REPO //

/**
* FUNCTION: createRepo( slug, opts, clbk )
*	Creates a Github repository.
*
* @param {String} slug - repository slug
* @param {Object} opts - function options
* @param {String} opts.token - Github access token
* @param {String} [opts.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function createRepo( slug, opts, clbk ) {
	factory( opts, clbk )( slug );
} // end FUNCTION createRepo()


// EXPORTS //

module.exports = createRepo;
