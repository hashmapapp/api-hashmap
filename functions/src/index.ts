import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express = require('express');
import * as cors from 'cors';
import { HashmapCore } from './hashmap/core';

const app: express.Application = express();
app.use(cors({ origin: true }));
admin.initializeApp();
const firestore = admin.firestore();
const Widgets = new HashmapCore(firestore);

app.get('/search', (req, res) => res.send(Widgets.find(req)));

exports.widgets = functions.https.onRequest(app);