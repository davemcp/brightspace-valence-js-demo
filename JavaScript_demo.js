
var api_url = "<<your.lms.server.url.edu>>";
// This is the hostname (https://en.wikipedia.org/wiki/Hostname) for the LE you are attempting to access via API
var testMethod = "get";
/* 
    This is the HTTP verb or HTTP request method https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods that matches the
    API resource requirement
*/
var testPath = "/d2l/api/lp/<<api version>>/users/whoami";
// This is the resource https://en.wikipedia.org/wiki/Web_resource you have identified in the valence docs http://docs.valence.desire2learn.com/http-routingtable.html

var app_id = "<<APPID>>";
var app_key = "<<APPKEY>>";
// App ID and key is the ID you were assigned when you registed your app through "Manage Extensibility" http://docs.valence.desire2learn.com/admin/manage.html#manage-extensibility-tool

var user_id = "<<USERID>>";
var user_key = "<<USERKEY>>";
// The User or Session ID and Key are returned when you authenticate as a user. Use apitesttool.desire2learnvalence.com to quickly gain these values for your app
// Nb: you'll need to register your app to return the values to the apitesttool if you do so. Otherwise the authentication will fail.

var timestamp = getTimestamp();

var x_a = app_id;
var x_b = user_id;
var x_c = Sign(testMethod.toUpperCase() + "&" + testPath + "&" + timestamp, app_key);
var x_d = Sign(testMethod.toUpperCase() + "&" + testPath + "&" + timestamp, user_key);
var x_t = timestamp;

document.write("The fully Specified URL is: <br/> https://" + api_url + testPath + "?x_a=" + x_a + "&x_b=" + x_b + "&x_c=" + x_c + "&x_d=" + x_d + "&x_t=" + x_t);


function Sign(data, key) {
    // create a new ASCII hash object, passing in a string comprised of the <http method> + resource path + timestamp
    var hmacObj = new jsSHA(data, "ASCII");
    // Get the Hash Message Auth Code (HMAC) using the key provided (app or user). Nb: Secure Hash Algorithm (SHA) 256bit encryption in Base 64
    var hmac = hmacObj.getHMAC(key, "ASCII", "SHA-256", "B64");
    // the base64Url function simply replaces (using regular expressions) some strings. This is taken directly from the D2L Utils.
    var hmac_b64u = this.base64Url(hmac);

    // Use these to preview the info if you wish
    //alert("Data: " + data + "\nKey: " + key + "\nhash: " + hmac_b64u);
    //console.info("Data: " + data + "\nKey: " + key + "\nhash: " + hmac_b64u);

    // Return the base 64
    return hmac_b64u;

}

// b64-for-Valence helper used by D2L.Util.Sign()
function base64Url(b64) {
    var b64u = b64.replace( /\+/gi, "-" );
    b64u = b64u.replace( /\//gi, "_" );
    b64u = b64u.replace( /\=/gi, "" );

    return b64u;

}

// It's crucial your timestamp matches the documentation. Otherwise you'll be returned all manner of errors.
function getTimestamp() {
    var date = new Date();
    var ts =
	    Math.round(
		Date.UTC(
		    date.getUTCFullYear(),
		    date.getUTCMonth(),
		    date.getUTCDate(),
		    date.getUTCHours(),
		    date.getUTCMinutes(),
		    date.getUTCSeconds(),
		    date.getUTCMilliseconds() ) / 1000 );

    return ts;
}