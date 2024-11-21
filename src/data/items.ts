import type { Item } from '@/types'
import { capability, passiveAffordance } from './affordances'

export enum ItemName {
  kiwi,
  knife,
  kiwi_cut,
  car_black,
  car_blue,
  car_green,
  fan,
  globe,
  potted_plant,
  suitcase_white,
  suitcase_blue,
  melon,
  house,
  parking_lot,
  car_old_movable,
}

export const items: Item[] = [
  {
    id: ItemName.kiwi,
    primaryKey: 'KIWI',
    secondaryKeys: [],
    images: ['kiwi_uncut'],
    activeAffordances: [capability.Movable],
    passiveAffordances: [passiveAffordance.IsCuttable],
    load_when_cut: ItemName.kiwi_cut,
  },
  {
    id: ItemName.knife,
    primaryKey: 'KIFE',
    secondaryKeys: [],
    images: ['knife'],
    activeAffordances: [capability.Cuts, capability.Movable],
  },
  {
    id: ItemName.kiwi_cut,
    primaryKey: 'KIWI_HALVES',
    secondaryKeys: [],
    images: ['kiwi_cut'],
    activeAffordances: [capability.Movable],
  },
  {
    id: ItemName.car_black,
    primaryKey: 'CAR',
    secondaryKeys: [],
    images: ['car_black-Photoroom'],
    passiveAffordances: [passiveAffordance.IsStorageMedium],
    color: 'black',
  },
  {
    id: ItemName.car_blue,
    primaryKey: 'CAR',
    secondaryKeys: [],
    images: ['car_blue_bmw_crop', 'car_blue-Photoroom'],
    passiveAffordances: [passiveAffordance.IsStorageMedium],

    color: 'blue',
  },
  {
    id: ItemName.car_green,
    primaryKey: 'CAR',
    secondaryKeys: [],
    images: ['car_green-Photoroom'],
    passiveAffordances: [passiveAffordance.IsStorageMedium],

    color: 'green',
  },
  {
    id: ItemName.fan,
    primaryKey: 'FAN',
    secondaryKeys: [],
    images: ['fan_crop'],
    activeAffordances: [capability.Movable, capability.StoresInMedium],
  },
  {
    id: ItemName.globe,
    primaryKey: 'GLOBE',
    secondaryKeys: [],
    images: ['globe_crop'],
    activeAffordances: [capability.Movable, capability.StoresInMedium],
  },
  {
    id: ItemName.potted_plant,
    primaryKey: 'POTTED_PLANT',
    secondaryKeys: [],
    images: ['pot_plant_crop'],
    activeAffordances: [capability.Movable, capability.StoresInMedium],
  },
  {
    id: ItemName.suitcase_white,
    primaryKey: 'SUITCASE',
    secondaryKeys: [],
    images: ['suitcas2_crop'],
    passiveAffordances: [passiveAffordance.IsStorageSmall],

    activeAffordances: [capability.Movable, capability.StoresInMedium],
  },
  {
    id: ItemName.suitcase_blue,
    primaryKey: 'SUITCASE',
    secondaryKeys: [],
    images: ['suitcase1_crop'],
    passiveAffordances: [passiveAffordance.IsStorageSmall],

    activeAffordances: [capability.Movable, capability.StoresInMedium],
  },
  {
    id: ItemName.melon,
    primaryKey: 'MELON',
    secondaryKeys: [],
    images: ['melon_whole'],
    activeAffordances: [capability.Movable, capability.StoresInSmall, capability.StoresInMedium],
  },
  { id: ItemName.house, primaryKey: 'house', images: ['house_crop', 'house_front'] },
  {
    id: ItemName.car_old_movable,
    primaryKey: 'CAR',
    images: ['car_blue_old_crop'],
    activeAffordances: [capability.Movable, capability.Parkable],

    color: 'blue',
  },
  {
    id: ItemName.parking_lot,
    primaryKey: 'PARKING_LOT',
    images: ['parking_lot_1', 'parking_lot_2'],
    passiveAffordances: [passiveAffordance.IsParkingSpace],
  },
] as const
