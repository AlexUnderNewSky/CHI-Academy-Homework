// Hello, this tasks was solved by Serhii Sosnytskyi

// Task 1
console.log(`Task 1`);
console.log(`"For" loop`);
for (let index = 1; index <= 10; index++) {
  console.log(`Index "for" - ${index}`);
}

console.log(``);
console.log(`"While" loop`);
let indexForWhile = 1;
while (indexForWhile <= 10) {
  console.log(`Index "while" - ${indexForWhile}`);
  indexForWhile++;
}
console.log(``);
// Task 2
console.log(`Task 2`);
let firstIndex = 0;
const array = [
  7,
  `Hello`,
  true,
  undefined,
  null,
  23,
  `Cyan`,
  false,
  17,
  `CHI Academy`,
];

console.log(`forEach method`);
array.forEach((element) => {
  console.log(
    `forEach method: Element - |${element}| is type - ${typeof element}`
  );
});

console.log(`for loop`);
firstIndex = 0;
for (firstIndex; firstIndex < array.length; firstIndex++) {
  const element = array[firstIndex];
  console.log(`FOR loop: Element - |${element}| is type - ${typeof element}`);
}

console.log(`while loop`);
firstIndex = 0;
while (firstIndex < array.length) {
  const element = array[firstIndex];
  console.log(`WHILE loop: Element - |${element}| is type - ${typeof element}`);
  firstIndex++;
}

console.log(`do while loop`);
firstIndex = 0;
do {
  const element = array[firstIndex];
  console.log(
    `DO WHILE loop: Element - |${element}| is type - ${typeof element}`
  );
  firstIndex++;
} while (firstIndex < array.length);

console.log(``);
// Task 3
console.log(`Task 3`);

const arrayObjects = [
  { name: `Serhii`, age: 23, pets: [`Cat`, `Dog`] },
  { name: `Grigory`, age: 55, pets: [`Parrot`] },
  { name: `Richard`, age: 13, pets: [`Rabbit`] },
];

console.log(arrayObjects.filter((element) => element.age > 20));

arrayObjects.map((element) => {
  element.pets.push(`Mouse`);
});

console.log(arrayObjects);

console.log(``);
// Task 4
console.log(`Task 4`);

const arrayTask4 = [];

for (let index = 0; index < 10; index++) {
  arrayTask4.push(42);
}

console.log(arrayTask4);

arrayTask4.splice(4, 0, `answer`);
arrayTask4.pop();
console.log(arrayTask4);
arrayTask4.find((index) => {
  if (index === `answer`) {
    return console.log(index);
  }
});

console.log(``);
// Task 5
console.log(`Task 5`);

const task5Object = {
  name: `Serhii`,
  age: 23,
  softLanguage: `JavaScript`,
  favouriteGame: `The Witcher 3: Wild Hunt`,
};

console.log(Object.keys(task5Object)); //keys

console.log(Object.hasOwn(task5Object, `softLanguage`)); //hasOwn

console.log(Object.values(task5Object)); //values

// keys + forEach :)
Object.keys(task5Object).forEach((key) => {
  console.log(`${key}: ${task5Object[key]}`);
});
