import { makeBackgroundable, createRandomDataFileWorker} from './backgroundable'
import { createRandomDataFile } from './random-data';

const backgroundedCreateRandomDataFile =
  makeBackgroundable(createRandomDataFile);

async function run() {
	const path = "" // await backgroundedCreateRandomDataFile(1024 * 1024 * 1024);
	
	const path2 = await createRandomDataFileWorker(1024 * 1024 * 1024);
	// ...
	
	console.log(`${path} ${path2}`)
}

run()


