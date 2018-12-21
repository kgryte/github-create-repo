'use strict';

// MODULES //

var tape = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var merge = require( 'utils-merge2' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = require( './fixtures/results.json' );
var info = require( './fixtures/info.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof factory, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		factory( null, noop );
	}
	function bar() {
		factory( {'private':'beep'}, noop );
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
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( opts, value );
		};
	}
});

tape( 'function returns a function', function test( t ) {
	t.equal( typeof factory( getOpts(), noop ), 'function', 'returns a function' );
	t.end();
});

tape( 'if a `port` option is not specified and the protocol is `https`, the default port is `443`', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./query.js': query,
		'./validate.js': validate
	});

	opts = getOpts();
	opts.protocol = 'https';
	opts.port = null;

	fcn = factory( opts, noop );
	fcn( 'erf' );

	function validate( opts, options ) {
		merge( opts, options );
		return null;
	}
	function query( name, opts ) {
		t.equal( opts.port, 443, 'sets the default port to `443` for HTTPS' );
		t.end();
	}
});

tape( 'if a `port` option is not specified and the protocol is `http`, the default port is `80`', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./query.js': query,
		'./validate.js': validate
	});

	opts = getOpts();
	opts.protocol = 'http';
	opts.port = null;

	fcn = factory( opts, noop );
	fcn( 'gamma' );

	function validate( opts, options ) {
		merge( opts, options );
		return null;
	}
	function query( name, opts ) {
		t.equal( opts.port, 80, 'sets the default port to `80` for HTTP' );
		t.end();
	}
});

tape( 'function returns a function which throws if provided a repository name argument which is not a string primitive', function test( t ) {
	var values;
	var opts;
	var fcn;
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
	fcn = factory( opts, noop );
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			fcn( value );
		};
	}
});

tape( 'function returns a function which returns an error to a provided callback if an error is encountered when creating a repository', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./query.js': query
	});

	opts = getOpts();
	fcn = factory( opts, done );
	fcn( 'exmp1' );

	function query( name, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns a function which returns response data to a provided callback', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./query.js': query
	});

	expected = data;

	opts = getOpts();
	fcn = factory( opts, done );
	fcn( 'beta' );

	function query( name, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, data, info );
		}
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

tape( 'function returns a function which returns rate limit info to a provided callback', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./query.js': query
	});

	expected = info;

	opts = getOpts();
	fcn = factory( opts, done );
	fcn( 'gamma-delta-ratio' );

	function query( name, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, data, info );
		}
	}

	function done( error, data, info ) {
		assert.deepEqual( info, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
