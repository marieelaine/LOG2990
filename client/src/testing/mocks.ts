import { HttpHandler, HttpClient, HttpRequest, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

export class HttpHandlerMock extends HttpHandler {
    private http: HttpClient;
    public constructor() {
        super();
    }

    public handle(req: HttpRequest<HttpClient>): Observable<HttpEvent<HttpResponse<string>>> {
        return this.http.get<HttpEvent<HttpResponse<string>>>("");
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
