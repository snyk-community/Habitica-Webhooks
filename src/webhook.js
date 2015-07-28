let config = require('./config');
let _ = require('lodash');

let getWatchedFiles = (body) => {
  let addedFiles = _getNewFiles(body.commits);
  let watchedFiles = _filterOutUnwatchedFiles(addedFiles);

  return watchedFiles;
}

var verifyBranch = (ref) => {
  let branchToCheck = config.get('GITHUB_BRANCH_TO_WATCH');
  let refToCheck = `refs/heads/${branchToCheck}`;

  return ref === refToCheck;
}

var _getNewFiles = (commits) => {
  let files = _.pluck(commits, 'added');
  let flattenedFiles = _.flatten(files);
  let uniqFiles = _.uniq(flattenedFiles);

  return uniqFiles;
}

var _filterOutUnwatchedFiles = (files) => {
  let watchedDirectories = config.get('GITHUB_WATCHED_DIRECTORIES');
  console.log("DIRECTORIES TO WATCH");
  console.log(watchedDirectories);
  console.log("*************************");

  let watchedFiles = _(watchedDirectories).map((path) => {
    let contains = _.filter(files, (file) => {
      return _.startsWith(file, path);
    });

    console.log("CONTAINS");
    console.log(contains);
  console.log("*************************");
    return contains;
  }).value();

  console.log("WATCHED FILES");
  console.log(watchedFiles);
  console.log("*************************");

  let flattenedFiles = _.flatten(watchedFiles);
  console.log("FLATTEND");
  console.log(flattenedFiles);

  return flattenedFiles;
};

module.exports = {
  getWatchedFiles: getWatchedFiles,
  verifyBranch: verifyBranch
}
