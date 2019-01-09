export class PlayerCard {
  id?: string;
  name?: string;
  level?: number;
  maxLevel?: number;
  count?: number;
  iconUrls?: {
    medium: string;
  };

  constructor(init?: Partial<PlayerCard>) {
    Object.assign(this, init);
  }
}
