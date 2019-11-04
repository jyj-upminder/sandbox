
// tslint:disable-next-line: no-shadowed-variable
function hydrate<T>(constr: new(...args: any[]) => T, data: string, strictMode: boolean = true, ...args: any[]): T {
	const obj = JSON.parse(data);
	const instance:any = new constr(...args);

	for (const key in obj) {
			if (!strictMode || instance.hasOwnProperty(key)) {
					instance[key] = obj[key];
			}
	}

	return instance;
}

class Example {
	 name: string | undefined;
	 val: number| undefined;

	constructor(public description: string) { }

	getToken() {
			return `${this.name}_${this.val}:${this.description}`;
	}
}

const data = `{ "name": "Fenton", "val": 5}`;

const example = hydrate(Example, data, false, 'My Description');

// "Fenton_5:My Description"
console.log(example.getToken());


