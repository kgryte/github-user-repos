User Repositories
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Get meta data for [repositories][github-repos] associated with a user.


## Installation

``` bash
$ npm install github-user-repos
```


## Usage

``` javascript
var repos = require( 'github-user-repos' );
```

<a name="repos"></a>
#### repos( opts, clbk )

Gets meta data for [repositories][github-repos] associated with a user.

``` javascript
var opts = {
	'username': 'kgryte'
};

repos( opts, clbk );

function clbk( error, results, info ) {
	// Check for rate limit information...
	if ( info ) {
		console.error( 'Limit: %d', info.limit );
		console.error( 'Remaining: %d', info.remaining );
		console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( JSON.stringify( results ) );
	// returns <repo_data>
}
```

The `function` accepts the following `options`:
*	__token__: Github [access token][github-token].
*	__username__: Github username.
* 	__type__: repository [type][github-repos]. Can be one of `all`, `owner`, `member`,  `public`, or `private`. The `public` and `private` options are __only__ applicable if the function is provided a `token` and no `username`.
*	__sort__: method used to sort meta data. Can be one of `full_name`, `created`, `pushed`, or `updated`.
*	__direction__: sort direction; either `asc` or `desc`.
*	__visibility__: repository visibility. Can be one of `all`, `public`, or `private`. Applicable if provided a `token` and no `username`. Ignored if `type` option is present.
*	__affiliation__: repository affiliation. A comma-separated list of values, which may include: `owner`, `collaborator`, `organization_member`. Applicable if provided a `token` and no `username`. Ignored if `type` option is present. 
*	__useragent__: [user agent][github-user-agent] `string`.

To [authenticate][github-oauth2] with Github, set the [`token`][github-token] option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

repos( opts, clbk );
```

To specify a [user agent][github-user-agent], set the `useragent` option.

``` javascript
var opts = {
	'username': 'kgryte',
	'useragent': 'hello-github!'
};

repos( opts, clbk );
```

To return repositories of a particular [type][github-repos], set the `type` option.

``` javascript
var opts = {
	'username': 'kgryte',
	'type': 'owner'
};

repos( opts, clbk );
```


#### repos.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var opts = {
	'username': 'kgryte',
	'token': 'tkjorjk34ek3nj4!'
};

var get = repos.factory( opts, clbk );

get();
get();
get();
// ...
```

The factory method accepts the same `options` as [`repos()`](#repos).


## Notes

*	Either a `username` or a [`token`][github-token] or both __must__ be provided. If provided a [`token`][github-token], but not a `username`, the `function` [fetches][github-get] repositories associated with the authenticated user.
*	If not provided a `token`, the `function` can only return __public__ repository meta data.
*	[Rate limit][github-rate-limit] information includes the following:
	-	__limit__: maximum number of requests a consumer is permitted to make per hour.
	-	__remaining__: number of remaining requests.
	-	__reset__: time at which the current [rate limit][github-rate-limit] window resets in [UTC seconds][unix-time].


---
## Examples

``` javascript
var repos = require( 'github-user-repos' );

var opts = {
	'username': 'kgryte',
	'useragent': 'beep-boop-bop'
};

repos( opts, clbk );

function clbk( error, results, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( results );
}
```

To run the example code from the top-level application directory,

``` bash
$ DEBUG=* node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g github-user-repos
```


### Usage

``` bash
Usage: ghuserrepos [options]

Options:

  -h,  --help                    Print this message.
  -V,  --version                 Print the package version.
       --token token             Github access token.
       --username username       Github username.
  -ua, --useragent ua            User agent.
       --visibility visibility   Repository visibility: public, private, all.
       --affiliation affiliation Repository affiliation.
       --type type               Repository type: forks, public, private, etc.
       --sort sort               Sort method: full_name, created, pushed, etc.
       --direction dir           Sort direction: asc, desc.
```


### Notes

*	In addition to the [`token`][github-token] option, the [token][github-token] may also be specified by a [`GITHUB_TOKEN`][github-token] environment variable. The command-line option __always__ takes precedence.
*	Request resources are written to `stdout`.
*	[Rate limit][github-rate-limit] information is written to `stderr`.


### Examples

Setting the access [token][github-token] using the command-line option:

``` bash
$ DEBUG=* ghuserrepos --token <token> --username kgryte
# => '[{...},{...},...]'
```

Setting the access [token][github-token] using an environment variable:

``` bash
$ DEBUG=* GITHUB_TOKEN=<token> ghuserrepos --username kgryte
# => '[{...},{...},...]'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/ghuserrepos --token <token>  --username kgryte
# => '[{...},{...},...]'
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --token <token> --username kgryte
# => '[{...},{...},...]'
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


[npm-image]: http://img.shields.io/npm/v/github-user-repos.svg
[npm-url]: https://npmjs.org/package/github-user-repos

[build-image]: http://img.shields.io/travis/kgryte/github-user-repos/master.svg
[build-url]: https://travis-ci.org/kgryte/github-user-repos

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/github-user-repos/master.svg
[coverage-url]: https://codecov.io/github/kgryte/github-user-repos?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-user-repos.svg
[dependencies-url]: https://david-dm.org/kgryte/github-user-repos

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-user-repos.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-user-repos

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-user-repos.svg
[github-issues-url]: https://github.com/kgryte/github-user-repos/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[unix-time]: http://en.wikipedia.org/wiki/Unix_time

[github-get]: https://github.com/kgryte/github-get
[github-repos]: https://developer.github.com/v3/repos/
[github-api]: https://developer.github.com/v3/
[github-token]: https://github.com/settings/tokens/new
[github-oauth2]: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
[github-user-agent]: https://developer.github.com/v3/#user-agent-required
[github-rate-limit]: https://developer.github.com/v3/rate_limit/