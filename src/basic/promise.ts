type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void;
type PromiseReject = (error?: any) => void;

type Callback = (error?: Error, data?: number) => void;

function getData(callback: Callback) {
  setTimeout(function setTimeoutCB(counter: number) {
    if (Math.random() < 0.25) {
      callback(new Error("Error in retrieving data."));
    } else {
      const data = Math.random();
      callback(undefined, data);
    }
  }, 500);
} // getData

function getDataPromise() {
  return new Promise(
    (resolve: PromiseResolve<number>, reject: PromiseReject): void => {
      getData((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    }
  );
} // getDataPromise


/*
(async () => {
	
  const res = await getDataPromise();
  console.log(res);
})();
*/



getDataPromise() 
    .then( 
        data => { // resolve() 
            console.log("Process 1:", data); 
            return getDataPromise(); 
        }) 
    .then( 
        data => { // resolve() 
            console.log("Process 2:", data); 
            return getDataPromise(); 
        }) 
    .then( 
        data => { // resolve() 
            console.log("Process 3:", data); 
        }) 
    .catch(error => { // reject() 
        console.log(error); 
    }) 


		console.log("cuicui")

		Promise.all([getDataPromise(), getDataPromise(), getDataPromise()]) 
    .then( 
        data => { 
            console.log("Success!", data); 
        }) 
    .catch(error => { 
        console.log(error); 
    }) 