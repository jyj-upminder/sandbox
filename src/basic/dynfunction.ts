// tslint:disable-next-line: no-namespace
namespace dyn {
  // import {logDuration}  from "./utils"

  function stopIt(): void {
    console.log("Stop");
  }

  class MyClass {
    start() {
      console.log("start");
    }
  }

  // tslint:disable-next-line: no-string-literal
  MyClass.prototype["stopIt"] = stopIt; // logDuration(stop)

  interface MyClass {
    stopIt(): void;
  }

  const example = new MyClass();
  example.start();
  example.stopIt();
}
