
// tslint:disable-next-line: no-namespace
namespace metaentity {


  export function executor<T extends (...args: any[]) => any>(
    func: T
  ): (...funcArgs: Parameters<T>) => ReturnType<T> {
    const funcName = func.name;

    // Return a new function that tracks how long the original took
    return (...args: Parameters<T>): ReturnType<T> => {
      console.time(funcName);
      const results = func(...args);
      console.timeEnd(funcName);
      return results;
    };
  }

	// =====================================================================================
	// <===== Début du code généré
	// =====================================================================================

  // Chaque fonction est définie par un type
  type hello = (name: string) => void
	type bye = () => void
	type specifiqueForFr = () => void

  namespace global {
    export let hello: hello = (name: string) =>
      console.log(`Hello ${name} from global`)
    export let bye: bye = () => console.log("bye")
  }

  namespace fr {
		export let bye: bye = () => console.log("bye from FR")
		export let specifiqueForFr = () => console.log("specific for FR")
  }

  class Entity {
    context!: {};
    // tslint:disable-next-line: no-empty
    find() {}
    // tslint:disable-next-line: no-empty
    findOne() {}
  }

  // tslint:disable-next-line: max-classes-per-file
  class Emp extends Entity {
    // generated for CWL = S:country:fr
    private readonly cwl = { C: "S", L: "country", V: "fr" }

    id!: number;
    name!: string;
    hello = executor(global.hello)
    bye = executor(fr.bye)
    // plugins!: []
	}
	// =====================================================================================
	// <====== Fin du code généré
	// =====================================================================================

	// =====================================================================================
	// Class de travail : code écrit par developpeur
	// =====================================================================================
	
	// tslint:disable-next-line: max-classes-per-file
  class MyEmp extends Emp {

    // Use decorator to create new function or overwrite => will be added to metada on build
		// Create getMaxAccount
		getMaxAccount(
      id: number,
      currency: string,
			stategy: "plain" | "usual" | "specific",
			option?: { [key: string]: any; } ,
    ) {
      console.log(this.name); // usage du this à traiter => context d'execution
      return 400;
    }

		// Overwrite bye
    bye: bye = () => console.log("Salut à tous");
  }

  const e = new MyEmp();

  e.name = "jarril";

  e.hello("jyj");
  e.getMaxAccount(1, "EUR", "plain", [{"nbmonth":2},{"reference": "netSalary"}]);
  e.bye();
}
