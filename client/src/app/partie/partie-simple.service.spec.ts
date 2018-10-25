import { TestBed, inject } from "@angular/core/testing";
import { PartieSimpleService } from "./partie-simple.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("PartieSimpleService", () => {
    let service: PartieSimpleService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PartieSimpleService
            ],
            imports: [
                HttpClientTestingModule
            ]
        });

        service = TestBed.get(PartieSimpleService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
