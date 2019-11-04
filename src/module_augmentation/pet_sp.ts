import { Pet as Pet } from "./pet"

 declare module "./pet" {
  interface Pet {
    age: number;
    run(location: string):string;
  }
 }

 Pet.prototype.run = (location:string) => `In spain Likes to run in the ${location}`

export {Pet as PetSp} from "./pet"