/*
The Shelter class is a data model representing a volunteer host's 
shelter and accomodations. The class includes methods using
CRUD actions with Firestore 
*/

// TypeScript interface for use with the constructor
interface ShelterProperties {
    uid: string; //UID created using Firebase 
    userUid: string; //UID of user using Firebase Auth
    country: string;
    address: string;
    coordinates?: string;
    people_capacity: number;
    lodging_time: number;
    languages: string[];
    pets?: boolean | null;
    legal_assistance?: boolean | null;
    kid_friendly?: boolean | null;
    emergency_medical_assistance?: boolean | null;
    transportation?: boolean | null;
    childcare_support?: boolean | null;
    first_aid?: boolean | null;
    active?: boolean | null;
}

class Shelter {
    uid: string; //UID created using Firebase 
    userUid: string; //UID of user using Firebase Auth
    country: string;
    address: string;
    coordinates: string;
    people_capacity: number;
    lodging_time: number;
    languages: string[];

    pets: boolean | null;
    legal_assistance: boolean | null;
    kid_friendly: boolean | null;
    emergency_medical_assistance: boolean | null;
    transportation: boolean | null;
    childcare_support: boolean | null;
    first_aid: boolean | null;
    active: boolean | null;
    created_at: Date;
    updated_at: Date;

    constructor(properties: ShelterProperties) {
        this.uid = properties.uid || '';
        this.userUid = properties.userUid || '';
        this.country = properties.country || '';
        this.address = properties.address || '';
        this.coordinates = properties.coordinates || '';
        this.people_capacity = properties.people_capacity || 0;
        this.lodging_time = properties.lodging_time || 0;
        this.languages = properties.languages || [];

        this.pets = properties.pets || null;
        this.legal_assistance = properties.legal_assistance || null;
        this.kid_friendly = properties.kid_friendly || null;
        this.emergency_medical_assistance = properties.emergency_medical_assistance || null;
        this.transportation = properties.transportation || null;
        this.childcare_support = properties.childcare_support || null;
        this.first_aid = properties.first_aid || null;

        this.active = properties.active || null;

        this.created_at = new Date();
        this.updated_at = new Date();
    }
}

export default Shelter;
