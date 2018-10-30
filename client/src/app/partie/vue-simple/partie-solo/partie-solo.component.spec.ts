import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieSoloComponent } from './partie-solo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorHandler } from '@angular/core';
import { PartieSimple } from 'src/app/admin/dialog-simple/partie-simple';
// import { ChronoComponent } from '../../chrono/chrono.component';

describe('PartieSoloComponent', () => {
    let component: PartieSoloComponent;
    let fixture: ComponentFixture<PartieSoloComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PartieSoloComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatCardModule
            ],
        })
            .compileComponents()
            .catch(() => ErrorHandler);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartieSoloComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("addNomPartieToChat devrait ajouter le nom de la partie au tableau de messages", () => {
        component["partie"] = new PartieSimple ("nomPartie", new Array<number>(), new Array<number>(), Buffer.from(new Array<number>()),
                                                Buffer.from(new Array<number>()), new Array<Array<string>>(), "");
        component["addNomPartieToChat"]();
        expect(component["messagesChat"][0]).toEqual("Bienvenue dans la partie NomPartie");
    });
});
