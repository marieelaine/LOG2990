import { HttpHandler, HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

export class HttpHandlerMock extends HttpHandler {
    private http: HttpClient;
    public constructor() {
        super();
    }
    // tslint:disable-next-line:no-any
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        // tslint:disable-next-line:no-any
        return this.http.get<any>("");
    }
}

export class ActivatedRouteMock extends ActivatedRoute {
    public constructor() {
        super();
        this.snapshot = new ActivatedRouteSnapshot();
        this.snapshot.params = {
            ["idPartie"]: "123"
        };
    }
}
