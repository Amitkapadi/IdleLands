import { AchievementType, AchievementRewardType, Achievement, PermanentUpgrade } from '../../../../shared/interfaces';
import { Player } from '../../../../shared/models';

export class Festive extends Achievement {

  static readonly base = 5;

  static readonly statWatches = ['Game/Premium/ILP/FestivalSpend'];
  static readonly type = AchievementType.Special;

  static descriptionForTier(tier: number): string {
    let baseStr = `Gain +${tier} achievement(s) for spending ${Math.pow(Festive.base, tier).toLocaleString()} ILP on festivals.`;

    if(tier >= 6) {
      baseStr = `${baseStr} Title: Festive Fox.`;
    }

    return baseStr;
  }

  static calculateTier(player: Player): number {
    const steps = player.$statistics.get('Game/Premium/ILP/FestivalSpend');
    return Math.floor(Achievement.log(steps, Festive.base));
  }

  static rewardsForTier(tier: number): any[] {
    const baseRewards: any[] = [];

    if(tier >= 6) {
      baseRewards.push({ type: AchievementRewardType.Title, title: 'Festive Fox' });
    }

    return baseRewards;
  }
}