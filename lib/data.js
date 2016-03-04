'use strict';

// MODULES //

var debug = require( 'debug' )( 'github-create-repo:data' );


// DATA //

/**
* FUNCTION: data( name, opts )
*	Extracts data to be posted to a remote endpoint.
*
* @param {String} name - repository name
* @param {String} opts.desc - repository description
* @param {String} opts.homepage - repository homepage
* @param {Number} [opts.team] - team id (organizations)
* @param {String} [opts.gitignore] - .gitignore template
* @param {String} [opts.license] - LICENSE template
* @param {Boolean} opts.private - boolean indicating whether a repository should be private
* @param {Boolean} opts.issues - boolean indicating whether issues should be enabled
* @param {Boolean} opts.wiki - boolean indicating whether a repository should have a wiki
* @param {Boolean} opts.downloads - boolean indicating whether downloads should be enabled
* @param {Boolean} opts.init - boolean indicating whether to initialize the repository with an empty README
* @returns {String} data to post
*/
function data( name, opts ) {
	var out = {};

	out.name = name;
	debug( 'Repository name: %s', name );

	out.description = opts.desc;
	debug( 'Repository description: %s', opts.desc );

	out.homepage = opts.homepage;
	debug( 'Repository homepage: %s', opts.homepage );

	if ( opts.team !== null ) {
		out.team_id = opts.team;
		debug( 'Organization team id: %d', opts.team );
	}
	if ( opts.gitignore ) {
		out.gitignore_template = opts.gitignore;
		debug( 'Repository .gitignore template: %s', opts.gitignore );
	}
	if ( opts.license ) {
		out.license_template = opts.license;
		debug( 'Repository license template: %s', opts.license );
	}
	out.private = opts.private;
	debug( 'Repository visibility: %s', (opts.private ? 'private' : 'public') );

	out.has_issues = opts.issues;
	debug( 'Repository issues: %s', (opts.issues ? 'enabled' : 'disabled') );

	out.has_wiki = opts.wiki;
	debug( 'Repository wiki: %s', (opts.wiki ? 'enabled' : 'disabled') );

	out.has_downloads = opts.downloads;
	debug( 'Repository downloads: %s', (opts.downloads ? 'enabled' : 'disabled') );

	out.auto_init = opts.init;
	debug( 'Repository initialized: %s', (opts.init ? 'true' : 'false') );

	return JSON.stringify( out );
} // end FUNCTION data()


// EXPORTS //

module.exports = data;
