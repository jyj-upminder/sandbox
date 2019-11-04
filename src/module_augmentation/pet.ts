export class Pet {
  name: string | undefined;
  
  feed(feedType: string) {
    console.log(feedType);
  }
}