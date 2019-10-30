type Id = string
type IdStrategy = 'strategy_A' | 'strategy_B' | 'strategy_C'
type Currency = 'EUR' | 'USD' | 'GBP'
interface JsonConfig {
  [k: string]: any
}
type Amount = number

interface Iemployee {
  idEmployee: Id
  name: string
  name2: string
}

interface IemployeeFr {
  idEmployee: Id
  name: string
  frAdvanceField: string
}

class Employee {
  private fields!: Iemployee

  constructor() {
    this.fields = {
      idEmployee: '',
      name: '',
      name2: '',
    }
  }

  getMaxAdvance(idEmployee: Id, idStrategy?: IdStrategy, strategyOption?: JsonConfig, currency?: Currency): Amount {
    // implementation
    return Math.random() * 100
  }
}

// tslint:disable-next-line: max-classes-per-file
class EmployeeFr extends Employee {
  private fieldsFr!: IemployeeFr

  constructor() {
    super()
    this.fieldsFr = {
      idEmployee: '',
      name: '',
      frAdvanceField: '50',
    }
  }

  get frAdvanceField(): string {
    return this.fieldsFr.frAdvanceField
  }

  set frAdvanceField(value: string) {
    this.fieldsFr.frAdvanceField = value
  }

  getMaxAdvance(idEmployee: Id, idStrategy?: IdStrategy, strategyOption?: JsonConfig, currency?: Currency): Amount {
    // implementation using field frAdvanceField
    let amount = 0
    if (this.fieldsFr.frAdvanceField !== undefined) {
      amount = +this.fieldsFr.frAdvanceField
    }
    return amount
  }
}

// tslint:disable-next-line: max-classes-per-file
class EmployeeFactory {
  private static instance: EmployeeFactory

  private constructor() {}

  static getInstance(): EmployeeFactory {
    if (!EmployeeFactory.instance) {
      EmployeeFactory.instance = new EmployeeFactory()
    }
    return EmployeeFactory.instance
  }

  getNewEmployee(level: { c: string; l: string; v: string }): Employee {
    if (level.c !== 'S' && level.c !== 'standard') {
      throw new Error('Client must be standard')
    }

    switch (level.l) {
      case 'world':
      case 'W':
        return new Employee()
        break
      case 'country':
      case 'C':
        return new EmployeeFr()
        break
      default:
        break
    }

    throw new Error(`No employee class available for this level ${level}`)
  }
}

function logDuration<T extends (...args: any[]) => any>(func: T): (...funcArgs: Parameters<T>) => ReturnType<T> {
  const funcName = func.name;

  // Return a new function that tracks how long the original took
  return (...args: Parameters<T>): ReturnType<T> => {
    console.time(funcName);
    const results = func(...args);
    console.timeEnd(funcName);
    return results;
  };
}

function localtest() {
const employee = EmployeeFactory.getInstance().getNewEmployee({ c: 'S', l: 'world', v: 'global' })
let adv = employee.getMaxAdvance('M10')

console.log(`Max advance global: ${adv}`)

const employeeFr = EmployeeFactory.getInstance().getNewEmployee({ c: 'S', l: 'country', v: 'fr' }) as EmployeeFr
employeeFr.frAdvanceField = '100'
adv = employeeFr.getMaxAdvance('M10')

console.log(`Max advance global fr: ${adv}`)
}

const localtestLogging = logDuration(localtest);
const basicLoging = logDuration(()=>true)

localtestLogging()
basicLoging()