export interface LoginInfo {
    user_id: string,
    pword: string
}

export interface Event {
    event_id: number,
    title: string,
    category: string,
    price: string,
    description: string,
    link: string,
    telephone: string,
    tags: string,
    address_street: string,
    address_city: string,
    address_zipcode: string,
    date: string,
    date_end: string,
    contact_mail: string,
    facebook: string,
    website: string,
    latitude: number,
    longitude: number
}

export interface Events {
    event: Event[]
}