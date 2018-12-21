'use strict';

var readPkgUp = require('read-pkg-up');

var defaultOptions = {
  protocol: 'https',
  hostname: 'api.github.com',
  port: 443,
  pathname: '/',
  method: 'POST',
  useragent: 'https://github.com/kgryte/github-create-repo',
  accept: 'application/vnd.github.v3+json',
  org: '',
  team: null,
  name: null,
  license: null,
  desc: '',
  homepage: '',
  private: false,
  issues: true,
  wiki: true,
  downloads: true,
  init: false,
  inferFromPackageJson: true
};

module.exports = function getDefaults(options) {
	var opt = Object.assign({inferFromPackageJson: true}, options);

  if (opt.inferFromPackageJson) {
    var data = readPkgUp.sync({ normalize: false });
    var pkg = data && data.pkg;

    if (pkg) {
      if (!opt.desc) {
        opt.desc = pkg.description;
      }
      if (!opt.name) {
        opt.name = pkg.name;
      }
      if (!opt.homepage) {
        opt.homepage = pkg.homepage;
      }
      if (typeof opt.private === 'undefined' && typeof pkg.private !== 'undefined') {
        opt.private = pkg.private;
      }
      if (!opt.license) {
        opt.license = pkg.license;
      }
    }
  }

  opt = Object.assign({}, defaultOptions, opt);
  return opt;
};
