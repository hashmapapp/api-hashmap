// import { NotFound } from 'http-errors';
// const admin = require('firebase-admin');
import { HASHMAPS_COLLECTION } from '../constants';

// const db = admin.firestore();

// // async function listItems(userId) {
// //   try {
// //     const collection = await db.collection(HASHMAPS_COLLECTION);
// //     let snapshot;
// //     if (userId) {
// //       snapshot = await collection.where('userId', '==', userId).get();
// //     } else {
// //       snapshot = await collection.get();
// //     }

// //     let result = [];
// //     snapshot.forEach((doc) => {
// //       const { name, created, type, description, url } = doc.data();

// //       result.push({
// //         name,
// //         created,
// //         type,
// //         description,
// //         url,
// //         id: doc.id,
// //       });
// //     });
// //     return result;
// //   } catch (e) {
// //     throw e;
// //   }
// // }

// // exports.listItems = listItems;

// // async function getItem(itemId, userId) {
// //   try {
// //     const snapshot = await db.collection(COLLECTION_NAME).doc(itemId).get();

// //     const data = snapshot.data();
// //     if (!data || data.userId !== userId) {
// //       throw new NotFound('Item not found');
// //     }
// //     return data;
// //   } catch (error) {
// //     return error;
// //   }
// // }

// exports.getItem = getItem;

export const createItem = async (db: any, item: any) => {
  try {
    const addDoc = await db.collection(HASHMAPS_COLLECTION).add(item);
    return { ...item, id: addDoc.id };
  } catch (error) {
    throw error;
  }
};

// exports.createItem = createItem;

// // async function updateItem(itemId, data) {
// //   try {
// //     const itemRef = await db.collection(COLLECTION_NAME).doc(itemId);
// //     const item = await itemRef.get();
// //     if (!item.exists) {
// //       throw new NotFound('Item not found');
// //     }
// //     const newRecord = {
// //       ...data,
// //       updated: Date.now(),
// //     };
// //     await itemRef.update(newRecord);
// //     return { ...item.data(), ...newRecord, id: itemId };
// //   } catch (error) {
// //     throw error;
// //   }
// // }

// // exports.updateItem = updateItem;

// // async function deleteItem(itemId) {
// //   try {
// //     const docRef = db.collection(COLLECTION_NAME).doc(itemId);
// //     const snapshot = await docRef.get();
// //     const data = snapshot.data();
// //     if (!data) {
// //       throw new NotFound('No record found');
// //     }
// //     await docRef.delete();
// //     return { status: 'OK' };
// //   } catch (error) {
// //     throw error;
// //   }
// // }

// // exports.deleteItem = deleteItem;
