'use strict';

// MODULES //

var tape = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

tape( 'file exports a validation function', function test( t ) {
	t.equal( typeof validate, 'function', 'file exports a function' );
	t.end();
});

tape( 'if an options argument is not an object, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[i] );
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `token` option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
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

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'token': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'a `token` option is required', function test( t ) {
	var err = validate( {}, {} );
	t.ok( err instanceof TypeError, 'a token option is required' );
	t.end();
});

tape( 'if provided a `useragent` option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
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

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'token': 'abcdefg',
			'useragent': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'the function returns `null` if all options are valid', function test( t ) {
	var opts;
	var err;

	opts = {};
	err = validate( opts, {
		'token': 'abcdefg',
		'useragent': 'beeper-booper'
	});
	t.equal( err, null, 'returns null' );
	t.equal( opts.token, 'abcdefg', 'sets the token option' );
	t.equal( opts.useragent, 'beeper-booper', 'sets the useragent option' );

	t.end();
});

tape( 'the function will ignore unrecognized options', function test( t ) {
	var err;

	err = validate( {}, {
		'token': 'abcdefg',
		'beep': 'boop',
		'a': 5,
		'b': null,
		'c': 'woot'
	});
	t.equal( err, null, 'returns null' );

	t.end();
});
