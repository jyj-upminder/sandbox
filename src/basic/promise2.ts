// tslint:disable-next-line: no-namespace
namespace promise2
 {
	function test(arg: string): Promise<number> {
	return new Promise<number>((resolve) => {
			const t = [...arg].reduce((v, c) => c.charCodeAt(0) + v, 0) 
			resolve(t);
			
	});
}

(async ()=>{
	const i = await test("")
	console.log(i)
})()
}


// "Hello world!".split('').map()

const total = [...'jyj'].reduce((v, c) => { console.log(`${c} ${c.charCodeAt(0)}`); return (c.charCodeAt(0) + v)}
, 0)
console.log(total)