/** Login format */
export interface LoginInfo {
    unique_key: string,
    pword: string
}

export interface LoginResp {
    user_online: any,
    login_state: boolean,
    description: string | null,
    uname: string
}

/** Signup format */
export interface SignupInfo {
    uname: string,
    pword: string,
    address: string | null,
    email: string,
    city: string | null
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

/** Struct of  */
export interface sendCaptchaInfo {
    email: string,
    captcha: string
}

/** Struct of reset password */
export interface resetPswInfo {
    email: string,
    pword: string
}

/** Category */
export const Category = {

    "Animations":
    {
        "Atelier/Cours": 6,
        "Autre animation": 7,
        "Balade": 8,
        "Conférence / Débat": 9,
        "Lecture / Rencontre": 10,
        "Loisirs / Jeux": 11,
        "Stage": 12,
        "Visite guidée": 13
    }
    ,
    "Concerts": {
        "Autre concert": 14,
        "Chanson français": 15,
        "Classique": 16,
        "Folk": 17,
        "Hip-Hop": 18,
        "Jazz": 19,
        "Musiques du Monde": 20,
        "Pop / Variété": 21,
        "Reggae": 22,
        "Rock": 23,
        "Soul/Funk": 24,
        "Électronique": 25
    }
    ,
    "Événements": {
        "Autre événement": 26,
        "Brocante / Marché": 27,
        "Festival / Cycle": 28,
        "Fête / Parade": 29,
        "Salon": 30,
        "Soirée / Bal": 31,
        "Événement sportif": 32
    }
    ,
    "Expositions": {
        "Art Contemporain": 33,
        "Autre expo": 34,
        "Beaux-Arts": 35,
        "Design / Mode": 36,
        "Histoire / Civilisations": 37,
        "Illustration / BD": 38,
        "Photographie": 39,
        "Sciences / Techniques": 40,
        "Street-art": 41
    }
    ,
    "Spectacles": {
        "Autre spectacle": 42,
        "Cirque / Art de la Rue": 43,
        "Danse": 44,
        "Humour": 45,
        "Jeune public": 46,
        "Opéra / Musical": 47,
        "Projection": 48,
        "Théâtre": 49
    }


};

export const city_name = [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Strasbourg",
    "Montpellier",
    "Bordeaux",
    "Lille",
    "Rennes",
    "Reims",
    "Le Havre",
    "Cergy - Pontoise",
    "Saint - Étienne",
    "Toulon",
    "Angers",
    "Grenoble",
    "Dijon",
    "Nîmes",
    "Aix - en - Provence",
    "Saint - Quentin - en - Yvelines",
    "Brest",
    "Le Mans",
    "Amiens",
    "Tours",
    "Limoges",
    "Clermont - Ferrand",
    "Villeurbanne",
    "Besançon",
    "Orléans",
    "Metz",
    "Rouen",
    "Mulhouse",
    "Perpignan",
    "Caen",
    "Boulogne - Billancourt",
    "Nancy",
    "Cannes"
].sort()