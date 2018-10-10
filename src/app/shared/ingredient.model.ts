export class Ingredient {
    // public name: string;
    // public amount: number;
    /** this shortcut constructor(eg.: new Ingredient("meat", 5);) automatically creates the properties and assigns the values */
    constructor(public name: string, public amount: number) {
        // this.name = name;
        // this.amount = amount;
    }
}
