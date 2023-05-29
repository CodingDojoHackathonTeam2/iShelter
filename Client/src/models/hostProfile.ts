import { db } from "../configs/firebaseConfig";
import { 
    addDoc, 
    doc, 
    setDoc, 
    collection, 
    getDoc, 
    DocumentData, 
    query, 
    where, 
    getDocs 
} from "firebase/firestore";

export interface hostProperties {
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
}

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

    async create(): Promise<string> {
        console.log("trying to save")
        const res = await addDoc(Host.COLLECTION, {}) //generate a placeholder ID
        console.log(res.id);
        const ref = doc(db, Host.TABLE, res.id) // get document reference with converter
            .withConverter(Host.converter); 
        await setDoc(ref, this) // Save new data
        return res.id; 
    }

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

    static async getByUserId(UserId: string): Promise<Host | null>{
        console.log("Looking for profile belonging to", UserId)
        const hostProfiles: DocumentData[] = [];
        const q = query(Host.COLLECTION, where("hostUid", "==", UserId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const record = doc.data();
            record.uid = doc.id;
            hostProfiles.push(record);
        });
        if (hostProfiles.length > 0 ) {
            console.log("Found one!")
            return new Host(hostProfiles[0]);
        } else {
            console.log("Didn't find any")
            return null;
        }
    }


    
}
