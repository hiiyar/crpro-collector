export class PlayerClan {
  tag?: string;
  name?: string;
  badgeId?: number;

  constructor(init?: Partial<PlayerClan>) {
    Object.assign(this, init);
  }
}
