class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.requests = [];
    this.waitingList = [];
    this.passengers = [];
    this.direction = "none";
    this.interval = 0;
}

  start() {
    this.interval = setInterval(() => this.update(), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  update() {
    this.log();
    if(this.requests.length == 0) this.stop();
    else{
      if(this.requests[0] == this.floor){
        this.requests.shift();
        this_passengersEnter();
        this_passengersLeave();
      }
      else{
        this.requests[0] > this.floor ? floorDown() : floorUp();
      }
  }
}
  _passengersEnter() {
    this.waitingList = this.waitingList.filter(e => {e.originFloor != this.floor});
    this.waitingList.forEach(e => {
      if(e.originFloor == this.floor){
        this.passengers.push(e);
        this.requests.push(e.destinationFloor);
        console.log(`${e.name} has entered the elevator`);
      }
    });

  }

  _passengersLeave() {
    this.passengers = this.passengers.filter(e => {e.destinationFloor != this.floor});
    this.passengers.forEach(e =>{
      if(e.destinationFloor == this.floor){
        this.passengers.shift(e);
        console.log(`${e.name} has left the elevator`);
      }
    });
  }

  floorUp() {
    this.direction = "going up";
    if (this.floor < this.MAXFLOOR) this.floor++;
  }

  floorDown() {
    this.direction = "going down";
    if (this.floor > 0) this.floor--;
  }

  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
  }

  log() {
    console.log(`You are in floor ${this.floor} | The elevator is going ${this.direction}`);
  }

}


module.exports = Elevator;
