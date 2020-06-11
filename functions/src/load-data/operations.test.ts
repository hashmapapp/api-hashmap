// import * as testing from '@firebase/testing';

// function authedApp(auth: any) {
//   return testing
//     .initializeTestApp({ projectId: 'test-project', auth })
//     .firestore();
// }

// beforeEach(() => {
//   // Set the emulator database before each test
//   setDb(authedApp(null));
// });

// beforeEach(async () => {
//   // Clear the database before each test
//   await testing.clearFirestoreData({ projectId: 'test-project' });
// });

// afterEach(async () => {
//   await Promise.all(testing.apps().map((app) => app.delete()));
// });
