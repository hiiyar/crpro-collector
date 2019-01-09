export class PlayerAchievement {
  name?: string;
  stars?: number;
  value?: number;
  target?: number;
  info?: string;

  constructor(init?: Partial<PlayerAchievement>) {
    Object.assign(this, init);
  }
}
