var WheaterStation = /** @class */ (function () {
    function WheaterStation() {
        this.observers = [];
    }
    WheaterStation.prototype.registerObserver = function (o) {
        this.observers.push(o);
    };
    WheaterStation.prototype.removeObserver = function (o) {
        var i = this.observers.indexOf(o);
        this.observers.splice(i, 1);
    };
    WheaterStation.prototype.notifyObservers = function () {
        var _this = this;
        this.observers.forEach(function (element) {
            element.udpate(_this.temp);
        });
    };
    WheaterStation.prototype.setTemp = function (t) {
        console.log("WeatherStation: new temperature measurement: " + t);
        this.temp = t;
        this.notifyObservers();
    };
    return WheaterStation;
}());
var TemperatureDisplay = /** @class */ (function () {
    function TemperatureDisplay(s) {
        this.subject = s;
        this.subject.registerObserver(this);
    }
    TemperatureDisplay.prototype.udpate = function (temperature) {
        console.log("I need to update my display to have a new value: " + temperature);
    };
    return TemperatureDisplay;
}());
var Fan = /** @class */ (function () {
    function Fan(s) {
        this.subject = s;
        this.subject.registerObserver(this);
    }
    Fan.prototype.udpate = function (temperature) {
        if (temperature > 25) {
            console.log("the temp is: " + temperature + ", so is above 25, fan is ON!");
        }
        else {
            console.log("Fan off");
        }
    };
    return Fan;
}());
var ws = new WheaterStation();
var d = new TemperatureDisplay(ws);
var f = new Fan(ws);
ws.setTemp(20);
ws.setTemp(26);
