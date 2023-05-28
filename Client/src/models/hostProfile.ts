interface hostProperties {
    uid?: string;
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

class Host {
    uid: string;
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

    constructor(properties: hostProperties) {
        this.uid = properties.uid || '';
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
}
