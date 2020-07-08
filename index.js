const lineReader = require('line-reader');
const utils = require('./utils');
var sql = require('./connection');

let entries = [];
let title = "";
let date = "";
let body = "";

/* CONFIG */
var isReady = false;
var isLegacy = true;
var source = './source/legacy1.txt';

lineReader.eachLine(source, function(line) {
    if (line !== "") {
        if (isLegacy) {
            
            // title (with "#TITLE")
            if (line.includes('#')) {
                // console.log(line);
                title = line.substr(1); // removes prepended '#'
            }

            // date (with YYYY-MM-DD)
            let regex = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/g; // "2016-01-19"
            if (regex.test(line)) {
                // console.log(line);
                old_date = line; // for body part checking
                date = utils.formatDate(line); // converts YYYY-MM-DD to D/M/YYYY
            }

            // body
            if (!line.includes('#') && regex.test(old_date) && !line.includes('---')) {
                if (line !== "") {
                    // console.log(line);
                    body += '\n' + line;
                }
            }
        } else {
            // title (with "AD 0000.0000")
            let regex = /(AD) \d\d\d\d.\d\d\d\d/g; // "AD 0000.0000"
            if (regex.test(line)) {
                // console.log(line);
                title = line;
            }

            // date (with "Date:")
            if (line.includes('Date:')) {
                var slice = line.substr(6); // remove 'Date:'
                var pos1 = slice.indexOf('('); // remove day
                var sanitize = slice.slice(0, pos1).trim();
                // console.log(sanitize);
                date = sanitize;
            }

            // body
            if (!line.includes('Date:') && regex.test(title) && !line.includes('---')) {
                if (line !== "") {
                    // console.log(line);
                    body += '\n' + line;
                }
            }
        }

        if (line.includes('---')) {
            body = utils.escape_html(body);
            var json = {
                "title": title,
                "date": date,
                "body": body
            };
            entries.push(json);
            body = "";
            title = "";
            date = "";
        }
    }
}, function (err) {
    if (err) throw err;

    if (!isReady) {
        console.log(entries);
        sql.end();
    } else {
        var itemsProcessed = 0;
        entries.forEach(function(value, index, array) {
            sql.query('INSERT INTO entries SET ?', value, (err, rows, fields) => {
                if (err) {
                    console.error('An error occurred while executing the query');
                    throw err;
                }
            });
            itemsProcessed++;
            if(itemsProcessed === array.length) {
              callback(itemsProcessed);
            }
        });
    
        function callback (items) {
            console.log('all done');
            console.log(items + ' processed');
            sql.end();
        }
    }
});