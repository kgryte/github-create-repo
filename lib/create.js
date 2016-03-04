'use strict';

// MODULES //

var factory = require( './factory.js' );


// CREATE REPO //

/**
* FUNCTION: createRepo( name, opts, clbk )
*	Creates a Github repository.
*
* @param {String} name - repository name
* @param {Object} opts - function options
* @param {String} opts.token - Github access token
* @param {String} [opts.useragent] - user agent string
* @param {String} [opts.desc=""] - repository description
* @param {String} [opts.homepage=""] - repository homepage
* @param {Number} [opts.team] - team id (organizations)
* @param {String} [opts.gitignore] - .gitignore template
* @param {String} [opts.license] - LICENSE template
* @param {Boolean} [opts.private=false] - boolean indicating whether a repository should be private
* @param {Boolean} [opts.issues=true] - boolean indicating whether issues should be enabled
* @param {Boolean} [opts.wiki=true] - boolean indicating whether a repository should have a Wiki
* @param {Boolean} [opts.downloads=true] - boolean indicating whether downloads should be enabled
* @param {Boolean} [opts.init=false] - boolean indicating whether to initialize the repository with an empty README
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function createRepo( name, opts, clbk ) {
	factory( opts, clbk )( name );
} // end FUNCTION createRepo()


// EXPORTS //

module.exports = createRepo;
