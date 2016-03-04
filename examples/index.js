'use strict';

var createRepo = require( './../lib' );

var opts = {
	'token': '<your_token_goes_here>',
	'useragent': 'beep-boop-bop'
};

createRepo( 'test-github-create-repo', opts, clbk );

function clbk( error, repo, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( repo );
}
