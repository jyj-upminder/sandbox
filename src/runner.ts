import ts from "typescript";
import fs from "fs";
import { promisify } from "util";
const readFile = (fileName: string) => promisify(fs.readFile)(fileName, "utf8");

/*const code: string = `({
    Run: (data: string): string => {
        console.log(data); return Promise.resolve("SUCCESS"); }
    })`;*/

(async () => {
  let code: string  = await readFile("./dynfunction.ts");

  //console.log(code);

	code = `({
		Run: (data: string): string => {
			${code}
		  ; return Promise.resolve("SUCCESS"); }
		})`;
		
	const result = ts.transpile(code);
	
	console.log(result);
	console.log("=======");

  // tslint:disable-next-line: no-eval
  const runnalbe: any = eval(result);

  runnalbe.Run("RUN!").then((results: string) => {
    console.log(results);
  });
})();
