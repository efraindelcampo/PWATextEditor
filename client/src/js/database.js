// Import the 'idb' package to use with IndexedDB
import { openDB } from "idb";

// Create a function that can be used to start up the database
const initdb = async () =>
  // Create a database named 'jate' and we will use version 1
  openDB("jate", 1, {
    // Sets the database schema if it isn't already defined
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
        // Create an object store for our data inside of the 'jate' db and create a key named 'id' which will automatically be incremented for us
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("Jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Export a function we will use to POST to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  // Create a connection to the database database and version we want to use
  const jateDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction("jate", "readwrite");
  // Open up the desired object store
  const store = tx.objectStore("jate");
  // Use the .put() method on the store and pass in the content
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request
  const result = await request;
  console.log("Data saved to the database", result.value);
};

// TODO: Add logic for a method that gets all the content from the database
// Export a function we will use to GET all from the database, and follow same steps as above
export const getDb = async () => {
  console.log("GET from the database");
  const jateDb = await openDB("jate", 1);
  // Because this is a GET request, privileges are set to 'readonly'
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result;
};

// Invoke our db function
initdb();
