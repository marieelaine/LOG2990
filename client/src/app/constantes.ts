export const BASE_URL: string = "http://localhost:3000/";
export const SIMPLE: string = "partieSimple/";
export const MULTIPLE: string = "partieMultiple/";

export const GET_LISTE_SIMPLE_URL: string = BASE_URL + SIMPLE + "getListePartieSimple";
export const DELETE_PARTIE_SIMPLE_URL: string = BASE_URL + SIMPLE + "delete/";
export const REINITIALISER_TEMPS_SIMPLE_URL: string = BASE_URL + SIMPLE + "reinitialiseTemps/";

export const GET_PARTIE_SIMPLE_ATTENTE: string = BASE_URL + "getPartieSimpleEnAttente/";
export const ADD_PARTIE_SIMPLE_ATTENTE: string = BASE_URL + "addPartieSimpleEnAttente/";
export const DELETE_PARTIE_SIMPLE_ATTENTE: string = BASE_URL + "deletePartieSimpleEnAttente/";
export const DIALOG_ATTENTE_SIMPLE_FERME: string = BASE_URL + "dialogAttenteSimpleFerme/";

export const GET_PARTIE_MULTIPLE_ATTENTE: string = BASE_URL + "getPartieMultipleEnAttente/";
export const ADD_PARTIE_MULTIPLE_ATTENTE: string = BASE_URL + "addPartieMultipleEnAttente/";
export const DELETE_PARTIE_MULTIPLE_ATTENTE: string = BASE_URL + "deletePartieMultipleEnAttente/";
export const DIALOG_ATTENTE_MULTIPLE_FERME: string = BASE_URL + "dialogAttenteMultipleFerme/";

export const GET_LISTE_MULTIPLE_URL: string = BASE_URL + MULTIPLE + "getListePartieMultiple";
export const AJOUTER_PARTIE_MULTIPLE_URL: string = BASE_URL + MULTIPLE + "ajouter/";
export const DELETE_PARTIE_MULTIPLE_URL: string = BASE_URL + MULTIPLE + "delete/";
export const REINITIALISER_TEMPS_MULTIPLE_URL: string = BASE_URL + MULTIPLE + "reinitialiseTemps/";

export const GET_PARTIE_SIMPLE: string = BASE_URL + SIMPLE + "getPartieSimple/";
export const GET_PARTIE_MULTIPLE: string = BASE_URL + MULTIPLE + "getPartieMultiple/";

export const GET_CHANNEL_ID_SIMPLE: string = BASE_URL + SIMPLE + "/getChannelIdSimple";
export const AJOUTER_CHANNEL_MULTIJOUEUR_SIMPLE: string = BASE_URL + SIMPLE + "/addChannelMultijoueurSimple";
export const DIFFERENCE_TROUVEE_MULTIJOUEUR_SIMPLE: string = BASE_URL + SIMPLE + "/differenceTrouveeMultijoueurSimple";
export const JOINDRE_PARTIE_MULTIJOUER_SIMPLE: string = BASE_URL + SIMPLE + "/joindrePartieMultijoueurSimple";

export const GET_CHANNEL_ID_MULTIPLE: string = BASE_URL + MULTIPLE + "/getChannelIdMultiple";
export const AJOUTER_CHANNEL_MULTIJOUEUR_MULTIPLE: string = BASE_URL + MULTIPLE + "/addChannelMultijoueurMultiple";
export const DIFFERENCE_TROUVEE_MULTIJOUEUR_MULTIPLE: string = BASE_URL + MULTIPLE + "/differenceTrouveeMultijoueurMultiple";
export const JOINDRE_PARTIE_MULTIJOUER_MULTIPLE: string = BASE_URL + MULTIPLE + "/joindrePartieMultijoueurMultiple";

export const LONGUEUR_NOM_MIN: number = 3;
export const LONGUEUR_NOM_MAX: number = 20;
export const NB_OBJET_MIN: number = 10;
export const NB_OBJET_MAX: number = 200;

export const BIT_FORMAT: number = 24;
export const WINDOW_WIDTH: number = 640;
export const WINDOW_HEIGHT: number = 480;

export const HEADER_BMP_P1: number = 28;
export const HEADER_BMP_P2: number = 18;
export const HEADER_BMP_P3: number = 22;

export const PARTIE_SIMPLE_NB_IMAGES: number = 2;
export const PARTIE_MULTIPLE_NB_IMAGES: number = 4;
export const DIFF_PARTIE_SIMPLE: number = 7;
export const DIFF_PARTIE_MULTIPLE: number = 14;
export const RGB_WIDTH: number = 4;
export const RGB_FIRST_INCREMENT: number = 1;
export const RGB_SECOND_INCREMENT: number = 2;
export const CONTEXT_GAUCHE_POV1_POSITION: number = 0;
export const CONTEXT_DROITE_POV1_POSITION: number = 1;
export const CONTEXT_GAUCHE_POV2_POSITION: number = 2;
export const CONTEXT_DROITE_POV2_POSITION: number = 3;
