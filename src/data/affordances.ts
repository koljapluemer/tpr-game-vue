export enum CapabilityPartnered {
  Cuts,
  StoresInSmall,
  StoresInMedium,
  StoresInLarge,
  Parkable
}


export enum PassiveAffordance {
  IsCuttable,
  IsStorageSmall,
  IsStorageMedium,
  IsStorageLarge,
  IsParkingSpace
}


export const affordancePartnerings = {
  [CapabilityPartnered.Cuts]: PassiveAffordance.IsCuttable,
  [CapabilityPartnered.StoresInSmall]: PassiveAffordance.IsStorageSmall,
  [CapabilityPartnered.StoresInMedium]: PassiveAffordance.IsStorageMedium,
  [CapabilityPartnered.StoresInLarge]: PassiveAffordance.IsStorageLarge,
  [CapabilityPartnered.Parkable]: PassiveAffordance.IsStorageLarge
} as const


export const capabilityVerbs = {
  [CapabilityPartnered.Cuts]: "CUT",
  [CapabilityPartnered.StoresInSmall]: "STORE_IN",
  [CapabilityPartnered.StoresInMedium]: "STORE_IN",
  [CapabilityPartnered.StoresInLarge]: "STORE_IN",
  [CapabilityPartnered.Parkable]: "PARK",
}