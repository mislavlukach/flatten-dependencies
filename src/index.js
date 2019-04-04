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
const { singletons } = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
if(!Array.isArray(singletons)){
  throw new Error('package.json must have singletons key')
}
console.log('Flatting dependencies....')
for(const singleton of singletons){
  forceFlatDependency(singleton)
}
console.log('Dependencies flattened.')
