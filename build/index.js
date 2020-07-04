#!/usr/bin/env node
"use strict";

var _glob = _interopRequireDefault(require("glob"));

var _path = _interopRequireDefault(require("path"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _fs = _interopRequireDefault(require("fs"));

var _appRootDir = _interopRequireDefault(require("app-root-dir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function forceFlatDependency(name) {
  if (!_fs.default.existsSync(`node_modules/${name}/package.json`)) {
    throw new Error(`Singleton dependency ${name} must be explicitly added to package.json dependencies`);
  }

  const extraDependencies = _glob.default.sync(`node_modules/**/node_modules/${name}/package.json`);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = extraDependencies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const dependency = _step.value;

      const dirToDelete = _path.default.dirname(dependency);

      console.log('Dependency deleted', dirToDelete);

      _rimraf.default.sync(dirToDelete);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

const packagePath = _path.default.join(_appRootDir.default.get(), 'package.json');

if (!_fs.default.existsSync(packagePath)) {
  throw new Error('flatten-dependencies must be called from node/npm project');
}

const _process$argv = _toArray(process.argv),
      node = _process$argv[0],
      script = _process$argv[1],
      singletons = _process$argv.slice(2);

if (!Array.isArray(singletons)) {
  throw new Error('Usage: flatten-dependencies package1 package2 ...');
}

console.log('Flattening dependencies....');
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = singletons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    const singleton = _step2.value;
    forceFlatDependency(singleton);
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

console.log('Dependencies flattened.');