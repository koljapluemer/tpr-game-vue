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
