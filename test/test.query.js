'use strict';

// MODULES //

var tape = require( 'tape' );
var query = require( './../lib/query.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof query, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function supports inlining a `type` param', function test( t ) {
	var qs = query({'type':'all'});
	t.equal( qs, 'type=all', 'inlines type param' );
	t.end();
});

tape( 'the function supports inlining a `sort` param', function test( t ) {
	var qs = query({'sort':'full_name'});
	t.equal( qs, 'sort=full_name', 'inlines sort param' );
	t.end();
});

tape( 'the function supports inlining a `direction` param', function test( t ) {
	var qs = query({'direction':'desc'});
	t.equal( qs, 'direction=desc', 'inlines direction param' );
	t.end();
});

tape( 'the function supports inlining a `visibility` param', function test( t ) {
	var qs = query({'visibility':'public'});
	t.equal( qs, 'visibility=public', 'inlines visibility param' );
	t.end();
});

tape( 'the function supports inlining an `affiliation` param', function test( t ) {
	var qs = query({'affiliation':'owner'});
	t.equal( qs, 'affiliation=owner', 'inlines affiliation param' );
	t.end();
});

tape( 'if provided a `type` option, the function ignores `visibility` and `affiliation` params', function test( t ) {
	var opts;
	var qs;

	opts = {
		'type': 'all',
		'visibility': 'public',
		'affiliation': 'owner'
	};
	qs = query( opts );

	t.equal( qs, 'type=all', 'ignores visibility and affiliation options' );
	t.end();
});

tape( 'the function returns a query string', function test( t ) {
	var expected;
	var opts;
	var qs;

	opts = {
		'type': 'all',
		'sort': 'full_name',
		'direction': 'desc'
	};
	qs = query( opts );

	expected = 'type=all&sort=full_name&direction=desc';
	t.equal( qs, expected, 'returns '+expected );

	opts = {
		'visibility': 'private',
		'affiliation': 'collaborator',
		'sort': 'full_name',
		'direction': 'desc'
	};
	qs = query( opts );

	expected = 'visibility=private&affiliation=collaborator&sort=full_name&direction=desc';
	t.equal( qs, expected, 'returns '+expected );

	t.end();
});
