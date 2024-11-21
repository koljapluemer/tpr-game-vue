
export const capabilityMove = {
  Movable: "MOVE"
} as const


export const capabilityClick = {
  Openable: "OPEN",
  Closable: "CLOSE",
} as const

export const capabilityPartnered = {
  Cuts: "CUT",
  StoresInSmall: "STORE_SMALL",
  StoresInMedium: "STORE_MEDIUM",
  StoresInLarge: "STORE_LARGE",
  Parkable: "PARK"

} as const


export const capability = { ...capabilityMove, ...capabilityClick, ...capabilityPartnered } as const

type ValueOf<T> = T[keyof T];
export type Capability = ValueOf<typeof capability>
export type CapabilityMove = ValueOf<typeof capabilityMove>
export type CapabilityClick = ValueOf<typeof capabilityClick>
export type CapabilityPartnered = ValueOf<typeof capabilityPartnered>

export const passiveAffordance = {
  IsCuttable: "CUT",
  IsStorageSmall: "STORE_SMALL",
  IsStorageMedium: "STORE_MEDIUM",
  IsStorageLarge: "STORE_LARGE",
  IsParkingSpace: "PARK"
}

export type PassiveAffordance = ValueOf<typeof passiveAffordance>

export const affordancePartnerings = {
  [capabilityPartnered.Cuts]: passiveAffordance.IsCuttable,
  [capabilityPartnered.StoresInSmall]: passiveAffordance.IsStorageSmall,
  [capabilityPartnered.StoresInMedium]: passiveAffordance.IsStorageMedium,
  [capabilityPartnered.StoresInLarge]: passiveAffordance.IsStorageLarge,
  [capabilityPartnered.Parkable]: passiveAffordance.IsStorageLarge
} as const;
