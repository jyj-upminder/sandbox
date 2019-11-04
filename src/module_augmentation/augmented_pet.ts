import { Pet as Pet } from "./pet"

 declare module "./pet" {
  interface Pet {
    age: number;
    walk(location: string):string;
  }
 }

Pet.prototype.walk = (location:string) => `Likes to walk in the ${location}`

export {Pet as PetFr} from "./pet"