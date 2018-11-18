import { ErrorHandler, Injectable } from "@angular/core";
import { PartieSimple } from "../admin/dialog-simple/partie-simple";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PartieMultiple } from "../admin/dialog-multiple/partie-multiple";
import * as route from "../constantes";
import { TempsUser } from "../admin/temps-user";

@Injectable({
    providedIn: "root"
})
export class PartieService {

    public constructor(
        private http: HttpClient
    ) { }

    public getPartieSimple(partieID: string): Observable<PartieSimple> {
        return this.http.get<PartieSimple>(route.GET_PARTIE_SIMPLE + partieID);
    }

    public getPartieMultiple(partieID: string): Observable<PartieMultiple> {
        return this.http.get<PartieMultiple>(route.GET_PARTIE_MULTIPLE + partieID);
    }

    public async reinitialiserTempsPartieSimple(partieId: string, tempsSolo: Array<TempsUser>, tempsUnContreUn: Array<TempsUser>):
     Promise<void> {

        this.http.put(route.REINITIALISER_TEMPS_SIMPLE_URL + partieId, { tempsSolo, tempsUnContreUn}).toPromise()
            .catch(() => ErrorHandler);
    }

    public async reinitialiserTempsPartieMultiple(partieId: string, tempsSolo: Array<TempsUser>, tempsUnContreUn: Array<TempsUser>):
     Promise<void> {

        this.http.put(route.REINITIALISER_TEMPS_MULTIPLE_URL + partieId, { tempsSolo, tempsUnContreUn}).toPromise()
            .catch(() => ErrorHandler);
    }

    public getListeChannelsMultijoueur(): Observable<string[]> {
        return this.http.get<string[]>(route.GET_LISTE_CHANNELS_MULTIJOUEUR);
    }

    public async ajouterChannelMultijoueur(channelId: string): Promise<string> {
        return this.http.post<string>(route.AJOUTER_CHANNEL_MULTIJOUEUR, { channelId }).toPromise();
    }
}
