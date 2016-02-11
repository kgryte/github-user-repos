'use strict';

// MODULES //

var tape = require( 'tape' );
var repos = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof repos, 'function', 'main export is a function' );
	t.end();
});

tape( 'module exports a factory method', function test( t ) {
	t.equal( typeof repos.factory, 'function', 'export includes a factory method' );
	t.end();
});
