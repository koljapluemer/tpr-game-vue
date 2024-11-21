
export enum ActiveAffordance {
  MOVABLE,
  CUTS,
  STORES_IN_SMALL,
  STORES_IN_MEDIUM,
  STORES_IN_LARGE,
  PARKABLE,
}

export enum PassiveAffordance {
  CUTTABLE,
  STORAGE_SMALL,
  STORAGE_MEDIUM,
  STORAGE_LARGE,
  IS_PARKING_SPACE,
}

// SYNTAX EXPLANATION:
// undefined: doesn't need no partner
// array: any of these needs to exist to be actionable
// the "array" for the key is just so ts can cope with the enum as key
export const affordancePairs: { [key in ActiveAffordance]: PassiveAffordance[] | undefined } = {
  [ActiveAffordance.MOVABLE]: undefined,
  [ActiveAffordance.CUTS]: [PassiveAffordance.CUTTABLE],
  [ActiveAffordance.STORES_IN_SMALL]: [PassiveAffordance.STORAGE_SMALL, PassiveAffordance.STORAGE_MEDIUM, PassiveAffordance.STORAGE_LARGE],
  [ActiveAffordance.STORES_IN_MEDIUM]: [PassiveAffordance.STORAGE_LARGE, PassiveAffordance.STORAGE_MEDIUM],
  [ActiveAffordance.STORES_IN_LARGE]: [PassiveAffordance.STORAGE_LARGE],
  [ActiveAffordance.PARKABLE]: [PassiveAffordance.IS_PARKING_SPACE]
}

export const affordanceVerbs: { [key in ActiveAffordance]?: string } = {
  [ActiveAffordance.CUTS]: "CUT",
  [ActiveAffordance.MOVABLE]: "MOVE",
}