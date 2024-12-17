// export enum Affordance {
//     IsCuttable: "",
//     IsStorageSmall,
//     IsStorageMedium,
//     IsStorageLarge,
//     IsParkingSpace,
//     Unlockable,
//     Lockable,
//     IsBoardable,
//     Takes,
//     Pushable,
//     Pullable,
//     ThingsCanBePlacedOnThis
//   }

export const Affordances = {
  IsCuttable: "CUT",
  IsStorageSmall: "",
  IsStorageMedium: "",
  IsStorageLarge: "",
  IsParkingSpace: "",
  Unlockable: "",
  Lockable: "",
  IsBoardable: "",
  Takes: "",
  Pushable: "",
  Pullable: "",
  ThingsCanBePlacedOnThis: ""
} as const


export type AffordanceName = keyof typeof Affordances


export function isValidAffordanceName(key: string): key is AffordanceName {
  return key in Affordances;
};