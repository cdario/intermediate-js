// 1. Constructing Date instances.
//
// Make sure to use "new Date", not "Date" when instantiating.
//

var year = 2000;
var month = 02;
var day = 29;
var hour = 12;
var minute = 30;
var second = 15;
var millisecond = 93;
var milliseconds_since_jan_1_1970 = 86400 * 10 * 1000;
var iso_timestamp = '2003-05-23T17:00:00Z';
var dt0 = Date(); // BAD - just a string, not a Date instance
var dt1 = new Date(); // GOOD - a real Date instance using new
var dt2 = new Date(milliseconds_since_jan_1_1970);
var dt3 = new Date(iso_timestamp);
var dt4 = new Date(year, month, day);
var dt5 = new Date(year, month, day, hour, minute, second, millisecond);

/*
> dt1
Mon Aug 05 2013 07:19:45 GMT-0700 (PDT)
> dt2
Sat Jan 10 1970 16:00:00 GMT-0800 (PST)
> dt3
Fri May 23 2003 10:00:00 GMT-0700 (PDT)
> dt4
Wed Mar 29 2000 00:00:00 GMT-0800 (PDT)
> dt5
Wed Mar 29 2000 12:30:15 GMT-0800 (PDT)
*/

// 2. Date classmethods - these return milliseconds, not Date instance
// now: gives number of milliseconds since Jan 1, 1970 00:00 UTC

var milliseconds_per_year = (86400 * 1000 * 365);
var years_from_epoch = function(ms) {
    console.log(Math.floor(ms/milliseconds_per_year));
};

years_from_epoch(Date.now()); // 43

// parse: takes in ISO timestamp and returns milliseconds since epoch
years_from_epoch(Date.parse('2003-05-23T17:00:00Z')); // 33

// UTC: Constructor that returns milliseconds since epoch
years_from_epoch(Date.UTC(year, month, day, hour, minute,second, millisecond)); // 30


// 3. Date Examples
// 3.1 - Calculating the difference between two dates
console.log(dt3); // Fri May 23 2003 10:00:00 GMT-0700 (PDT)
console.log(dt4); // Wed Mar 29 2000 00:00:00 GMT-0800 (PDT)
var ddt = dt3 - dt4;
var ddt2 = dt3.getTime() - dt4.getTime();
console.log(ddt); // 99392400000
console.log(ddt2); // 99392400000
console.log(ddt / milliseconds_per_year); // 3.151712328767123

// 3.2 - Get JSON data, parsing strings into Date instances,
// and then return docs structure.
var data2docs = function(data) {
    var docs = [];
    var offset = 'T12:00:00-05:00'; // Explicitly specify time/timezone.
    var dt, ii, dtnew;
    for(ii = 0; ii < data.results.length; ii += 1) {
	dt = data.results[ii].publication_date; // looks like: '2012-12-14'
	dti = new Date(dt + offset);
	docs.push({'title':data.results[ii].title, 'publication_date': dti});
    }
    return docs;
};

var docs2console = function(docs) {
    for(var ii = 0; ii < docs.length; ii++) {
	doc = docs[ii];
	console.log('Date: %s\nTitle: %s\n', doc.publication_date, doc.title);
    }
};

var apiurl = "https://www.federalregister.gov/api/v1/articles/" +
"03-12969,2012-30312,E8-24781.json?fields%5B%5D=title" +
"&fields%5B%5D=publication_date";

var request = require('request'); // npm install request
var printdata = function(apiurl) {
    request(apiurl, function (error, response, body) {
	if (!error && response.statusCode == 200) {
	    data = JSON.parse(body);
	    docs2console(data2docs(data));
	}
    });
};

/* This produces the following output:
Date: Fri May 23 2003 10:00:00 GMT-0700 (PDT)
Title: National Security Agency/Central Security Service (NSA/CSS) Freedom of Information 

Date: Fri Dec 14 2012 09:00:00 GMT-0800 (PST)
Title: Human Rights Day and Human Rights Week, 2012
Date: Mon Oct 20 2008 10:00:00 GMT-0700 (PDT)
Title: Tarp Capital Purchase Program

*/
