"use strict";

// Task 1
function fnCounting(objectCall) {
  objectCall.count = 0;
  return (newInfo) => {
    objectCall.count += 1;
    return {
      ...objectCall,
      ...newInfo,
    };
  };
}

const countingFunction = fnCounting({ "access-token": "qwerty" });

console.log(countingFunction({ test: "example1" }));

console.log(countingFunction({ test: "example2" }));
