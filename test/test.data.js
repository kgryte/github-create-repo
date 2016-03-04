'use strict';

// MODULES //

var tape = require( 'tape' );
var data = require( './../lib/data.js' );


// FUNCTIONS //

function setup() {
	return {
		'desc': 'beep',
		'homepage': 'https://github.com/kgryte',
		'team_id': 1,
		'gitignore': 'Haskell',
		'license': 'mit',
		'private': false,
		'issues': true,
		'wiki': true,
		'downloads': true,
		'init': false
	};
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof data, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a string', function test( t ) {
	t.equal( typeof data( 'sum_series', setup() ), 'string', 'returns a string' );
	t.end();
});

tape( 'the function sets the `name` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.name, 'erf', 'sets the `name` field' );
	t.end();
});

tape( 'the function sets the `description` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.description, opts.desc, 'sets the `description` field' );
	t.end();
});

tape( 'the function sets the `homepage` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.homepage, opts.homepage, 'sets the `homepage` field' );
	t.end();
});

tape( 'the function sets the `team_id` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.team_id, opts.team, 'sets the `team_id` field' );
	t.end();
});

tape( 'the function sets the `gitignore_template` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.gitignore_template, opts.gitignore, 'sets the `gitignore_template` field' );
	t.end();
});

tape( 'the function sets the `license_template` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.license_template, opts.license, 'sets the `license_template` field' );
	t.end();
});

tape( 'the function sets the `private` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.private, opts.private, 'sets the `private` field' );
	t.end();
});

tape( 'the function sets the `has_issues` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.has_issues, opts.issues, 'sets the `has_issues` field' );
	t.end();
});

tape( 'the function sets the `has_wiki` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.has_wiki, opts.wiki, 'sets the `has_wiki` field' );
	t.end();
});

tape( 'the function sets the `has_downloads` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.has_downloads, opts.downloads, 'sets the `has_downloads` field' );
	t.end();
});

tape( 'the function sets the `auto_init` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'erf', opts );
	out = JSON.parse( out );

	t.equal( out.auto_init, opts.init, 'sets the `auto_init` field' );
	t.end();
});
