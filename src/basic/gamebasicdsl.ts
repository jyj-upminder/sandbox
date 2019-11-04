type Program<T> = Read<T> | Write<T> | Done<T>;

interface Read<T> {
  kind: "Read";
  next: (data: T) => Program<T>;
}

interface Write<T> {
  kind: "Write";
  valToWrite: string;
  next: Program<T>;
}

interface Done<T> {
  kind: "Done";
  val: T;
}

// Data constructors
const read = <T>(next: (data: T) => Program<T>): Program<T> => ({
  kind: "Read",
  next
});

const write = <T>(valToWrite: string, next: Program<T>): Program<T> => ({
  kind: "Write",
  valToWrite,
  next
});

const done = <T>(val: T): Program<T> => ({
  kind: "Done",
  val
});

// Program in our DSL
const greetingProgram: Program<string> = write("Hello, what is your name?",
  read(name => write(`Hello ${name}`, 
									read(name2 => write(`and ${name2}`, done(name2))
									)
								)
	)

);

// Interpreter
export const consoleInterpreter = async (program: Program<string>): Promise<string> => {
    switch (program.kind) {
      case "Done":
       process.exit(0);
        return program.val;
      case "Write":
        console.log(program.valToWrite);
        return consoleInterpreter(program.next);
      case "Read":
        var stdin = process.openStdin();
        const p: Promise<string> = new Promise<string>((res, rej) =>
          stdin.addListener("data", (d: any) => res(d.toString().trim()))
        );
         // const p = Promise.resolve("Katt");
        const data: string = await p;
        return consoleInterpreter(program.next(data));
    }
  };
  
  // Run
	const result: Promise<string> = consoleInterpreter(greetingProgram);
	
	console.log(result)