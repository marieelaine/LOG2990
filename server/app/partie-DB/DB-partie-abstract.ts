import {Request, Response} from "express";
import {injectable} from "inversify";
import * as fsx from "fs-extra";
import * as util from "util";
import * as fs from "fs";
import * as uniqid from "uniqid";
import * as constantes from "../constantes";
import { BaseDeDonnees } from "../baseDeDonnees/baseDeDonnees";
import { ChildProcess } from "child_process";
import { Schema, Model, Document } from "mongoose";
import {PartieSimpleInterface} from "../../../common/partie-simple-interface";
import {PartieMultipleInterface} from "../../../common/partie-multiple-interface";

export interface Joueur {
    _nom: string;
    _temps: number;
}

const PARTIE_SECOND_ELEMENT: number = 2;
const TEMPS_SOLO: string = "_tempsSolo";
const TEMPS_UN_CONTRE_UN: string = "_tempsUnContreUn";
const NOM_ANONYME: string = "Anonyme";

@injectable()
export abstract class DBPartieAbstract {

    protected baseDeDonnees: BaseDeDonnees;

    protected modelPartieBuffer: Model<Document>;
    protected modelPartieArray: Model<Document>;

    protected schemaBuffer: Schema;
    protected schemaArray: Schema;

    protected abstract listeChannelsMultijoueur: Map<string, number>;

    public constructor() {
        this.baseDeDonnees = new BaseDeDonnees();

        this.creerSchemaArray();
        this.creerSchemaBuffer();
    }

    public abstract async requeteAjouterPartie(req: Request, res: Response): Promise<void>;

    public abstract async requeteDeletePartie(req: Request, res: Response): Promise<void>;

    public async requetePartieId(req: Request, res: Response): Promise<void> {
        await this.baseDeDonnees.assurerConnection();
        res.send(await this.obtenirPartieId(req.params.id));
    }

    public async requeteGetPartie(req: Request, res: Response): Promise<void> {
        await this.baseDeDonnees.assurerConnection();
        res.send(await this.getPartieById(req.params.id));
    }

    public requeteSupprimerChannelId(req: Request, res: Response): void {
        try {
            this.listeChannelsMultijoueur.delete(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public requeteGetChannelId(req: Request, res: Response): void {
        try {
            const id: string = this.getChannelId();
            this.listeChannelsMultijoueur.set(id, 0);
            res.status(constantes.HTTP_CREATED).json(id);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public requetePartieChargee(req: Request, res: Response): void {
        try {
            let nbrePartiesChargees: number = this.listeChannelsMultijoueur.get(req.body.channelId) as number;
            nbrePartiesChargees++;
            nbrePartiesChargees === constantes.NBRE_PARTIES_MULTIJOUEUR ? this.envoyerPartiesPretes(req.body.channelId)
                : this.listeChannelsMultijoueur.set(req.body.channelId, nbrePartiesChargees);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public async requeteReinitialiserTemps(req: Request, res: Response): Promise<void> {
        await this.baseDeDonnees.assurerConnection();
        try {
            await this.trierTemps(req.params.id, req.body.tempsSolo, TEMPS_SOLO);
            await this.trierTemps(req.params.id, req.body.tempsUnContreUn, TEMPS_UN_CONTRE_UN);
            res.status(constantes.HTTP_CREATED).json(req.params.id);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public async requeteAjouterPartieTemps(req: Request, res: Response): Promise<void> {
        try {
            await this.ajouterTemps(req.params.id, req.body.temps, req.body.isSolo);
            res.status(constantes.HTTP_CREATED).json(req.params.id);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public async requeteGetListePartie(req: Request, res: Response): Promise<void> {
        await this.baseDeDonnees.assurerConnection();
        res.send(await this.getListePartie());
    }

    protected abstract async verifierErreurScript(child: ChildProcess,
                                                  partie: PartieSimpleInterface | PartieMultipleInterface): Promise<void>;

    protected abstract envoyerPartiesPretes(channelId: string): void;

    protected abstract envoyerMeilleurTemps(joueur: Joueur, nomPartie: string, isSolo: boolean, temps: Array<Joueur>): void;

    protected abstract creerSchemaArray(): void;

    protected abstract creerSchemaBuffer(): void;

    protected async deletePartie(idPartie: string, res: Response): Promise<Response> {
      try {
          await this.modelPartieBuffer.findOneAndRemove(this.modelPartieBuffer.findById(idPartie)).catch(() => {
              throw new Error();
          });

          return res.status(constantes.HTTP_CREATED);
      } catch (err) {

          return res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
      }
  }

    protected async getListePartie(): Promise<Array<PartieMultipleInterface | PartieSimpleInterface>> {
      const listeParties: Array<PartieMultipleInterface | PartieSimpleInterface> = [];

      await this.modelPartieArray.find()
          .then((res: Document[]) => {
              for (const partie of res) {
                  listeParties.push(partie.toJSON());
              }
          });

      return listeParties;
  }

    protected async obtenirPartieId(nomPartie: string): Promise<string> {
      const partiesInterfaces: Array<PartieMultipleInterface | PartieMultipleInterface> = [];

      await this.modelPartieBuffer.find()
          .then((res: Document[]) => {
              for (const partie of res) {
                  partiesInterfaces.push(partie.toObject());
              }
          });

      for (const partieSimple of partiesInterfaces) {
          if (partieSimple._nomPartie === nomPartie) {
              return partieSimple._id;
          }
      }

      return partiesInterfaces[0]._id;
  }

    protected async getPartieById(partieID: String): Promise<PartieMultipleInterface | PartieSimpleInterface> {
      const partiesInterfaces: Array<PartieMultipleInterface | PartieMultipleInterface> = [];

      await this.modelPartieArray.find()
          .then((parties: Document[]) => {
              for (const partie of parties) {
                  partiesInterfaces.push(partie.toJSON());
              }
          });

      for (const partie of partiesInterfaces) {
          if (partie._id.toString() === partieID) {
              return partie;
          }
      }

      return partiesInterfaces[1];
  }

    protected async getPartieByName(nomPartie: string): Promise<PartieSimpleInterface | PartieMultipleInterface> {
      const partiesInterfaces: Array<PartieMultipleInterface | PartieMultipleInterface> = [];

      await this.modelPartieArray.find()
          .then((parties: Document[]) => {
              for (const partie of parties) {
                partiesInterfaces.push(partie.toJSON());
              }
          });

      for (const partie of partiesInterfaces) {
          if (partie._nomPartie.toString() === nomPartie) {
              return partie;
          }
      }

      return partiesInterfaces[1];
  }

    protected async trierTemps(idPartie: String, temps: Array<Joueur>, typeDeTemps: string): Promise<Array<Joueur>> {
        temps = this.getSortedTimes(temps);
        typeDeTemps === TEMPS_SOLO ? await this.modelPartieBuffer.findByIdAndUpdate(idPartie, {_tempsSolo: temps})
                .catch(() => {
                    throw new Error();
                })
            : await this.modelPartieBuffer.findByIdAndUpdate(idPartie, {_tempsUnContreUn: temps})
                .catch(() => {
                    throw new Error();
                });

        return temps;
    }

    protected async ajouterTemps(idPartie: string, temps: Joueur, isSolo: boolean): Promise<void> {
        const partie: PartieSimpleInterface | PartieMultipleInterface = await this.getPartieById(idPartie);
        if (temps._nom === constantes.STR_VIDE) {
            temps._nom = NOM_ANONYME;
        }
        await this.ajouterTempsSiTopTrois(temps, partie, isSolo);
    }

    private async ajouterTempsSiTopTrois(temps: Joueur, partie: PartieSimpleInterface | PartieMultipleInterface,
                                         isSolo: boolean): Promise<void> {
        const typeDeTemps: string = isSolo ? TEMPS_SOLO : TEMPS_UN_CONTRE_UN;
        if (temps._temps < partie[typeDeTemps][PARTIE_SECOND_ELEMENT]._temps) {
            partie[typeDeTemps].splice(-1, 1);
            partie[typeDeTemps].push(temps);

            const tempsTries: Array<Joueur> = await this.trierTemps(partie._id, partie[typeDeTemps], typeDeTemps);
            this.envoyerMeilleurTemps(temps, partie._nomPartie, isSolo, tempsTries);
        }

    }

    protected getSortedTimes(arr: Array<Joueur>): Array<Joueur> {
        if (arr) {
            arr.sort((t1: Joueur, t2: Joueur) => {
                const time1: number = t1._temps;
                const time2: number = t2._temps;
                if (time1 > time2) {
                    return 1;
                }
                if (time1 < time2) {
                    return -1;
                }

                return 0;
            });
        }

        return arr;
    }

    protected async creerFichierImages(): Promise<void> {
        const dir: string = constantes.IMAGES_DIRECTORY;
        const mkdirPromise: Function = util.promisify(fs.mkdir);
        const existsPromise: Function = util.promisify(fs.exists);
        if (await existsPromise(dir)) {
            await fsx.remove(dir);
        }

        await mkdirPromise(dir);
    }

    protected async supprimerFichierImages(): Promise<void> {
        const dir: string = constantes.IMAGES_DIRECTORY;
        await fsx.remove(dir);
    }

    private getChannelId(): string {
        const id: string = uniqid();
        if (this.listeChannelsMultijoueur.has(id)) {
            this.getChannelId();
        }

        return id;
    }
}
