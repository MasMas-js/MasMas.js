/**
  Credits:
  N8Python - isFloat, isInteger, Int, Float, execute, globalVar, exists,
  Number.prototype.A, Number.prototype.times, localStore, wrap, loadQuery
  user113716 - String.prototype.splice
  Ghostoy - commmafy
  Lavamantis - Number.prototype.round
  // Insert your username and functions you contribute up here.
**/

function isFloat(n) {
  return n === +n && n !== (n | 0);
}

function isInteger(n) {
  return n === +n && n === (n | 0);
}

function Int(n) {
  if (typeof n === "number" && n <= 9223372036854775807 && n >= -9223372036854775807 && n % 1 === 0) {
    return n;
  }
  throw new Error("TypeExceptionError: Value passed not an integer");
}

function Float(n) {
  if (typeof n === "number" && n <= 9223372036854775807 && n >= -9223372036854775807 && isFloat(n)) {
    return n;
  }
  throw new Error("TypeExceptionError: Value passed not a float");
}

function execute(times, func) {
  for (var i = 0; i < times; i++) {
    func();
  }
}

function globalVar(varname, val) {
  window[varname] = val;
}

function exists(thing){
  if(thing !== undefined && thing !== null) {
    return true;
  }
  return false;
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
  if (!exists(localStorage[varname])) { localStorage[varname] = val; }
  
  if (typeof val === "number") {
    window[varname] = Number(localStorage[varname]);
  } else if (typeof val === "boolean") {
    window[varname] = Boolean(localStorage[varname]);
  } else {
    window[varname] = localStorage[varname];
  }
  setInterval(() => {
    if (typeof val === "number") {
      localStorage[varname] = Number(window[varname]);
    } else if (typeof val === "boolean") {
      localStorage[varname] = Boolean(window[varname]);
    } else {
      localStorage[varname] = window[varname];
    }
  }, 1)
}

function wrap(func){
  func();
}

function loadJQuery(){
  document.getElementsByTagName('head').innerHTML += "<script src='https://code.jquery.com/jquery-3.3.1.min.js' integrity='sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=' crossorigin='anonymous'></script>";
}

class Random {
  constructor() {}
  getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  getRandomBool() {
    return Math.random() >= 0.5;
  }
}

String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
}

Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

Number.prototype.A = function(){
  var str = String(this.valueOf());
  if(str.includes("000")){
    return Number((this.valueOf()).toFixed(str.indexOf("000")));
  }
  if(str.includes("999")){
    return Number((this.valueOf()).round(str.indexOf("999")));
  }
  return this.valueOf()
}

Number.prototype.times = function(func){
    for(var i = 0; i < this.valueOf(); i++){
      func();
    }
}
