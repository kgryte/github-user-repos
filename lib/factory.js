'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var merge = require( 'utils-merge2' );
var request = require( '@kgryte/github-get' ).factory;
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var query = require( './query.js' );


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for fetching meta data for repositories associated with a user.
*
* @param {Object} options - function options
* @param {String} [options.token] - Github access token
* @param {String} [options.username] - Github username
* @param {String} [options.type] - repository type
* @param {String} [options.sort] - sort method
* @param {String} [options.direction] - sort direction
* @param {String} [options.visibility] - repository visibility (requires token)
* @param {String} [options.affiliation] - repository affiliation (requires token)
* @param {String} [options.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for getting repository meta data
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = merge( {}, defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	if (
		opts.token === void 0 &&
		opts.username === void 0
	) {
		throw new Error( 'invalid input argument. Must provide a username or, to get an authenticated user\'s repository meta data, an access token.' );
	}
	if ( opts.username ) {
		opts.pathname = '/users/'+opts.username;
	} else {
		opts.pathname = '/user';
	}
	opts.pathname += '/repos';
	opts.query = query( opts );

	return request( opts, done );
	/**
	* FUNCTION: done( error, data, info )
	*	Callback invoked after resolving resources.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Object[]} data - query data
	* @param {Object} info - response info
	* @returns {Void}
	*/
	function done( error, data, info ) {
		error = error || null;
		data = data || null;
		info = info || null;
		clbk( error, data, info );
	} // end FUNCTION done()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
