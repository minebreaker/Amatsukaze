# Amatsukaze

Thin wrapper of Immutable.js, for slightly happier TypeScript development.


## Why

### Plain object

* Not immutable
* Verbose API (`Object.assign()`, `Object.freeze()`...)


### `Map`

* Values must have a same type (if you use standard type definitions)


### `Record`

* Mandatory defaults suck
* You cannot add additional properties. Must declare every single `Record`s with tiny differences you may use.

    * Amatsukaze leverages TypeScript duck typing
