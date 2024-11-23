export enum CapabilityPartnered {
  Cuts,
  StoresInSmall,
  StoresInMedium,
  StoresInLarge,
  Parkable,
  Locks,
  Unlocks,
}


export enum PassiveAffordance {
  IsCuttable,
  IsStorageSmall,
  IsStorageMedium,
  IsStorageLarge,
  IsParkingSpace,
  Unlockable,
  Lockable
}


export const affordancePartnerings = {
  [CapabilityPartnered.Cuts]: PassiveAffordance.IsCuttable,
  [CapabilityPartnered.StoresInSmall]: PassiveAffordance.IsStorageSmall,
  [CapabilityPartnered.StoresInMedium]: PassiveAffordance.IsStorageMedium,
  [CapabilityPartnered.StoresInLarge]: PassiveAffordance.IsStorageLarge,
  [CapabilityPartnered.Parkable]: PassiveAffordance.IsStorageLarge,
  [CapabilityPartnered.Unlocks]: PassiveAffordance.Unlockable,
  [CapabilityPartnered.Locks]: PassiveAffordance.Lockable
} as const


export const capabilityVerbs = {
  [CapabilityPartnered.Cuts]: "CUT",
  [CapabilityPartnered.Locks]: "LOCK",
  [CapabilityPartnered.Unlocks]: "UNLOCK",
  [CapabilityPartnered.StoresInSmall]: "STORE_IN",
  [CapabilityPartnered.StoresInMedium]: "STORE_IN",
  [CapabilityPartnered.StoresInLarge]: "STORE_IN",
  [CapabilityPartnered.Parkable]: "PARK",
}