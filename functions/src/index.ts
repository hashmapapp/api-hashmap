import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express = require('express');
import * as cors from 'cors';
import algoliasearch from 'algoliasearch';
import { HashmapCore } from './hashmap/core';
import { FirestoreEmulator } from './load-data/firestore-emulator';
import { HASHMAPS_COLLECTION } from './constants';

const app: express.Application = express();
app.use(cors({ origin: true }));
admin.initializeApp();
const firestore = admin.firestore();
const widgets = new HashmapCore(firestore);

// const client = algoliasearch(functions.config().algolia.app_id,
// functions.config().algolia.api_key);

const client = algoliasearch('0H91QHGO2X', '31f13749fc10f335a2dcf74323c79607');
const ALGOLIA_POSTS_INDEX_NAME = 'dev_HASHMAP';

// if (process.env.NODE_ENV !== 'test') {
//   console.log('Refresh Data');
//   const firestoreEmulator = new FirestoreEmulator(firestore);
//   firestoreEmulator.initializeData().catch((err: any) => console.log(err));
// }

app.get('/search', async (req, res) => widgets.find(req, res));

exports.widgets = functions.https.onRequest(app);

exports.onHashmapCreate = functions.firestore
  .document('hashmaps/{hashmapId}')
  .onCreate((snap, context) => {
    console.log('onCreate');

    // Get the note document
    const hashmap = snap.data();
    console.log(hashmap);

    // Add an 'objectID' field which Algolia requires
    hashmap.objectID = context.params.hashmapId;

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);
    return index.saveObject(hashmap);
  });
