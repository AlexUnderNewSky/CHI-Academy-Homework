"use strict";

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TASK 1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
console.log(`=-=-=-= Task 1 =-=-=-=`);
function addParamsToRequest(objectCall) {
  let count = 0;
  return (newInfo) => ({
    ...objectCall,
    data: newInfo,
    count: count++,
  });
}

const sendData = addParamsToRequest({ "access-token": "qwerty" });

const result = sendData({ name: "Serhii", "music taste": `Melomaniac` });
console.log(result);

const result1 = sendData({ name: "Kevin", "music taste": `Heavy metal` });
console.log(result1);

const result2 = sendData({ name: "Xristo", "music taste": `Hip-hop`, age: 17 });
console.log(result2);

console.log(``);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TASK 2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TASK 3!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

function recursiveFileFounder(obj) {
  let files = [];
  if (obj.type === "file") {
    //   console.log(obj.name);  // if you want to see all files without array
    files.push(obj.name);
  } else {
    obj.children.forEach((child) => {
      files = files.concat(recursiveFileFounder(child));
    });
  }
  return files;
}

const allFiles = recursiveFileFounder(root);
console.log(allFiles);

console.log(``);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TASK 4!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

console.log(``);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TASK 5!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
console.log(`=-=-=-= Task 5 - prototype =-=-=-=`);

function personPrototype(name, phone) {
  this.name = name;
  this.phone = phone;
}

personPrototype.prototype.introduce = function () {
  console.log(`My name is ${this.name} and my phone number is ${this.phone}`);
};

const serhiiPrototype = new personPrototype(`Serhii`, `+380 (99) 999-99-99`);
serhiiPrototype.introduce();

function studentPrototype(name, phone, course) {
  personPrototype.call(this, name, phone);
  this.course = course;
}

studentPrototype.prototype = Object.create(personPrototype.prototype);
studentPrototype.prototype.constructor = studentPrototype;

studentPrototype.prototype.study = function () {
  console.log(`I'm study at ${this.course} course.`);
};

const studentXristo = new studentPrototype(`Xristo`, `+380 (77) 777-77-77`, 1);
studentXristo.introduce();
studentXristo.study();

function teacherPrototype(name, phone, subject) {
  personPrototype.call(this, name, phone);
  this.subject = subject;
}

teacherPrototype.prototype = Object.create(personPrototype.prototype);
teacherPrototype.prototype.constructor = teacherPrototype;

teacherPrototype.prototype.teach = function () {
  console.log(`I'm teaching ${this.subject}`);
};

const teacherElizabeth = new teacherPrototype(
  `Elizabeth`,
  `+380 (22) 222-22-22`,
  `Music`
);
teacherElizabeth.introduce();
teacherElizabeth.teach();

console.log(``);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TASK 6!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
console.log(`=-=-=-= Task 6 - class =-=-=-=`);

class Person {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  introduce() {
    console.log(`My name is ${this.name} and my phone number is ${this.phone}`);
  }
}

const serhiiClass = new Person(`Serhii`, `+380 (99) 999-99-99`);
serhiiClass.introduce();

class Student extends Person {
  constructor(name, phone, course) {
    super(name, phone);
    this.course = course;
  }
  study() {
    console.log(`I'm study at ${this.course} course.`);
  }
}

const studentXristoClass = new Student(`Xristo`, `+380 (55) 555-55-55`, 3);
studentXristoClass.introduce();
studentXristoClass.study();

class Teacher extends Person {
  constructor(name, phone, subject) {
    super(name, phone);
    this.subject = subject;
  }
  teach() {
    console.log(`I'm teaching ${this.subject}`);
  }
}

const teacherElizabethClass = new Teacher(
  `Elizabeth`,
  `+380 (22) 222-22-22`,
  `Math`
);
teacherElizabethClass.introduce();
teacherElizabethClass.teach();
