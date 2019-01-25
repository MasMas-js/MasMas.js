/*
 * - MasMas.js -
 * Latest version can be found at:
 * https://raw.githubusercontent.com/MasMas-js/MasMas.js/master/masmas.js
 * 
 * Documentation located at:
 * https://masmas-js.github.io
 * 
 * Credits:
 * ~ N8Python - isFloat, isInteger, Int, Float, execute, globalVar, exists,
 * Number.prototype.A, Number.prototype.times, localStore, 
 * String.prototype.numberOf wrap, MasMasCanvas, type
 * ~ user113716 - String.prototype.splice
 * ~ Ghostoy - commmafy
 * ~ Lavamantis - Number.prototype.round
 * ~ RDIL - Fix loadjQuery, added isLoaded, added getRandomLetter, 
 * added isNull
 * ~ Sam Deering - loadScript
 * ~ kieranpotts - isPrimitive
 * ~ Paul S. - genCharArray
 * [{ Insert your username and functions you contribute up here. }]
 */

// Returns true if the script is in memory. Used for testing/debugging.
function isLoaded() {
  return true;
}

function isFloat(n) {
  return (n === +n && n !== (n | 0));
}

function isInteger(n) {
  return (n === +n && n === (n | 0));
}

function Int(n) {
  if (typeof n === 'number' && n <= 9223372036854775807 && n >= -9223372036854775807 && n % 1 === 0) {
    return n;
  }
  throw new Error('TypeExceptionError: Value passed not an integer');
}

function Float(n) {
  if (typeof n === 'number' && n <= 9223372036854775807 && n >= -9223372036854775807 && isFloat(n)) {
    return n;
  }
  throw new Error('TypeExceptionError: Value passed not a float');
}

function execute(times, func) {
  for (var i = 0; i < times; i++) {
    func();
  }
}

function exists(theItem) {
  return (theItem !== undefined && theItem !== null);
}

function isNull(theItem) {
  return (theItem === null);
}

function globalVar(varname, val) {
  if (!exists(window[varname])) window[varname] = val;
  else throw new Error('Variable already exists!');
}

function commafy(num) {
  var str = num.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

function localStore(varname, val) {
  if (!exists(localStorage[varname])) localStorage[varname] = val;
  
  if (typeof val === 'number') {
    window[varname] = Number(localStorage[varname]);
  } else if (typeof val === 'boolean') {
    window[varname] = Boolean(localStorage[varname]);
  } else {
    window[varname] = localStorage[varname];
  }
  
  setInterval(() => {
    if (typeof val === 'number') {
      localStorage[varname] = Number(window[varname]);
    } else if (typeof val === "boolean") {
      localStorage[varname] = Boolean(window[varname]);
    } else {
      localStorage[varname] = window[varname];
    }
  }, 1)
  
}

function wrap(func) {
  func();
}

function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) { // IE
    script.onreadystatechange = function() {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { // Others
    script.onload = function() {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function loadjQuery(callback) {
  loadScript('https://code.jquery.com/jquery-3.3.1.min.js', callback);
}

function isPrimitive(test) {
  return (test !== Object(test));
};

function type(thing) {
	return typeof thing;
}

class Random {
  constructor() {}
  genCharArray(charA, charZ) {
    var a = [];
    i = charA.charCodeAt(0);
    j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
    }
    return a;
  }
  getRandomNumber(min, max, float=false) {
    if (float) {
      return (Math.random() * (max - min) + min);
    } else {
      return (Math.floor(Math.random() * (max - min + 1) + min));
    }
  }
  getRandomBool() {
    return (Math.random() >= 0.5);
  }
  getRandomLetter() {
    letters = genCharArray('a', 'z');
    return letters[getRandomInt(0, 25)];
  }
}

String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
}
String.prototype.numberOf = function(str) {
  return (((this.valueOf()).split("")).filter(i => i === str)).length;
}

Number.prototype.round = function(places=0) {
  return +(Math.round(this + 'e+' + places)  + 'e-' + places);
}

Number.prototype.A = function() {
  var str = String(this.valueOf());
  if (str.includes('000')) {
    return Number((this.valueOf()).toFixed(str.indexOf('000')));
  }
  if (str.includes("999")) {
    return Number((this.valueOf()).round(str.indexOf('999')));
  }
  return this.valueOf();
}

Number.prototype.times = function(func) {
  for(var i = 0; i < this.valueOf(); i++) {
    func();
  }
}

// Canvas.masmas.js
function canvasSetup() {
  window.canvas = document.getElementById('canvas');
  window.ctx = canvas.getContext('2d');
}
class MasMasCanvas {
  constructor(ctx) {
    this.ctx = ctx;
  }
  get c() {
    return this.ctx;
  }
  fill(fillStyle) {
    this.ctx.fillStyle = fillStyle;
  }
  rect(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height);
  }
  ellipse(x, y, width, height) {
    ctx.beginPath();
    ctx.ellipse(x, y, width, height, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
  text(text, x, y) {
    this.ctx.fillText(text, x, y);
  }
}

function getSpeedOfLight(int) {
  // in meters a second!!
  if (int) return (299792458);
  else return (commafy("299792458"));
}
