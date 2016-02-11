'use strict';

// MODULES //

var factory = require( './factory.js' );


// REPOS //

/**
* FUNCTION: repos( opts, clbk )
*	Gets meta data for repositories associated with a user.
*
* @param {Object} opts - function options
* @param {String} [opts.token] - Github access token
* @param {String} [opts.username] - Github username
* @param {String} [opts.type] - repository type
* @param {String} [opts.sort] - sort method
* @param {String} [opts.direction] - sort direction
* @param {String} [opts.visibility] - repository visibility (requires token)
* @param {String} [opts.affiliation] - repository affiliation (requires token)
* @param {String} [opts.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function repos( opts, clbk ) {
	factory( opts, clbk )();
} // end FUNCTION repos()


// EXPORTS //

module.exports = repos;
