var jsdom = require('jsdom');

var doc = jsdom.jsdom("<!doctype HTML><html><body></body></html>");

jsdom.env({
    html: 'www.minaorangina.com',
    scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'],
    done: function (err, window) {

        if (err) {
            console.log(err);
        }
        // console.log(Object.keys(window));
        // console.log(Object.keys(window.document));
        console.log(Object.keys(window.document._defaultView));

    }
});
