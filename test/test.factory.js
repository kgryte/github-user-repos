'use strict';

// MODULES //

var tape = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
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
		factory( {'username':1234}, noop );
	}
});

tape( 'function throws if not provided either a username or token', function test( t ) {
	t.throws( foo, Error, 'requires either a username or token or both' );
	t.end();

	function foo() {
		factory( {'useragent':'beep'}, noop );
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

tape( 'function returns a function which returns an error to a provided callback if an error is encountered when fetching user repos', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'@kgryte/github-get': {
			'factory': get
		}
	});

	opts = getOpts();
	fcn = factory( opts, done );
	fcn();

	function get( opts, clbk ) {
		return function get() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk({
					'status': 404,
					'message': 'beep'
				});
			}
		};
	}

	function done( error ) {
		t.equal( error.status, 404, 'equal status' );
		t.equal( error.message, 'beep', 'equal message' );
		t.end();
	}
});

tape( 'function returns a function which returns response data to a provided callback', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'@kgryte/github-get': {
			'factory': get
		}
	});

	expected = data;

	opts = getOpts();
	fcn = factory( opts, done );
	fcn();

	function get( opts, clbk ) {
		return function get() {
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

tape( 'function returns a function which returns rate limit info to a provided callback', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'@kgryte/github-get': {
			'factory': get
		}
	});

	expected = info;

	opts = getOpts();
	fcn = factory( opts, done );
	fcn();

	function get( opts, clbk ) {
		return function get() {
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

tape( 'function returns a function which supports providing only a `username` option (no authentication)', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'@kgryte/github-get': {
			'factory': get
		}
	});

	expected = data;

	opts = getOpts();
	delete opts.token;

	fcn = factory( opts, done );
	fcn();

	function get( opts, clbk ) {
		return function get() {
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

tape( 'function returns a function which supports providing only a `token` option (get the authenticated user\'s associated repos)', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'@kgryte/github-get': {
			'factory': get
		}
	});

	expected = data;

	opts = getOpts();
	delete opts.username;

	fcn = factory( opts, done );
	fcn();

	function get( opts, clbk ) {
		return function get() {
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

tape( 'function returns a function which supports providing both `token` and `username` options (increased rate limits)', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'@kgryte/github-get': {
			'factory': get
		}
	});

	expected = data;

	opts = getOpts();
	opts.token = 'boopbeep';
	opts.username = 'kgryte';

	fcn = factory( opts, done );
	fcn();

	function get( opts, clbk ) {
		return function get() {
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

tape( 'function returns a function which supports specifying various query parameters', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'@kgryte/github-get': {
			'factory': get
		}
	});

	expected = data;

	opts = getOpts();
	opts.type = 'owner';
	opts.sort = 'created';
	opts.direction = 'asc';

	fcn = factory( opts, done );
	fcn();

	function get( opts, clbk ) {
		t.equal( opts.query, 'type=owner&sort=created&direction=asc', 'supports query parameters' );
		return function get() {
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
