'use strict';

// MODULES //

var tape = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var create = require( './../lib/create.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = require( './fixtures/results.json' );
var info = require( './fixtures/info.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof create, 'function', 'export is a function' );
	t.end();
});

tape( 'function returns an error to a provided callback if an error is encountered when creating a repository', function test( t ) {
	var create;
	var opts;

	create = proxyquire( './../lib/create.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	create( 'powm1', opts, done );

	function factory( opts, clbk ) {
		return function create() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( new Error( 'beep' ), null, info );
			}
		};
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns response data to a provided callback', function test( t ) {
	var expected;
	var create;
	var opts;

	create = proxyquire( './../lib/create.js', {
		'./factory.js': factory
	});

	expected = data;

	opts = getOpts();
	create( 'erfc', opts, done );

	function factory( opts, clbk ) {
		return function create() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, data, info );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback', function test( t ) {
	var expected;
	var create;
	var opts;

	create = proxyquire( './../lib/create.js', {
		'./factory.js': factory
	});

	expected = info;

	opts = getOpts();
	create( 'log1p', opts, done );

	function factory( opts, clbk ) {
		return function create() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, data, info );
			}
		};
	}

	function done( error, data, info ) {
		assert.deepEqual( info, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
