class Transport {
  constructor(type) {
    this.type = type;
  }
  ride() {
    console.log(`${this.type} is riding.`);
  }
  stop() {
    console.log(`${this.type} has stopped.`);
  }
}

class Car extends Transport {
  constructor() {
    super("Car");
  }
}

class Bike extends Transport {
  constructor() {
    super("Bike");
  }
}

class TransportFactory {
  static create(type) {
    let transport;

    switch (type) {
      case "car":
        transport = new Car();
        break;
      case "bike":
        transport = new Bike();
        break;
      default:
        console.log("Error");
    }

    return transport;
  }
}


const myCar = TransportFactory.create(`car`);
const myBike = TransportFactory.create(`bike`);

myCar.ride();
myCar.stop();

myBike.ride();
myBike.stop();
