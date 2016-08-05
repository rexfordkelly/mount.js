const mount = require('./mount');
	
    
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
  var s = mount(r).name(function(name){ return name }); // explicit return value "JOHN DOE"

      console.log(s)
