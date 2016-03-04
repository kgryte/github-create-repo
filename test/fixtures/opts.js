'use strict';

function getOpts() {
	var opts = {
		'token': 'abcdef',
		'hostname': 'api.github.com',
		'port': 443,
		'protocol': 'https',
		'org': '',
		'team': 1,
		'desc': 'beep',
		'homepage': 'https://github/kgryte',
		'private': false,
		'issues': true,
		'wiki': true,
		'downloads': true,
		'init': false
	};
	return opts;
}


// EXPORTS //

module.exports = getOpts;
