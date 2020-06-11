import { ConfigFire } from "../config.interface";
import { HASHMAPS_COLLECTION } from "../constants";

export class HashmapCore implements ConfigFire {
  constructor(public firestore: any) { }

  private findByTitle = (title: string) => {
    const ref = this.firestore.collection(HASHMAPS_COLLECTION).where('title', '>=', title);
    ref.get().then((snapshot: any) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.forEach((doc: any) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
      .catch((err: any) => {
        console.log('Error getting documents', err);
      });
  }

  // private findBySubtitle = (subtitle: string) => { }

  // private findByDescription = (description: string) => { }

  find = (req: any) => {
    if (req.query.hash) {
      console.log(req.query.hash);
      this.findByTitle(req.query.hash);
    } else return;
  }
}