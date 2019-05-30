# flatten-dependencies
Make some of your npm dependencies singletons

## Description
When doing `npm install`, packages can get installed multiple times depending on the dependencies of your dependencies. For packages such as `react` or `graphql` this causes problems and since `npm` doesn't provide a way to force a package to be a singleton, we've written this tool to removes all the extra versions of the package.

Just make sure to add the version you actually want to keep in `dependencies` part of the package.json.

## Installation instructions
```
  npm install flatten-dependencies --save-dev
```

## Usage instructions
```
npx flatten-dependencies graphql
```
... or to turn multiple packages into singletons ...
```
npx flatten-dependencies graphql react @types/react
```

## Usage suggestion
Just add the a call to this script into the `postinstall` part of the `package.json`:
```
....
"scripts": {
  ...
  "postinstall: "flatten-dependencies graphql react @types/react"
  ...
}
...
```
