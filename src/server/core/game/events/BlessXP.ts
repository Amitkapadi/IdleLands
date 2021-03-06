import { Event } from './Event';
import { Player } from '../../../../shared/models/entity';
import { AdventureLogEventType, Stat, EventName, EventMessageType } from '../../../../shared/interfaces';

export class BlessXP extends Event {
  public static readonly WEIGHT = 100;

  public operateOn(player: Player) {

    if(player.$party && this.rng.likelihood(25)) {
      player.$$game.eventManager.doEventFor(player, EventName.BlessXPParty);
      return;
    }

    // you can't gain more than 5% of your xp at once
    const baseXPGain = this.rng.numberInRange(10 + player.getStat(Stat.LUK), player.level.total * 25);
    const intermediateXPGain = Math.min(player.xp.maximum / 20, baseXPGain);
    const totalXPGain = player.gainXP(intermediateXPGain);

    const eventText = this.eventText(EventMessageType.BlessXP, player, { xp: totalXPGain });
    const allText = `${eventText} [+${totalXPGain.toLocaleString()} xp]`;
    this.emitMessage([player], allText, AdventureLogEventType.XP);
  }
}
