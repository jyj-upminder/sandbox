
export interface ISelect {
  id: number;
  title: string;
}

export interface IProject {
  id: number;
  name: string;
  code?: string;
  clientId?: number;
  status?: number;
  level?: number;
  masterKey?: number;
  parentId?: number;
}

export interface IClient {
  code: number;
  fullname: string;
  streetNumber?: string;
  streetName?: string;
  postalCode?: string;
  city?: string;
  isActive?: boolean;
}

let myselect: ISelect[];
const myclients: IClient[] = [
  { code: 1, fullname: "p1" },
  { code: 2, fullname: "p2" }
];

const myprojects: IProject[] = [{ id: 1, name: "p1" }, { id: 2, name: "p2" }];

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}


type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

function select<T, K extends keyof T>(c: T[], i: K, t: K): ISelect[] {
  const res = c.map(x => {
    return {
      id: getProperty(x, i),
      title: getProperty(x, t)
    };
  });

  return (res as unknown) as ISelect[];
}

myselect = select(myprojects,"id","name")
myselect = select(myclients,"code","fullname")

myselect = myprojects.map(({ id, name: title }) => ({ id, title }));
myselect = myclients.map(({ code:id, fullname: title }) => ({ id, title }));
