export class GameStructure {
    ante: boolean;
    fixed_limit: boolean;
    pot_limit: boolean;
    no_limit: boolean;

    to_serializable=(): any => {
        return {
            ante: this.ante,
            fixed_limit: this.fixed_limit,
            pot_limit: this.pot_limit,
            no_limit: this.no_limit
        }
    }
}