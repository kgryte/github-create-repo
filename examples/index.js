'use strict';

var createRepo = require( './../lib' );

var opts = {
	'token': '<your_token_goes_here>',
	'useragent': 'beep-boop-bop'
};

createRepo( 'beep', opts, clbk );

function clbk( error, repo, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( repo );
}
