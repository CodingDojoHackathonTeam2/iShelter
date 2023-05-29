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

```ts
export interface hostProperties {
    uid?: string; // The ? means this attribute is optional
    hostUid: string; // Without the ? this attribute is mandatory
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
}
```

When writing interfaces, keep in mind which attributes can be marked
optional with a `?` or are mandatory.

#### Class attributes
In writing the class itself, you will include two static attributes
`TABLE` and `COLLECTION`, both being `readonly` variables with
`TABLE` being a string representing the Collection name in Firestore
(being equivalent to an SQL table) and the Collection being the
return value of the `collection()` function from `db` and the
collection named stored in `TABLE`

The object attributes will be listed and typed as well.

Here is the example for the `Host` class:
```ts
export class Host {
    static readonly TABLE = "Hosts";
    static readonly COLLECTION = collection(db, Host.TABLE);

    uid: string;
    hostUid: string;
    firstName: string;
    lastName: string;
    street: string;
    street2: string;
    city: string;
    state: string;
    postal: string;
    country: string;
    phone: string;
    email: string;

    // Rest of class code including CRUD query methods
}
```
#### Constructor

The Constructor takes a single object as an argument whose
attributes are used to assign values to the new object's attributes.

In TypeScript, this will be typed as the interface you wrote earlier
and/or the `DocumentData` type which will come from FireStore
queries.

Using the `Host` class as an example, here is what its Constructor
looks like:
```ts
export class Host {
    // Static and object attributes

    constructor(properties: hostProperties | DocumentData) {
        this.uid = properties.uid || '';
        this.hostUid = properties.hostUid || '';
        this.firstName = properties.firstName || '';
        this.lastName = properties.lastName || '';
        this.street = properties.street || '';
        this.street2 = properties.street2 || '';
        this.city = properties.city || '';
        this.state = properties.state || '';
        this.postal = properties.postal || '';
        this.country = properties.country || '';
        this.phone = properties.phone || '';
        this.email = properties.email || '';
    }

    // Remainder of class code
}
```

### CRUD Operations

The CRUD object methods should be implemented within the class code.

Firestore is a document based NoSQL database similar to MongoDB. 
Documents are sent to Firestore as Javascript objects. Because 
Firestore queries cannot natively accomodate custom TypeScript or
Javascript classes, a `converter` method must be implemented. 

The `converter` method follows a pattern from Firebase's
documentation: [Firebase: Custom Objects](https://firebase.google.com/docs/firestore/query-data/get-data#custom_objects)

Here is an example from the `Host` class:
```ts
export class Host {
    // Attributes and constructor

    static converter = {
        toFirestore: (host: Host): hostProperties => {
            return {
                uid: host.uid,
                hostUid: host.hostUid,
                firstName: host.firstName,
                lastName: host.lastName,
                street: host.street,
                street2: host.street2,
                city: host.city,
                state: host.state,
                postal: host.postal,
                country: host.country,
                phone: host.phone,
                email: host.email,
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new Host(data);
        }
    }
}
```
Minimally each data model should have the `create()`, `getAll()`, 
`getById()`, and `update()` methods. Depending on the use of the
class, other `getBy...` methods may be needed. At this time,
`delete()` methods are optional.

#### Create

The `create()` method assumes the object has been instantiated so
that the `create()` method can simply be called from that object.
The `create()` method utilizes query functions from Firebase's SDK.

Here is an example from the `Host` class:
```ts
    async create(): Promise<string> {
        console.log("trying to save")
        const res = await addDoc(Host.COLLECTION, {}) //generate a placeholder ID
        console.log(res.id);
        const ref = doc(db, Host.TABLE, res.id) // get document reference with converter
            .withConverter(Host.converter); 
        await setDoc(ref, this) // Save new data
        return res.id; 
    }
```

#### Read

The two mandatory `static` read methods are `getAll()` and 
`getById()`. Objects are instantiated locally depending on the
query results from Firestore which is why they are `static` methods.

Here are the examples of the `getAll()` and `getById()` methods in
the `Host` class:

```ts
// rest of class code
    static async getALL(): Promise<Array<Host>> {
        const results: Host[] = [];
        const querySnapshot = await getDocs(Host.COLLECTION);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const record = {["uid"]:doc.id, ...doc.data()}
            results.push(new Host(record));
          });
        return results;
    }

    static async getById(hostId: string): Promise<Host | null> {
        const docRef = doc(db, Host.TABLE, hostId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const hostData = docSnap.data();
            hostData.uid = hostId;
            return new Host(hostData);
        } else {
            return null;
        }
    }
```

#### Update

The `update()` method overwrites a given document based on its
uid and returns a `true` if the update was successful or a 
`false` if there was an error and outputs the error to the 
browser console.

Here's an example from the `Host` class:

```ts
    async update(): Promise<boolean> {
        const ref = doc(db, Host.TABLE, this.uid);
        try {
            const dataObj: object = Host.converter.toFirestore(this);
            await setDoc(ref, dataObj);
            return true;

        } catch (error) {
            console.error("Failed to save document");
            console.error((error as Error).message);
            return false;
        }
    }
```

#### Delete

`delete()` methods are optional at this time. Depending on the
use of a given class, they may be necessary.

#### Firestore CRUD documentation
For more information on constructing queries to Firestore,
consult their documentation here:

(Get data with Cloud Firestore)[https://firebase.google.com/docs/firestore/query-data/get-data]

*LAST UPDATED ON: 5/29/23*
