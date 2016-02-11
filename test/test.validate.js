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

tape( 'if provided a `username` option which is not a primitive string, the function returns a type error', function test( t ) {
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
			'username': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `type` option which is not a primitive string, the function returns a type error', function test( t ) {
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
			'type': values[i]
		});
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
			'useragent': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `sort` option which is not a primitive string, the function returns a type error', function test( t ) {
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
			'sort': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `direction` option which is not a primitive string, the function returns a type error', function test( t ) {
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
			'direction': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `visibility` option which is not a primitive string, the function returns a type error', function test( t ) {
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
			'visibility': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided an `affiliation` option which is not a primitive string, the function returns a type error', function test( t ) {
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
			'affiliation': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'the function returns `null` if all options are valid', function test( t ) {
	var err;

	err = validate( {}, {
		'token': 'abcdefg',
		'username': 'kgryte',
		'type': 'forks',
		'useragent': 'beeper-booper',
		'sort': 'full_name',
		'direction': 'desc',
		'visibility': 'all',
		'affiliation': 'owner,collaborator,organization_member'
	});
	t.equal( err, null, 'returns null' );

	t.end();
});

tape( 'the function will ignore unrecognized options', function test( t ) {
	var err;

	err = validate( {}, {
		'beep': 'boop',
		'a': 5,
		'b': null,
		'c': 'woot'
	});
	t.equal( err, null, 'returns null' );

	t.end();
});
