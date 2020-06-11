import { NotAcceptable, InternalServerError } from 'http-errors';
import { FireSQL } from 'firesql';
import { ConfigFire } from '../config.interface';
import { HASHMAPS_COLLECTION } from '../constants';

export class HashmapCore implements ConfigFire {
  fireSQL: FireSQL;
  constructor(public firestore: any) {
    this.fireSQL = new FireSQL(firestore);
  }

  // private findByTitle = async (title: string) => {
  //   const ref = this.firestore
  //     .collection(HASHMAPS_COLLECTION)
  //     .where('title', '>=', title);
  //   const snapshot: any = await ref.get();
  //   const results: any = [];
  //   if (snapshot.empty) {
  //     console.log('No matching documents.');
  //     return results;
  //   }
  //   snapshot.forEach((doc: any) => {
  //     // console.log(doc.id, '=>', doc.data());
  //     // results.push({ ...doc.data(), key: doc.id });
  //     results.push({ title: doc.data().title });
  //   });
  //   return results;
  // };

  private findByTitle = async (title: string) => {
    const ref = this.firestore
      .collection(HASHMAPS_COLLECTION)
      .where('title', 'in', [title]);
    const snapshot: any = await ref.get();
    const results: any = [];
    if (snapshot.empty) {
      console.log('No matching documents.');
      return results;
    }
    snapshot.forEach((doc: any) => {
      // console.log(doc.id, '=>', doc.data());
      // results.push({ ...doc.data(), key: doc.id });
      results.push({ title: doc.data().title });
    });
    return results;
  };

  // private findBySubtitle = (subtitle: string) => { }

  // private findByDescription = (description: string) => { }

  find = async (req: any, res: any) => {
    if (req.query.hash) {
      try {
        const result = await this.findByTitle(req.query.hash);
        res.send(result);
      } catch (err) {
        console.log('Error getting documents', err);
        res.send(
          new InternalServerError(`Error getting: ${err.message || 'title'}`)
        );
      }
    }
    return new NotAcceptable(
      "Parâmetro 'hash' é obrigatório para esta consulta"
    );
  };
}
