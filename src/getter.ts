/* function extend<First, Second>(first: First, second: Second): First & Second {
	const result: Partial<First & Second> = {};
	for (const prop in first) {
			if (first.hasOwnProperty(prop)) {
					(result as First)[prop] = first[prop];
			}
	}
	for (const prop in second) {
			if (second.hasOwnProperty(prop)) {
					(result as Second)[prop] = second[prop];
			}
	}
	return result as First & Second;
}

class Person {
	constructor(public name: string) { }
}

interface Loggable {
	log(name: string): void;
}

// tslint:disable-next-line: max-classes-per-file
class ConsoleLogger implements Loggable {
	log(name) {
			console.log(`Hello, I'm ${name}.`);
	}
}

const jim = extend(new Person('Jim'), ConsoleLogger.prototype);
jim.log(jim.name);
 */

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}

 class Dummy {
	 
	m:string | undefined

	 calc(a:number, b:number) {
		return a+b
	 }

	 calc2 = (a:number, b:number)=>  a + b
 }
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never


console.log(getName("titi"))
console.log(getName(()=>"toto"))


function getProperty<T, K extends keyof T>(obj: T, key: K) {
	return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a")

let d = new Dummy()

let res = getProperty(d, "calc").call(d,2,3)
console.log(res)

const ty = typeof getName
console.log(ty)

function withUID<T>(obj: T) { 
	return Object.assign({}, obj, { uuid: 2 });
}

const e = withUID({a:1})




interface User {
	name: string;
	age: number;
	location: string;
}

declare function getUserData(): Promise<User>;
declare function displayUser(user: User): void;

async function f() {
	displayUser(await getUserData());}


	