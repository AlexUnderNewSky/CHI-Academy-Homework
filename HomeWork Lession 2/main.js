"use strict";

// Task 1
console.log(`=-=-=-= Task 1 =-=-=-=`);
function addParamsToRequest(objectCall) {
  let count = 0;
  return (newInfo) => {
    count += 1;
    return {
      ...objectCall,
      data: { ...newInfo },
      count: count - 1, // if we don't want to start with 0, just remove "-1"
    };
  };
}

const sendData = addParamsToRequest({ "access-token": "qwerty" });

const result = sendData({ name: "Serhii", "music taste": `Melomaniac` });
console.log(result);

const result1 = sendData({ name: "Kevin", "music taste": `Heavy metal` });
console.log(result1);

const result2 = sendData({ name: "Xristo", "music taste": `Hip-hop`, age: 17 });
console.log(result2);

console.log(``);
// Task 2
console.log(`=-=-=-= Task 2 =-=-=-=`);

const obj = {
  getData: function () {
    console.log(`Person name is: ${this.name} and age ${this.age}`);
  },
};

obj.getData.call({ name: `Serhii`, age: 23 });

const fnNewGetData = obj.getData.bind({ name: `Xristo`, age: 17 });
fnNewGetData();
