import { ErrorHandler, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as route from "../constantes";
import { Joueur } from "../admin/joueur";
import { PartieMultipleInterface } from "../../../../common/partie-multiple-interface";
import { PartieSimpleInterface } from "../../../../common/partie-simple-interface";

@Injectable({
    providedIn: "root"
})
export class PartieService {

    public constructor(
        private http: HttpClient
    ) { }

    public getPartieSimple(partieID: string): Observable<PartieSimpleInterface> {
        return this.http.get<PartieSimpleInterface>(route.GET_PARTIE_SIMPLE + partieID);
    }

    public getPartieMultiple(partieID: string): Observable<PartieMultipleInterface> {
        return this.http.get<PartieMultipleInterface>(route.GET_PARTIE_MULTIPLE + partieID);
    }

    public async ajouterTempsPartieSimple(partieID: string, temps: Joueur, isSolo: boolean): Promise<void> {
        this.http.put(route.ADD_TEMPS_PARTIE_SIMPLE + partieID, { temps, isSolo }).toPromise()
            .catch(() => ErrorHandler);
    }

    public async ajouterTempsPartieMultiple(partieID: string, temps: Joueur, isSolo: boolean): Promise<void> {
        this.http.put(route.ADD_TEMPS_PARTIE_MULTIPLE + partieID, { temps, isSolo }).toPromise()
            .catch(() => ErrorHandler);
    }

    public async differenceTrouveeMultijoueurSimple(channelId: string, diff: number, joueur: string): Promise<void> {
        this.http.post(route.DIFFERENCE_TROUVEE_MULTIJOUEUR_SIMPLE, {channelId, diff, joueur}).toPromise().catch(() => ErrorHandler);
    }

    public async differenceTrouveeMultijoueurMultiple(channelId: string, diff: number, source: string, joueur: string): Promise<void> {
        this.http.post(route.DIFFERENCE_TROUVEE_MULTIJOUEUR_MULTIPLE, {channelId, diff, source, joueur}).toPromise()
        .catch(() => ErrorHandler);
    }

    public async partieMultijoueurSimpleTerminee(channelId: string, joueur: string): Promise<void> {
        this.http.post(route.PARTIE_TERMINEE_MULTIJOUEUR_SIMPLE, {channelId, joueur}).toPromise().catch(() => ErrorHandler);
    }

    public async partieMultijoueurMultipleTerminee(channelId: string, joueur: string): Promise<void> {
        this.http.post(route.PARTIE_TERMINEE_MULTIJOUEUR_MULTIPLE, {channelId, joueur}).toPromise().catch(() => ErrorHandler);
    }

    public async erreurMultijoueurSimple(channelId: string, joueur: string): Promise<void> {
        this.http.post(route.ERREUR_MULTIJOUEUR_SIMPLE, {channelId, joueur}).toPromise().catch(() => ErrorHandler);
    }

    public async erreurMultijoueurMultiple(channelId: string, joueur: string): Promise<void> {
        this.http.post(route.ERREUR_MULTIJOUEUR_MULTIPLE, {channelId, joueur}).toPromise().catch(() => ErrorHandler);
    }

    public async supprimerChannelIdSimple(channelId: string): Promise<void> {
        this.http.post(route.SUPPRIMER_CHANNEL_ID_SIMPLE, {channelId}).toPromise().catch(() => ErrorHandler);
    }

    public async supprimerChannelIdMultiple(channelId: string): Promise<void> {
        this.http.post(route.SUPPRIMER_CHANNEL_ID_MULTIPLE, {channelId}).toPromise().catch(() => ErrorHandler);
    }

    public async partieSimpleChargee(channelId: string): Promise<void> {
        this.http.post(route.PARTIE_SIMPLE_CHARGEE, {channelId}).toPromise().catch(() => ErrorHandler);
    }

    public async partieMultipleChargee(channelId: string): Promise<void> {
        this.http.post(route.PARTIE_MULTIPLE_CHARGEE, {channelId}).toPromise().catch(() => ErrorHandler);
    }
}
