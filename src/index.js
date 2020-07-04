#!/usr/bin/env node
import glob from 'glob'
import path from 'path'
import rimraf from 'rimraf'
import fs from 'fs'
import appRootDir from 'app-root-dir'

function forceFlatDependency(name){
  if (!fs.existsSync(`node_modules/${name}/package.json`)){
    throw new Error(`Singleton dependency ${name} must be explicitly added to package.json dependencies`)
  }
  const extraDependencies = glob.sync(`node_modules/**/node_modules/${name}/package.json`)
  for(const dependency of extraDependencies){
    const dirToDelete = path.dirname(dependency)
    console.log('Dependency deleted', dirToDelete)
    rimraf.sync(dirToDelete);
  }
}

const packagePath = path.join(appRootDir.get(), 'package.json')
if (!fs.existsSync(packagePath)){
  throw new Error('flatten-dependencies must be called from node/npm project')
}
const [node, script, ...singletons] = process.argv;

if(!Array.isArray(singletons)){
  throw new Error('Usage: flatten-dependencies package1 package2 ...')
}
console.log('Flattening dependencies....')
for(const singleton of singletons){
  forceFlatDependency(singleton)
}
console.log('Dependencies flattened.')
