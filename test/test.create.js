'use strict';

// MODULES //

var tape = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
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

tape( 'function throws if provided a name argument which is not a string', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	opts = getOpts();
	opts.inferFromPackageJson = false;
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			create( value, opts, noop );
		};
	}
});

tape( 'function throws if provided an invalid options argument', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			create( 'erf', {
				'private': value
			}, noop );
		};
	}
});

tape( 'function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	opts.inferFromPackageJson = false;
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			create( 'float64-to-words', opts, value );
		};
	}
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
