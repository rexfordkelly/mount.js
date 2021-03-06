/**
    
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
  or the instance of mountStore.fx if undefined is returned.
  
*/
function mount( input, label ){
  // will automaticly remount a previously instantiated Store.
  if( input && input.isMounted ) return input;
  
  /**  Prototype Methods **/
  
  function mountStore(){
    this.values = {};
    this.fx = new mountFx();
  }
  
  function mountFx(){}
  mountFx.prototype.mapTo = function( map, stub ){
                                if( map.length !== Store.values.length ) return false;
                                stub = stub || {};
                                for( var key in map ){ stub[key] = Store.values[map[key]]; }
                                return mount( stub );
                              }
  mountFx.prototype.isMounted = true;

  mountFx.prototype.has = function( prop, found, missing ){
                            if( Store[prop] ){
                              return found && found( Store.values[label], Store.values, Store.mount, label, input ) || Store.fx;
                            } else {
                              return missing && missing( Store.values[label], Store.values, Store.mount, label, input ) || Store.fx;
                            }
                         }
  mountFx.prototype.hasNot = function(prop, missing, found){
                                return Store.fx.has( prop, found, missing );
                             }

  mountStore.prototype.mount = function(value, label){ 
                                Store.values[label] = value;
                                Store.fx[label] = function(callback){
                                  return callback && callback( Store.values[label], Store.values, Store.mount, label, input ) || Store.fx;
                                }
                              }
  
  /** Store Instantiation Process **/

  var Store = new mountStore(),
      tmp = undefined; 
        
  // Process any raw input

  if( input ) {
    // Arrays
    if( Array.isArray(input) ){
        input.forEach(function(val, i){
          Store.mount(val, i);
        })
    } else { // Objects...
      if( input && typeof input === 'object' ) {
        Object.keys(input).forEach(function(prop){
           Store.mount( input[prop], prop );
        })
      } else {
        // We will wrap the input into an object, then 
        // recurse to return a mounted object.
        var tmp = {};
            tmp[label] = input;
        return mount(tmp);
      } 
    }
  } else {
     return false;
  }
  return Store.fx; 
}


module.exports = mount;