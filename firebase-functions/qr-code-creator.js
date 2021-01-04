const functions = require('firebase-functions');
const storage = require('@google-cloud/storage');

// Firebase Project ID and Service Account Key.
const gcs = storage({
  projectId: 'blind-tasting',
  keyFilename: './serviceAccountKey.json'
});

const bucket = gcs.bucket('blind-tasting.appspot.com');

exports.createUser = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    // Get an object representing the document
    const newUser = snap.data();
    const name = newUser.id;

    newUser.beers.forEach(beer => {

      // create QR Code

      bucket.file(`${user.id}/${beer.name}`).createWriteStream({
        metadata: {
          contentType: info.headers['content-type']
        }
      });
    });

  });
