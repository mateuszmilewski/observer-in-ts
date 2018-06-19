interface Subject {
    registerObserver(o: Observer);
    removeObserver(o: Observer);
    notifyObservers();
}


interface Observer {
    udpate(temperature: number);
}

class WheaterStation implements Subject {


    private temp: number;
    private observers: Observer[] = [];

    registerObserver(o: Observer) {
        this.observers.push(o);
    }
    removeObserver(o: Observer) {
        let i = this.observers.indexOf(o);
        this.observers.splice(i,1);
    }
    notifyObservers() {
        
        this.observers.forEach((element) => {
            element.udpate(this.temp);
        });
    }
    

    setTemp(t: number) {
        console.log("WeatherStation: new temperature measurement: " + t);
        this.temp = t;
        this.notifyObservers();
        
    }
}


class TemperatureDisplay implements Observer {

    private subject: Subject;

    constructor(s: Subject) {
        this.subject = s;
        this.subject.registerObserver(this);
    }


    udpate(temperature: number) {
        console.log("I need to update my display to have a new value: " + temperature);
        
    }
}

class Fan implements Observer {

    private subject: Subject;

    constructor(s: Subject) {
        this.subject = s;
        this.subject.registerObserver(this);
    }


    udpate(temperature: number) {

        if(temperature > 25) {
            console.log("the temp is: " + temperature + ", so is above 25, fan is ON!");
            
        } else {
            console.log("Fan off");
        }
    }
}



let ws = new WheaterStation();
let d = new TemperatureDisplay(ws);
let f = new Fan(ws);


ws.setTemp(20);
ws.setTemp(26);