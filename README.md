Create Repository
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Create a Github repository.


## Installation

``` bash
$ npm install github-create-repo
```


## Usage

``` javascript
var createRepo = require( 'github-create-repo' );
```

#### createRepo()

Creates a Github repository.

``` javascript

```


## Examples

``` javascript
var createRepo = require( 'github-create-repo' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


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

  -h,  --help               Print this message.
  -V,  --version            Print the package version.
       --token token        Github access token.
  -ua, --useragent ua       User agent.
       --org organization   Github organization.
       --desc desc          Repository description.
       --homepage url       Project homepage.
       --private            Set the repository as private.
       --no-issues          Disable issues.
       --no-wiki            Disable repository wiki.
       --no-downloads       Disable repository downloads.
       --team id            Team id (organizations).
       --init               Auto-initialize a repository with an empty README.
       --gitignore template .gitignore template.
       --license template   License template.
```


### Examples

``` bash
$
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
