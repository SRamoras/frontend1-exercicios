let obj = { name: "Diogo Silva", age: 21, city: "Faro" };

let stringifiedObj = JSON.stringify(obj);
console.log(stringifiedObj);

let parsedObj = JSON.parse(stringifiedObj);
console.log(parsedObj.name);

let data = fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });