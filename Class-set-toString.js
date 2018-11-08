function Set() {          // This is the constructor
    this.values = {};     // The properties of this object hold the set
    this.n = 0;           // How many values are in the set
    this.add.apply(this, arguments);  // All arguments are values to add
}
// Add each of the arguments to the set.
Set.prototype.add = function() {
    for(var i = 0; i < arguments.length; i++) {  // For each argument
        var val = arguments[i];                  // The value to add to the set
        var str = Set._v2s(val);                 // Transform it to a string
        if (!this.values.hasOwnProperty(str)) {  // If not already in the set
            this.values[str] = val;              // Map string to value
            this.n++;                            // Increase set size
        }
    }
    return this;                                 // Support chained method calls
};
// Remove each of the arguments from the set.
Set.prototype.remove = function() {
    for(var i = 0; i < arguments.length; i++) {  // For each argument
        var str = Set._v2s(arguments[i]);        // Map to a string
        if (this.values.hasOwnProperty(str)) {   // If it is in the set
            delete this.values[str];             // Delete it
            this.n--;                            // Decrease set size
        }
    }
    return this;                                 // For method chaining
};
// Return true if the set contains value; false otherwise.
Set.prototype.contains = function(value) {
    return this.values.hasOwnProperty(Set._v2s(value));
};
// Return the size of the set.
Set.prototype.size = function() { return this.n; };
// Call function f on the specified context for each element of the set.
Set.prototype.foreach = function(f, context) {
    for(var s in this.values)                 // For each string in the set
        if (this.values.hasOwnProperty(s))    // Ignore inherited properties
            f.call(context, this.values[s]);  // Call f on the value
};
// This internal function maps any JavaScript value to a unique string.
Set._v2s = function(val) {
    switch(val) {
        case undefined:     return 'u';          // Special primitive
        case null:          return 'n';          // values get single-letter
        case true:          return 't';          // codes.
        case false:         return 'f';
        default: switch(typeof val) {
            case 'number':  return '#' + val;    // Numbers get # prefix.
            case 'string':  return '"' + val;    // Strings get " prefix.
            default: return '@' + objectId(val); // Objs and funcs get @
        }
    }
  }
  
function extend(o, p) {
    for(prop in p) {                         // For all props in p.
        o[prop] = p[prop];                   // Add the property to o.
    }
    return o;
}  
  
// Add these methods to the Set prototype object.
extend(Set.prototype, {
           // Convert a set to a string
           toString: function() {
               var s = "{", i = 0;
               this.foreach(function(v) { s += ((i++ > 0)?", ":"") + v; });
               return s + "}";
           },
           // Like toString, but call toLocaleString on all values
           toLocaleString : function() {
               var s = "{", i = 0;
               this.foreach(function(v) {
                                if (i++ > 0) s += ", ";
                                if (v == null) s += v; // null & undefined
                                else s += v.toLocaleString(); // all others
                            });
               return s + "}";
           },
           // Convert a set to an array of values
           toArray: function() {
               var a = [];
               this.foreach(function(v) { a.push(v); });
               return a;
           }
       });
       
var set_o = new Set;

set_o.toString();         