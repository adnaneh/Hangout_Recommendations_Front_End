export interface LoginInfo {
    uname: string,
    pword: string
}

/** Struct of an event*/
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
    cover_url: string,
    latitude: any,
    longitude: any,
    occurrences: any,
    large_category: string,
    small_category: string
}


export interface Event_brief {
    event_id: number,
    title: string,
    address_street: string,
    address_city: string,
    cover_url: string,
    large_category: string,
    nearest: string
}

/** Struct of events */
export interface Events {
    event: Event_brief[]
}