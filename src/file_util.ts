import fs from "fs";
import { promisify } from "util";

const readFile = (fileName: string) => promisify(fs.readFile)(fileName, "utf8");
export default  readFile

/*try {
	fs.readFileSync("dynfunction.ts", 'utf8')
}
catch (error) {
  console.error(error);
}*/
/*
function read(filename: string) {
  
  (async () => {
    try {
			let res = await readFile(filename);
			

    } catch (error) {
      console.error(error);
    }
  })();

}*/

(async () => {
	const toto = await readFile("./dynfunction.ts");

	console.log(toto);

})()