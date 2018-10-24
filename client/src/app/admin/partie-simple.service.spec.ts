import { PartieSimpleService } from "./partie-simple.service";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("Partie Simple Service", () => {
    let service: PartieSimpleService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [PartieSimpleService]
        });

        service = TestBed.get(PartieSimpleService);
    });

    it("Should do nothing", () => {
        expect(true).toBeTruthy();
    });
});
