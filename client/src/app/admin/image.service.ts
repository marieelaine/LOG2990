import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ImageSimple } from "./dialog-simple/image-simple";
import { Observable } from "rxjs";

@Injectable()
export class ImageService {
    private readonly BASE_URL: string = "http://127.0.0.1:3000/images/";
    private readonly AJOUTER_URL: string = this.BASE_URL + "ajouter";
    private readonly SUPPRIMER_URL: string = this.BASE_URL + "delete/";

    constructor(private _http: HttpClient) { }

    public register(imageSimple: ImageSimple): Observable<Object> {
        return this._http.post(this.AJOUTER_URL, imageSimple, {
            observe: "body",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        });
    }

    public delete(imageName: string): Promise<Object> {
        return this._http.delete(this.SUPPRIMER_URL + imageName).toPromise();
    }
}
