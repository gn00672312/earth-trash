/*
 CB Library
 (c) 2014-, CloudyBay Information
*/
(function (window, document, undefined) {
var oldCB = window.CB,
    CB = {};

CB.version = '0.1';

// define CB for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = CB;
// define CB as an AMD module
} else if (typeof define === 'function' && define.amd) {
    define(CB);
}

// define a global CB variable, saving the original CB to restore later if needed
CB.noConflict = function () {
    window.CB = oldCB;
    return this;
};

window.CB = CB;


/**
 * Claim an empty CB.console, CB.console is be defined in cb.common and will
 * be initialized after document has loaded. Thus, if console was called before
 * that, print out warning message.
 * @private
 */
var _claim_method = function(){
    if (window.console) {
        console.log("CB.console has not initialized");
    }
};
CB.console = {
    log: _claim_method,
    error: _claim_method,
    info: _claim_method,
    warn: _claim_method,
    dir: _claim_method
};


}(window, document));

/**
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 * Inspired by base2 and Prototype
 */
/**
 *  exp:
 *     // define a class
 *     var Person = Class.extend({
 *         init: function( argv ){
 *             // code while init in calling 'new'
 *         },
 *         .... // other features
 *     });
 *
 *     // define an new class inherit from other class
 *     var Ninja = Person.extend({
 *         init: function(){
 *             this._super( argv );
 *         },
 *     });
 **/
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();
