import {PetFr} from "./augmented_pet"
import {PetSp} from "./pet_sp"

const pet = new PetFr();

pet.name = "Looty";
pet.age = 3;

pet.feed("bacon"); // bacon
console.log(pet.name = "Looty"); // Looty
console.log(pet.age = 3); // 3
console.log(pet.walk("park")); // Likes to walk in the park


const petsp = new PetSp();

petsp.name = "Lucia";
petsp.age = 43;

petsp.feed("paella"); // bacon
console.log(petsp.name = "Looty"); // Looty
console.log(petsp.age = 3); // 3
console.log(petsp.run("park")); // Likes to walk in the park
