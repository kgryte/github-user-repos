'use strict';

/**
* FUNCTION: query( opts )
*	Returns a query string based on provided options.
*
* @param {String} [opts.type] - repository type
* @param {String} [opts.sort] - sort method
* @param {String} [opts.direction] - sort direction
* @param {String} [opts.visibility] - repository visibility
* @param {String} [opts.affiliation] - repository affiliation
* @returns {String} query string
*/
function query( opts ) {
	var qs = [];
	if ( opts.type ) {
		qs.push( 'type='+opts.type );
		delete opts.type;
	} else {
		if ( opts.visibility ) {
			qs.push( 'visibility='+opts.visibility );
			delete opts.visibility;
		}
		if ( opts.affiliation ) {
			qs.push( 'affiliation='+opts.affiliation );
			delete opts.affiliation;
		}
	}
	if ( opts.sort ) {
		qs.push( 'sort='+opts.sort );
		delete opts.sort;
	}
	if ( opts.direction ) {
		qs.push( 'direction='+opts.direction );
		delete opts.direction;
	}
	return qs.join( '&' );
} // end FUNCTION query()


// EXPORTS //

module.exports = query;