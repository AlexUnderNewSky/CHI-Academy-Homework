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
      count: count - 1, // if you don't want to start with 0, just remove "-1"
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

console.log(``);
// Task 3
console.log(`=-=-=-= Task 3 =-=-=-=`);

const root = {
  name: "name",
  type: "folder",
  children: [
    {
      name: "folder 1",
      type: "folder",
      children: [
        {
          name: "folder 2",
          type: "folder",
          children: [
            {
              name: "file 3",
              type: "file",
              size: 30,
            },
          ],
        },
      ],
    },
    {
      name: "file 1",
      type: "file",
      size: 10,
    },
    {
      name: "file 2",
      type: "file",
      size: 20,
    },
  ],
};

function recursiveFileFounder(obj, size) {
  let files = [];
  if (obj.type === "file") {
    if (obj.size > size) {
      //   console.log(obj.name, obj.size);  // if you want to see all files without array
      files.push(obj.name);
    }
  } else {
    obj.children.forEach((child) => {
      files = files.concat(recursiveFileFounder(child, size));
    });
  }
  return files;
}

const allFiles = recursiveFileFounder(root, 1);
console.log(allFiles);

console.log(``);
// Task 4
console.log(`=-=-=-= Task 4 =-=-=-=`);

const person = {
  name: `Serhii`,
  phone: `+380 (99) 999-99-99`,
  introduce() {
    console.log(`My name is ${this.name} and my phone number is ${this.phone}`);
  },
};

const student = Object.create(person);

student.course = 1;
student.study = function () {
  console.log(`I'm study at ${this.course} course.`);
};

student.study();

const teacher = Object.create(person);

teacher.subject = `Music`;
teacher.teach = function () {
  console.log(`I'm teaching ${this.subject}`);
};

teacher.teach();

teacher.name = `Kate`;
teacher.phone = `23`;
teacher.introduce();
