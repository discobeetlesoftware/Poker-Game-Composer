export class GameStructure {
    ante: boolean;
    fixed_limit: boolean;
    pot_limit: boolean;
    no_limit: boolean;
    
    static hydrate=(data: any): GameStructure => {
        let structure = new GameStructure();
        if (data == undefined) {
            return structure;
        }
        structure.ante = data.ante;
        structure.fixed_limit = data.fixed_limit;
        structure.pot_limit = data.pot_limit;
        structure.no_limit = data.no_limit;
        return structure;
    }
    
    to_serializable=(): any => {
        return {
            ante: this.ante,
            fixed_limit: this.fixed_limit,
            pot_limit: this.pot_limit,
            no_limit: this.no_limit
        }
    }
}