export enum CapabilityPartnered {
  Cuts,
  StoresInSmall,
  StoresInMedium,
  StoresInLarge,
  Parkable,
  Locks,
  Unlocks,
  Boards,
}


export enum PassiveAffordance {
  IsCuttable,
  IsStorageSmall,
  IsStorageMedium,
  IsStorageLarge,
  IsParkingSpace,
  Unlockable,
  Lockable,
  IsBoardable
}


export const affordancePartnerings = {
  [CapabilityPartnered.Cuts]: PassiveAffordance.IsCuttable,
  [CapabilityPartnered.StoresInSmall]: PassiveAffordance.IsStorageSmall,
  [CapabilityPartnered.StoresInMedium]: PassiveAffordance.IsStorageMedium,
  [CapabilityPartnered.StoresInLarge]: PassiveAffordance.IsStorageLarge,
  [CapabilityPartnered.Parkable]: PassiveAffordance.IsParkingSpace,
  [CapabilityPartnered.Unlocks]: PassiveAffordance.Unlockable,
  [CapabilityPartnered.Locks]: PassiveAffordance.Lockable,
  [CapabilityPartnered.Boards]: PassiveAffordance.IsBoardable,

} as const


export const capabilityVerbs = {
  [CapabilityPartnered.Cuts]: "CUT",
  [CapabilityPartnered.Locks]: "LOCK",
  [CapabilityPartnered.Unlocks]: "UNLOCK",
  [CapabilityPartnered.StoresInSmall]: "STORE_IN",
  [CapabilityPartnered.StoresInMedium]: "STORE_IN",
  [CapabilityPartnered.StoresInLarge]: "STORE_IN",
  [CapabilityPartnered.Parkable]: "PARK",
  [CapabilityPartnered.Boards]: "BOARD"
}