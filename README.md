## simpleStore
**A simple state management for React.**


### Install
```
$ npm install skshetry/simplestore
```

### Development
1. `npm install --dev` to install dependencies
2. `npm run test`
3. `npm run init` to create a `dist` folder
4. `npm run build`
5. `npm run clean` to remove `dist` folder


### Why
React(>=16.0) provides a [context API](https://reactjs.org/docs/context.html) that provides access to data without prop-drilling to the nested components. But, on large projects, to provide access to other part of the app that is not the child, Redux is used.

However for small usages, this may seem overkill.

`simpleStore` is basically a global object that can be used on small-to-medium scales. It provides simple API for [accessing(`get`) and storing data(`set`) on the `store`](#readingchanging-data). Any changes/updates to the data propagates to the `connected` components ([connected using `connect()`](#connecting-to-the-store) which on later changes will call component's `setState`). 


### Creating store
**Store(*key[, callback]*)**

A key has to be passed to the `Store` which will be used to set the state on the components later with the same key. At the first, the data is set `undefined`. 

```js
import Store from 'simplestore';

const fruitStore = Store('fruits');

// can even send a callback during creation
const toDoStore = Store('todos', () => {
    initialize_todos(); 
    // something, something here
})
```


### Reading/Changing data
**set(*data*)** / **get( )**

`get` returns the copy of the data in the store. 

`set` is async function that sets/overrides data and then returns new data after propagating new changes to the `connected` components. The `data` should not be mutated as doing this, the change will not propagate. 

```js
fruitStore.get() == undefined;
// true; undefined at first

fruitStore.set([
    'apple', 'mango', 'guava', 'litchi'
]);

fruitStore.set([
    'apples', 'mangoes'
]).then( data => {
    console.log('Fruits updated', data)
});

// ...  later
fruitStore.get(); //'apple', 'mango', 'guava', 'litchi'
```


### Connecting to the Store
**connect(*component[, callback]*)** / **disconnect(*component*)**

`connect` should receive `this`(the React component itself) that will later be used to propagate the changes. On data `set`, `setState` of all the components are called with the data in store with the `key` used before on initialiation.

`disconnect` should also receive `this` that will disconnect it from any future changes to the store. It is an async function.

```js
// ... Inside a react component
fruitStore.connect(this);

// can even receive a callback
fruitStore.connect(this, () => {
    console.log('I will now receive any',
                'changes made to the store.');
});

/// later, if you don't require it
fruitStore.disconnect(this);

/// with then()
fruitStore.disconnect(this).then(
    console.log('I won\'t be called now.');
)
```


### Getting list of connections to a store
**connections( )**

Provides a list of connections to the store.

```js
fruitStore.connections();
```

### Get other stores
**list(*[key]*)**

Is a static function. If key is passed, this provides the instance having the key. If the store with the key doesn't exist, it will return `undefined`. If key isn't passed, this will return all the instances.

```js
Store.list()

Store.list('fruits')
// fruitStore
```


### Knowing key of the store for whatever reasons
*key*

```js
fruitStore.key;
// 'fruits'
```


## License
MIT

