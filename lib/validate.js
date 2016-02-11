'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {String} [options.token] - Github access token
* @param {String} [options.username] - Github username
* @param {String} [options.type] - repository type
* @param {String} [options.sort] - sort method
* @param {String} [options.direction] - sort direction
* @param {String} [options.visibility] - repository visibility (requires token)
* @param {String} [options.affiliation] - repository affiliation (requires token)
* @param {String} [options.useragent] - user agent string
* @param {Object} options - options to validate
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'token' ) ) {
		opts.token = options.token;
		if ( !isString( opts.token ) ) {
			return new TypeError( 'invalid option. Token option must be a string primitive. Option: `' + opts.token + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'username' ) ) {
		opts.username = options.username;
		if ( !isString( opts.username ) ) {
			return new TypeError( 'invalid option. Username option must be a string primitive. Option: `' + opts.username + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'type' ) ) {
		opts.type = options.type;
		if ( !isString( opts.type ) ) {
			return new TypeError( 'invalid option. Type option must be a string primitive. Option: `' + opts.type + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sort' ) ) {
		opts.sort = options.sort;
		if ( !isString( opts.sort ) ) {
			return new TypeError( 'invalid option. Sort option must be a string primitive. Option: `' + opts.sort + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'direction' ) ) {
		opts.direction = options.direction;
		if ( !isString( opts.direction ) ) {
			return new TypeError( 'invalid option. Direction option must be a string primitive. Option: `' + opts.direction + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'visibility' ) ) {
		opts.visibility = options.visibility;
		if ( !isString( opts.visibility ) ) {
			return new TypeError( 'invalid option. Visibility option must be a string primitive. Option: `' + opts.visibility + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'affiliation' ) ) {
		opts.affiliation = options.affiliation;
		if ( !isString( opts.affiliation ) ) {
			return new TypeError( 'invalid option. Affiliation option must be a string primitive. Option: `' + opts.affiliation + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'useragent' ) ) {
		opts.useragent = options.useragent;
		if ( !isString( opts.useragent ) ) {
			return new TypeError( 'invalid option. User agent option must be a string primitive. Option: `' + opts.useragent + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
