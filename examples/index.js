'use strict';

var createRepo = require( './../lib' );

var opts = {
	'token': '<your_token_goes_here>',
	'useragent': 'beep-boop-bop'
};

createRepo( opts, clbk );

function clbk( error ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( 'Repository successfully created.' );
}
