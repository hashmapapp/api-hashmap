import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';
// import express = require('express');
// import * as cors from 'cors';
import * as admin from 'firebase-admin';
// import { hashmaps } from './load-data/data';
// import { FirestoreEmulator } from './load-data/firestore-emulator';
// import { hashmaps } from './load-data/data';
// import { HASHMAPS_COLLECTION } from './constants';

// const app: express.Application = express();
// app.use(cors({ origin: true }));
admin.initializeApp();
// const firestore = admin.firestore();
// const widgets = new HashmapCore(firestore);

// const client = algoliasearch(functions.config().algolia.app_id,
// functions.config().algolia.api_key);

const client = algoliasearch('0H91QHGO2X', '31f13749fc10f335a2dcf74323c79607');
const ALGOLIA_POSTS_INDEX_NAME = 'prod_HASHMAP';

if (process.env.NODE_ENV !== 'test') {
  // console.log('Refresh Data');
  // const firestoreEmulator = new FirestoreEmulator(firestore);
  // firestoreEmulator.initializeData().catch((err: any) => console.log(err));
}

// exports.widgets = functions.https.onRequest(app);

exports.onHashmapWrite = functions.firestore
  .document('hashmaps/{hashmapId}')
  .onWrite((change, context) => {
    const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);
    const objectID = context.params.hashmapId;
    if (change.after.exists) {
      const hashmap = change.after.data() || {};
      if (hashmap.createdAt) {
        hashmap.createdAt = hashmap.createdAt.toDate();
      }
      if (hashmap.updatedAt) {
        hashmap.updatedAt = hashmap.updatedAt.toDate();
      }
      if (hashmap.imagePath) {
        delete hashmap.imagePath;
      }
      if (hashmap.homeHashmap) {
        delete hashmap.homeHashmap;
      }
      if (hashmap.textImage) {
        delete hashmap.textImage;
      }
      hashmap.objectID = objectID;
      return index.saveObject(hashmap);
    }
    return index.deleteObject(objectID);
  });
