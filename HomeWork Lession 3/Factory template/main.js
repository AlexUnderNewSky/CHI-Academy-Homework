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
  create(type) {
    let transport;
    if (type === `car`) {
      transport = new Car();
    } else if (type === `bike`) {
      transport = new Bike();
    } else {
      console.log(`Error`);
    }
    return transport;
  }
}

const factory = new TransportFactory();
const myCar = factory.create(`car`);
const myBike = factory.create(`bike`);

myCar.ride();
myCar.stop();

myBike.ride();
myBike.stop();
