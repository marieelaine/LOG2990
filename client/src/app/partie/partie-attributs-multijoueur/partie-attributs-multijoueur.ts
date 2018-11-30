export class PartieAttributsMultijoueur {

    private _isMultijoueur: boolean;
    private _channelId: string;
    private _joueurMultijoueur: string;

    public get isMultijoueur(): boolean {
        return this._isMultijoueur;
    }

    public set isMultijoueur(value: boolean) {
        this._isMultijoueur = value;
    }

    public get channelId(): string {
        return this._channelId;
    }

    public set channelId(value: string) {
        this._channelId = value;
    }

    public get joueurMultijoueur(): string {
        return this._joueurMultijoueur;
    }

    public set joueurMultijoueur(value: string) {
        this._joueurMultijoueur = value;
    }
}
