export class PlayerSeason {
  id?: string;
  trophies?: number;
  bestTrophies?: number;

  constructor(init?: Partial<PlayerSeason>) {
    Object.assign(this, init);
  }
}
