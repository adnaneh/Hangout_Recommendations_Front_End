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

/** Category */
export const Category = {
    "Animations": [
        { "Atelier/Cours": 1 },
        { "Autre animation": 2 },
        { "Balade": 3 },
        { "Conférence / Débat": 4 },
        { "Lecture / Rencontre": 5 },
        { "Loisirs / Jeux": 6 },
        { "Stage": 7 },
        { "Visite guidée": 8 }
    ],
    "Concerts": [
        { "Autre concert": 9 },
        { "Chanson français": 10 },
        { "Classique": 11 },
        { "Folk": 12 },
        { "Hip-Hop": 13 },
        { "Jazz": 14 },
        { "Musiques du Monde":},
        { "Pop / Variété":},
        { "Reggae":},
        { "Rock":},
        { "Soul/Funk":},
        { "Électronique":}
    ],
    "Événements": [
        { "Autre événement": },
        { "Brocante / Marché": },
        { "Festival / Cycle": },
        {}
    ]

};