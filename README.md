## Mount 2.0
Rewritten from scratch to improve and simplify the API and behavior
of mounted objects.

## Mount.js
Mount is a utility function to make working with values chainable and
more Functional in style.

Mount will turn any inputs into a store object who's properties are 
accessor methods, that accept callbacks.

Each callback will be passed a standard set of arugments.

  value:  the value of the prop of the original input.
  label:  the prop by which one can access the value in the Store.
  Store:  the mountStore which holds all the values, and their Accessor Functions.
  Input:  the original source input, as it was passed in when mounted.

Accessor Functions will return whatever your callback explicitly returns,
or the instance of mountStore if undefined is returned.

##Examples:

```
/** ======================================
   Mounting Primatives
======================================= **/

var s = 'john doe, null';
mount( s, 'name').name(function(name, i, store, original, order ){
    if( !!parseInt(store[1](store.val) )){
        console.log( name + ' is ' + store[1](store.val) + ' years old')
    } else {
        console.log( 'please have ' + name + ' record his age' )
    }
}) 

/** ======================================
   Mounting Objects
======================================= **/
var o = { name: "john doe", age: 22 };
mount(o).name(function(name){
  console.log('the user\'s name is ' + name );
}) 

/** ======================================
   Mounting Arrays
======================================= **/
var a = ['john doe', 22 ];
mount(a)[0](function(name){
  console.log('Welcome back ' + name);
})

// mapTo
var a = ['john doe', 22 ];
mount(a)[0](function(name){
  console.log('Welcome back ' + name);
})
    
/** ======================================
   Remounting Mounted Stores
======================================= **/

var o = { name: "john doe", age: 22 };
var r = mount(o).name((name, prop, store) => { store[prop] = name.toUpperCase(), undefined; } ),
    s = mount(r).age(function(age, prop, store){ store[prop] = ++age; return age })

// Maping Arrays or Strings to a template object.
var a = ['john doe', 22 ],
    d = mount(a).mapTo({name: 0, age: 1}).name(function(name){console.log(name)});
    
/** ======================================
   Numbers & the rest of the primatives.
======================================= **/

var p = mount(22)
    q = mount(p);

var n = q.val(function(v, k, s){ s[k]++; })
         .val(function(v, k, s){ s[k] += 99; })
         .val();

```
