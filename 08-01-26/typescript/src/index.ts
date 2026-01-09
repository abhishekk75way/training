interface Person {
    age: number,
    name: string,
    say(): string
}

let employee = {
    age: 21, 
    name:"Abhishek Kushwaha", 
    say: function() { 
        return "My name is " + this.name + 
               " and I'm " + this.age + " years old!"
    }
}

function sayIt(person: Person) {
    return person.say();
}

console.log(sayIt(employee))