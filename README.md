Create Repository
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Create][github-create-repo] a Github repository.


## Installation

``` bash
$ npm install github-create-repo
```


## Usage

``` javascript
var createRepo = require( 'github-create-repo' );
```

<a name="create-repo"></a>
#### createRepo( name, options, clbk )

[Creates][github-create-repo] a Github repository.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

createRepo( 'gamma', opts, clbk );

function clbk( error, repo, info ) {
	// Check for rate limit information...
	if ( info ) {
		console.error( 'Limit: %d', info.limit );
		console.error( 'Remaining: %d', info.remaining );
		console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( JSON.stringify( repo ) );
	// returns <repo_data>
}
```

The `function` accepts the following `options`:
*	__token__: Github [access token][github-token] (*required*).
*	__useragent__: [user agent][github-user-agent] `string`.
*	__org__: organization name. If no organization is specified, the repository is created as a personal repository for the authenticated user.
*	__desc__: repository description. Default: `""`.
*	__homepage__: project homepage. Default: `""`.
*	__team__: team `id`. This `option` is only applicable when creating organization repositories.
*	__gitignore__: `.gitignore` template name.
*	__license__: `LICENSE` template name.
*	__private__: `boolean` indicating whether to create a private repository. Default: `false`.
*	__issues__: `boolean` indicating whether to enable issues. Default: `true`.
*	__wiki__: `boolean` indicating whether to enable a wiki. Default: `true`.
*	__downloads__: `boolean` indicating whether to enable downloads. Default: `true`.
*	__init__: `boolean` indicating whether to initialize the repository with an empty `README`. Default: `false`.

To [authenticate][github-oauth2] with Github, set the [`token`][github-token] option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

createRepo( 'erf', opts, clbk );
```

To specify a [user agent][github-user-agent], set the `useragent` option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!',
	'useragent': 'hello-github!'
};

createRepo( 'erfinv', opts, clbk );
```

By default, the `function` [creates][github-create-repo] a repository for the authenticated user. To [create][github-create-repo] a repository in an organization the authenticated user is a member of, set the `org` option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!',
	'org': 'math-io'
};

createRepo( 'betaln', opts, clbk );
```


#### createRepo.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!',
	'org': 'math-io',
	'private': false,
	'issues': true,
	'wiki': true,
	'downloads': true,
	'init': false
};

var create = createRepo.factory( opts, clbk );

create( 'beep' );
create( 'boop' );
create( 'bop' );
// ...
```

The factory method accepts the same `options` as [`createRepo()`](#create-repo).


---
## Notes

*	[Rate limit][github-rate-limit] information includes the following:
	-	__limit__: maximum number of requests a consumer is permitted to make per hour.
	-	__remaining__: number of remaining requests.
	-	__reset__: time at which the current [rate limit][github-rate-limit] window resets in [UTC seconds][unix-time].
	

---
## Examples

``` javascript
var createRepo = require( 'github-create-repo' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

__Note__: in order to run the example, you will need to obtain an access [token][github-token] with appropriate permissions and modify the `token` option accordingly.


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g github-create-repo
```


### Usage

``` bash
Usage: ghcreaterepo [options] name

Options:

  -h,  --help                Print this message.
  -V,  --version             Print the package version.
       --token token         Github access token.
  -ua, --useragent ua        User agent.
       --org organization    Github organization.
       --desc desc           Repository description.
       --homepage url        Project homepage.
       --private             Set the repository as private.
       --no-issues           Disable issues.
       --no-wiki             Disable repository wiki.
       --no-downloads        Disable repository downloads.
       --team id             Team id (organizations).
       --init                Auto-initialize a repository with an empty README.
       --gitignore template  .gitignore template.
       --license template    License template.
```

### Notes

*	In addition to the [`token`][github-token] option, the [token][github-token] may also be specified by a [`GITHUB_TOKEN`][github-token] environment variable. The command-line option __always__ takes precedence.
*	Repository information is written to `stdout`.
*	[Rate limit][github-rate-limit] information is written to `stderr`.


### Examples

Setting the access [token][github-token] using the command-line option:

``` bash
$ DEBUG=* ghcreaterepo --token <token> beep
# => '{...}'
```

Setting the access [token][github-token] using an environment variable:

``` bash
$ DEBUG=* GITHUB_TOKEN=<token> ghcreaterepo beep
# => '{...}'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/ghcreaterepo --token <token> beep
# => '{...}'
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --token <token> beep
# => '{...}'
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/github-create-repo.svg
[npm-url]: https://npmjs.org/package/github-create-repo

[build-image]: http://img.shields.io/travis/kgryte/github-create-repo/master.svg
[build-url]: https://travis-ci.org/kgryte/github-create-repo

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/github-create-repo/master.svg
[coverage-url]: https://codecov.io/github/kgryte/github-create-repo?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-create-repo.svg
[dependencies-url]: https://david-dm.org/kgryte/github-create-repo

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-create-repo.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-create-repo

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-create-repo.svg
[github-issues-url]: https://github.com/kgryte/github-create-repo/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[unix-time]: http://en.wikipedia.org/wiki/Unix_time

[github-api]: https://developer.github.com/v3/
[github-token]: https://github.com/settings/tokens/new
[github-oauth2]: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
[github-user-agent]: https://developer.github.com/v3/#user-agent-required
[github-rate-limit]: https://developer.github.com/v3/rate_limit/
[github-create-repo]: https://developer.github.com/v3/repos/#create
