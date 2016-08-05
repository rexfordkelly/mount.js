## Mount 2.0
Rewritten from scratch to improve and simplify the API and behavior
of mounted objects.

## Mount.js
Mount is a utility function to make working with values chainable and
more Functional in style.

Mount will turn any inputs into a store object who's properties are 
accessor methods, that accept callbacks.

Each callback will be passed a standard set of arugments.

  - Value:  the value of the prop of the original input.
  - Store:  the mountStore which holds all the values, and their Accessor Functions.
  - Mount:  a helper function to add additional values to the mountStore.
  - Prop:  the prop by which one can access the value in the Store.
  - Input:  the original source input, as it was passed in when mounted.

Accessor Functions will return whatever your callback explicitly returns,
or the instance of mountStore if undefined is returned.

##Examples:

```


/** ======================================
   Mounting Primatives
======================================= **/

// Strings
  var s = 'john doe';
      m = mount( s, 'name')
           .name(function( name, store, mount, prop, input ){
              mount(32, 'age'), console.log( 'Welcome back ' + name );
            })
            .age(function(age){
              console.log(age)
            });
    
/** ======================================
   Mounting Objects
======================================= **/

  var o = { name: "john doe", age: 22 },
      m = mount(o)
            .name(function( name, store, mount, prop, input ){
               console.log('the user\'s name is ' + name + ' and he is ' + store.age + ' years old' );
            }); 

/** ======================================
   Mounting Arrays
======================================= **/

  var a = ['john doe', 22 ];
      m = mount(a)[0](function( name, store, mount, prop, input ){
            console.log('Welcome back ' + name);
          })

// mapTo
      
  var a = ['john doe', 22 ];
      m = mount(a)
            .mapTo({name: 0, age: 1})
            .name(function(name, person){ console.log( 'hello ' + name + ', your age is ' + person.age )})

/** ======================================
   Remounting Mounted Stores
======================================= **/

  var o = { name: "john doe", age: 22 };
  var r = mount(o).name((name, person ) => { person.name = name.toUpperCase() } );
  var s = mount(r).name(function(name){ return name }); // explicit return value "JOHN DOE" returned

      console.log(s) // "JOHN DOE"


```
