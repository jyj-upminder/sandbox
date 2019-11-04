class A {
	// ... 
}
// tslint:disable-next-line: max-classes-per-file
class B {
	// ... 
}
	
let var1 = [{path:"aa",comp:"A"},{path:"b",comp:"B"}];

let var2 = var1.map((obj) => { 

		 const rObj = {path: obj.path, component: (obj.comp==="A")?A:B};
		 return rObj;
	});

console.log(var2)