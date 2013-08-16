// Important Array global methods
// length

var log = console.log;
var foo = [1, 2, 3, 3, 6, 2, 0];
log(foo.length); // 7

// concat: create new array

var bar = [4, 5, 6];
var baz = foo.concat(bar);
log(foo); // [ 1, 2, 3, 3, 6, 2, 0 ]
log(bar); // [ 4, 5, 6 ]
log(baz); // [ 1, 2, 3, 3, 6, 2, 0, 4, 5, 6 ]

// push/unshift to add to end/beginning
foo.push(10);
foo.unshift(99);
log(foo); // [ 99, 1, 2, 3, 3, 6, 2, 0, 10 ]

// pop/shift to remove the last/first element
var last = foo.pop();
var first = foo.shift();
log(last); // 10
log(first); // 99
log(foo); // [ 1, 2, 3, 3, 6, 2, 0 ]

// join: combine elements in an array into a string
log('<tr><td>' + bar.join('</td><td>') + "</td></tr>");
// <tr><td>4</td><td>5</td><td>6</td></tr>

// slice: pull out a subarray
var ref = foo.slice(3, 6);
log(ref); // [ 3, 6, 2 ]
log(foo); // [ 1, 2, 3, 3, 6, 2, 0 ]
ref[0] = 999;
log(ref); // [ 999, 6, 2 ]
log(foo); // [ 1, 2, 3, 3, 6, 2, 0 ]

// reverse: MODIFIES IN PLACE
foo.reverse();
log(foo); // [ 0, 2, 6, 3, 3, 2, 1 ]
foo.reverse();
log(foo); // [ 1, 2, 3, 3, 6, 2, 0 ]

// sort: MODIFIES IN PLACE
foo.sort();
log(foo); // [ 0, 1, 2, 2, 3, 3, 6 ]

// inhomogeneous types work
var arr = [99, 'mystr', {'asdf': 'alpha'}];

// JS will do the best it can if you invoke default methods.
// So make sure to use the REPL if you're doing something exotic.
arr.sort();
log(arr); // [ 99, { asdf: 'alpha' }, 'mystr' ]
arr.join(','); // '99,[object Object],mystr'

// Be very careful in particular when working with inhomogeneous arrays that
// contain objects. Methods like slice will not do deep copies, so modifications
// of the new array can propagate back to the old one when dealing with objects.

var newarr = arr.slice(0, 2);
console.log(newarr); // [ 99, { asdf: 'alpha' } ]
console.log(arr); // [ 99, { asdf: 'alpha' }, 'mystr' ]
newarr[1].asdf = 'ooga';
console.log(newarr); // [ 99, { asdf: 'ooga' } ]
console.log(arr); // [ 99, { asdf: 'ooga' }, 'mystr' ]
