interface Named {
  name: string;
}

let a: Named;
let y = { name: 'Alice', location: 'Seattle' };
a = y;
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status2 = Status.Ready;
console.log(status2)