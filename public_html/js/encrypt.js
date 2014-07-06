/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var MAXLENGTH = 255;
var ALPHABET_CESAR = " 01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var ALPHABETLENGTH_CESAR = ALPHABET_CESAR.length;
var operations = ["Cifrar", "Descifrar","Codificar","Descodificar"];
var ciphers = ["cesar", "cesarkey","vigenere"];
var encoding = ["base64" ,"uri"];

function initialize() {
    print_operations();
    print_algorithms ();
}

function print_operations () {
    txt = "";
    for (i = 0; i< operations.length; i++) {
        txt += "<option>"+operations[i]+"</option>";
    }
    document.getElementById("operation").innerHTML = txt;
}
function print_algorithms () {
//    alert(document.getElementById("operation").value);
    test = document.getElementById("operation").value;
    var array=[];
    if ( test == "Cifrar" || test == "Descifrar") {
        array = ciphers;
        document.getElementById("key").disabled = false;
    } else {
        array = encoding;
        document.getElementById("key").disabled = true;
    }
    txt = "";
    for (i = 0; i< array.length; i++) {
        txt += "<option>"+array[i] + "</option>";
    }
    document.getElementById("algorithm").innerHTML = txt;
}

function enc_cesar(m, k) {
    k = typeof k !== 'undefined' ? k : 2;
    var enc = "";
    var msg = m;
    document.getElementById("notify1").innerHTML = "";

    if (msg.length < MAXLENGTH) {

        for (i = 0; i < msg.length; i++) {
            val = msg.charCodeAt(i); //%ALPHABETLENGTH_CESAR;
            //if ((val > 47) & (val < 123)) { val += k; } 
            val+=k;
            enc += String.fromCharCode(val);
            log("I: " + i + " k: " + k + " Mod " + ALPHABETLENGTH_CESAR + " - " + (i + k) % ALPHABETLENGTH_CESAR + " Char:" + val + " out: " + enc);
        }
        return enc;
    } else {
        return "Text too long";
    }
}

var Base64 = {
// private property
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
        Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

    }

    return output;
},

// public method for decoding
decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
        enc4 = Base64._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = Base64._utf8_decode(output);

    return output;

},

// private method for UTF-8 encoding
_utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
},

// private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }
    return string;
}
}

function exec(obj) {
    var m = encodeURIComponent(document.getElementById("input").value);
    var k = encodeURIComponent(document.getElementById("key").value);
    var c = encodeURIComponent(document.getElementById("algorithm").value);
    var output = "";
    
    switch(c) {
    case "cesar":
        output = enc_cesar(m);
        break;
    case "cesarkey":
        output = enc_cesar(m,k);
        break;
    case "base64":
        output = Base64.encode(m);
        break;
    default:
        log("Not implemented");
    }


    document.getElementById("output").innerHTML = output;
    
    log("MSG: " + m);
    log("KEY: " + k);
    log("ALG: " + c);
}



function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}