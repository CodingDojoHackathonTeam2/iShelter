# Developer's ReadMe

The purpose of this document is to give developer guidance on 
implementing, maintaining and enhancing iShelter. 

## App architecture

This implementation of iShelter is a React.js SPA (Single Page Application) that uses Firebase's backend services (authentication, database, hosting, and cloud storage).

## Running iShelter locally

- Clone this repo
- Install dependant packages
`cd Client && npm i`
- Start app
`npm run dev`

This repo is already pre-configured to run with Firebase.

## Data Models and CRUD functions using Firestore

In contrast to traditional full stack application stacks like
MERN, Python Django and Java Spring, iShelter implements its
data models on the front end within the React app. 

Data model files are stored in `Client/src/models`in `.js` or `.ts`
files (TypeScript is encouraged). Generally only one class should be
implemented per file, but exceptions can occur.

Each data model file imports appropriate functions from the Firebase
SDK for sending queries to Firestore from `firebase/firestore` in 
addtion to the `db` object from the local Firebase config file
`{relative path to}/configs/firebaseConfig`

### Data Models

TypeScript is strongly encouraged so each data model file will need 
a TypeScript interface to type the parameter object for a given 
class's constructor. Using the `Host` class as an example, the
interface will look like this:

```export interface hostProperties {
    uid?: string;
    hostUid: string;
    firstName?: string;
    lastName?: string;
    street?: string;
    street2?: string;
    city?: string;
    state?: string;
    postal?: string;
    country?: string;
    phone?: string;
    email?: string;
}```

### CRUD Operations

#### Create

*TO BE FILLED WITH CREATE OPERATION DESCRIPTIONS*

#### Read

*TO BE FILLED WITH READ OPERATION DESCRIPTIONS*

#### Update

*TO BE FILLED WITH UPDATE OPERATION DESCRIPTIONS*

#### Delete

*TO BE FILLED WITH DELETE OPERATION DESCRIPTIONS*

---

*LAST UPDATED ON: (DATE)*
