import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ListePartieServiceService } from "../liste-partie-service.service";

@Component({
  selector: 'app-dialog-vue-attente',
  templateUrl: './dialog-vue-attente.component.html',
  styleUrls: ['./dialog-vue-attente.component.css']
})
export class DialogVueAttenteComponent implements OnDestroy {

  private partieId: string;

  constructor(
    public dialogRef: MatDialogRef<DialogVueAttenteComponent>,
    public router: Router,
    public listePartieService: ListePartieServiceService,
    @Inject(MAT_DIALOG_DATA) data
    ) {
    this.partieId = data.id;
    dialogRef.disableClose = true;
  }

  protected onDialogClose(): void {
    this.listePartieService.deletePartieSimpleEnAttente(this.partieId).subscribe((res) => {
      this.router.navigate(["/liste-parties/"]);
      this.dialogRef.close();
    });
  }

  ngOnDestroy(): void {
    this.listePartieService.deletePartieSimpleEnAttente(this.partieId).subscribe((res) => {
      this.router.navigate(["/liste-parties/"]);
      this.dialogRef.close();
     });
  }

}
