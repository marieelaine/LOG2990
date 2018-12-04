export const IP: string = "localhost";
export const BASE_URL: string = "http://" + IP + ":3000/";
export const SIMPLE: string = "partieSimple/";
export const MULTIPLE: string = "partieMultiple/";
export const USERS: string = "users/";
export const LISTE_PARTIES: string = "/liste-parties";

export const GET_LISTE_SIMPLE_URL: string = BASE_URL + SIMPLE + "getListePartieSimple";
export const AJOUTER_PARTIE_SIMPLE_URL: string = BASE_URL + SIMPLE + "ajouter/";
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

export const ADD_TEMPS_PARTIE_SIMPLE: string = BASE_URL + SIMPLE + "addTempsPartieSimple/";
export const ADD_TEMPS_PARTIE_MULTIPLE: string = BASE_URL + MULTIPLE + "addTempsPartieMultiple/";

export const GET_CHANNEL_ID_SIMPLE: string = BASE_URL + SIMPLE + "getChannelIdSimple";
export const DIFFERENCE_TROUVEE_MULTIJOUEUR_SIMPLE: string = BASE_URL + SIMPLE + "differenceTrouveeMultijoueurSimple";
export const JOINDRE_PARTIE_MULTIJOUER_SIMPLE: string = BASE_URL + SIMPLE + "joindrePartieMultijoueurSimple";
export const PARTIE_TERMINEE_MULTIJOUEUR_SIMPLE: string = BASE_URL + SIMPLE + "partieTermineeMultijoueurSimple";
export const ERREUR_MULTIJOUEUR_SIMPLE: string = BASE_URL + SIMPLE + "erreurMultijoueurSimple";
export const SUPPRIMER_CHANNEL_ID_SIMPLE: string = BASE_URL + SIMPLE + "supprimerChannelIdSimple";
export const PARTIE_SIMPLE_CHARGEE: string = BASE_URL + SIMPLE + "partieSimpleChargee";

export const GET_CHANNEL_ID_MULTIPLE: string = BASE_URL + MULTIPLE + "getChannelIdMultiple";
export const DIFFERENCE_TROUVEE_MULTIJOUEUR_MULTIPLE: string = BASE_URL + MULTIPLE + "differenceTrouveeMultijoueurMultiple";
export const JOINDRE_PARTIE_MULTIJOUER_MULTIPLE: string = BASE_URL + MULTIPLE + "joindrePartieMultijoueurMultiple";
export const PARTIE_TERMINEE_MULTIJOUEUR_MULTIPLE: string = BASE_URL + MULTIPLE + "partieTermineeMultijoueurMultiple";
export const ERREUR_MULTIJOUEUR_MULTIPLE: string = BASE_URL + MULTIPLE + "erreurMultijoueurMultiple";
export const SUPPRIMER_CHANNEL_ID_MULTIPLE: string = BASE_URL + MULTIPLE + "supprimerChannelIdMultiple";
export const PARTIE_MULTIPLE_CHARGEE: string = BASE_URL + MULTIPLE + "partieMultipleChargee";

export const AJOUTER_USERS_URL: string = BASE_URL + USERS + "ajouter/";
export const DELETE_USERS_URL: string = BASE_URL + USERS + "delete/";

export const METHODE_POST: string = "POST";
export const METHODE_GET: string = "GET";
export const METHODE_DELETE: string = "DELETE";
export const METHODE_PUT: string = "PUT";
export const RESPONSE_FORM: string = "<form />";

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

export const DEUX_POINTS_TEMPS_FORMAT: string = ":";
export const ZERO_STR_FORMAT: string = "0";
export const STR_VIDE: string = "";
export const VIRGULE_STR_FORMAT: string = ",";
export const IMAGE_BLOB: string = "image/bmp";

export const CONVERSION_TEMPS: number = 10;
export const TIMEOUT: number = 1000;
export const OFFSET_ADDITIONNEL: number = 10;
export const LINE_WIDTH: number = 1.5;
export const PARTIE_SECOND_ELEMENT: number = 2;

export const FONT: string = "600 28px Arial";
export const TEXT_ALIGN: string = "center";
export const ERREUR_COULEUR_INTERIEUR: string = "#ff0000";
export const ERREUR_COULEUR_CONTEUR: string = "#000000";

export const HAUTEUR_DIALOGUE: string = "190px";
export const LARGEUR_DIALOGUE: string = "600px";

export const CHARGEMENT_IMAGES: string = "Chargement des images";
export const DIFF_TROUVE_PAR: string = " - Différence trouvée par ";
export const DIFF_TROUVE: string = " - Différence trouvée.";
export const FELICITATIONS_MULTI: string = "FÉLICITATIONS, VOUS AVEZ GAGNÉ!";
export const FELICITATIONS: string = "FÉLICITATIONS!";
export const PERDU_MULTI: string = "VOUS AVEZ PERDU!";
export const AUDIO_APPLAUDISSEMENT: string = "../assets/applause.mp3";
export const AUDIO_REUSSI: string = "../assets/yes.wav";
export const AUDIO_ERREUR: string = "../assets/no.mp3";
export const AUDIO_PERDANT: string = "../assets/LoserSound.mp3";
export const MESSAGE_TROUVE_PART1: string = "Vous avez trouvé ";
export const DIFFERENCES: string = " différences";
export const ANONYME: string = "Anonyme";
export const ERREUR: string = "ERREUR";
export const ERREUR_CHAT: string = " - ERREUR.";
export const ERREUR_CHAT_PAR: string = " - ERREUR par ";
export const USERNAME_STR: string = "username";
export const CONTEXT_2D: string = "2d";
export const CANVAS: string = "canvas";
export const STRING_VIDE: string = "";
