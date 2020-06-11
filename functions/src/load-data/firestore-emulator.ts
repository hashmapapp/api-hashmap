import { ConfigFire } from '../config.interface';
import { createItem } from './operations';
import { hashmaps } from './data';

export class FirestoreEmulator implements ConfigFire {
  constructor(public firestore: any) {}

  initializeData = async () => {
    hashmaps.forEach(async (hash: any) => {
      await createItem(this.firestore, hash);
    });
  };
}
