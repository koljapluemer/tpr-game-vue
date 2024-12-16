export enum Affordance {
    IsCuttable,
    IsStorageSmall,
    IsStorageMedium,
    IsStorageLarge,
    IsParkingSpace,
    Unlockable,
    Lockable,
    IsBoardable,
    Takes,
    Pushable,
    Pullable,
    ThingsCanBePlacedOnThis
}


// stuff like color, size, ...
export type ThingProperty = [name:string, value:string|number]

// examples for the type
const prop1:ThingProperty = ["lengthInM", 6]
const prop2:ThingProperty = ["color", "red"]