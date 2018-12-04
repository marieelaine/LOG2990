import { Injectable, ErrorHandler } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as route from "../constantes";
import { Joueur } from "../admin/joueur";
import { PartieSimpleInterface } from "../../../../common/partie-simple-interface";
import { PartieMultipleInterface } from "../../../../common/partie-multiple-interface";

@Injectable({
  providedIn: "root"
})
export class ListePartieServiceService {

  public constructor( private http: HttpClient ) {}

  public getListePartieSimple(): Observable<PartieSimpleInterface[]> {

      return this.http.get<PartieSimpleInterface[]>(route.GET_LISTE_SIMPLE_URL);
  }

  public async supprimerPartieSimple(partieId: string): Promise<void> {

    this.http.delete(route.DELETE_PARTIE_SIMPLE_URL + partieId).toPromise()
      .catch(() => ErrorHandler);
  }

  public getListePartieMultiple(): Observable<PartieMultipleInterface[]> {

    return this.http.get<PartieMultipleInterface[]>(route.GET_LISTE_MULTIPLE_URL);
  }

  public async supprimerPartieMultiple(partieId: string): Promise<void> {

    this.http.delete(route.DELETE_PARTIE_MULTIPLE_URL + partieId).toPromise()
    .catch(() => ErrorHandler);
  }

  public async reinitialiserTempsPartieSimple(partieId: string, tempsSolo: Array<Joueur>, tempsUnContreUn: Array<Joueur>): Promise<void> {

    this.http.put(route.REINITIALISER_TEMPS_SIMPLE_URL + partieId, { tempsSolo, tempsUnContreUn }).toPromise()
    .catch(() => ErrorHandler);
  }

  public async reinitialiserTempsPartieMultiple(partieId: string, tempsSolo: Array<Joueur>,
                                                tempsUnContreUn: Array<Joueur>): Promise<void> {

    this.http.put(route.REINITIALISER_TEMPS_MULTIPLE_URL + partieId, { tempsSolo, tempsUnContreUn }).toPromise()
    .catch(() => ErrorHandler);
  }

  public getListePartieSimpleEnAttente(): Observable<string[]> {

    return this.http.get<string[]>(route.GET_PARTIE_SIMPLE_ATTENTE);
  }

  public ajouterPartieSimpleEnAttente(partieId: string): Observable<string> {

    return this.http.post<string>(route.ADD_PARTIE_SIMPLE_ATTENTE, { partieId });
  }

  public supprimerPartieSimpleEnAttente(partieId: string): Observable<string> {

    return this.http.delete<string>(route.DELETE_PARTIE_SIMPLE_ATTENTE + partieId);
  }

  public getListePartieMultipleEnAttente(): Observable<string[]> {

    return this.http.get<string[]>(route.GET_PARTIE_MULTIPLE_ATTENTE);
  }

  public ajouterPartieMultipleEnAttente(partieId: string): Observable<string> {

    return this.http.post<string>(route.ADD_PARTIE_MULTIPLE_ATTENTE, { partieId });
  }

  public supprimerPartieMultipleEnAttente(partieId: string): Observable<string> {

    return this.http.delete<string>(route.DELETE_PARTIE_MULTIPLE_ATTENTE + partieId);
  }

  public async getChannelIdSimple(): Promise<string> {
    return this.http.get<string>(route.GET_CHANNEL_ID_SIMPLE).toPromise();
  }

  public async getChannelIdMultiple(): Promise<string> {
    return this.http.get<string>(route.GET_CHANNEL_ID_MULTIPLE).toPromise();
  }

  public async joindrePartieMultijoueurSimple(partieId: string, channelId: string): Promise<void> {
      this.http.post(route.JOINDRE_PARTIE_MULTIJOUER_SIMPLE, {partieId, channelId}).toPromise().catch(() => ErrorHandler);
  }

  public async joindrePartieMultijoueurMultiple(partieId: string, channelId: string): Promise<void> {
    this.http.post(route.JOINDRE_PARTIE_MULTIJOUER_MULTIPLE, {partieId, channelId}).toPromise().catch(() => ErrorHandler);
  }

  public async dialogAttenteSimpleFerme(): Promise<void> {
    this.http.post(route.DIALOG_ATTENTE_SIMPLE_FERME, {}).toPromise().catch(() => ErrorHandler);
  }

  public async dialogAttenteMultipleFerme(): Promise<void> {
    this.http.post(route.DIALOG_ATTENTE_MULTIPLE_FERME, {}).toPromise().catch(() => ErrorHandler);
  }
}
