import { ForcedBet } from "./forced_bet";

export class StringFactory {
    public static forced_bet=(forced_bet: ForcedBet): string => {
        switch (forced_bet) {
            case ForcedBet.Ante: return 'Ante';
            case ForcedBet.Blinds: return 'Blinds';
            case ForcedBet.HighBringIn: return 'Bring-in (High)';
            case ForcedBet.LowBringIn: return 'Bring-in (Low)';
        }
    }
}
