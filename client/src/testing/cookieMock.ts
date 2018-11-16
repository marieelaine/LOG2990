import {CookieService} from "ngx-cookie-service";

export class CookieServiceMock extends CookieService {
    public constructor() {
        const doc: Document = document;
        super(doc);
    }
}
