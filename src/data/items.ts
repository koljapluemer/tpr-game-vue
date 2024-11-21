import type { Item } from '@/types'
import { ActiveAffordance, PassiveAffordance } from './affordances'

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
    activeAffordances: [ActiveAffordance.MOVABLE],
    passiveAffordances: [PassiveAffordance.CUTTABLE],
    load_when_cut: ItemName.kiwi_cut,
  },
  {
    id: ItemName.knife,
    primaryKey: 'KIFE',
    secondaryKeys: [],
    images: ['knife'],
    activeAffordances: [ActiveAffordance.CUTS, ActiveAffordance.MOVABLE],
  },
  {
    id: ItemName.kiwi_cut,
    primaryKey: 'KIWI_HALVES',
    secondaryKeys: [],
    images: ['kiwi_cut'],
    activeAffordances: [ActiveAffordance.MOVABLE],
  },
  {
    id: ItemName.car_black,
    primaryKey: 'CAR',
    secondaryKeys: [],
    images: ['car_black-Photoroom'],
    passiveAffordances: [PassiveAffordance.STORAGE_MEDIUM],
    color: 'black',
  },
  {
    id: ItemName.car_blue,
    primaryKey: 'CAR',
    secondaryKeys: [],
    images: ['car_blue_bmw_crop', 'car_blue-Photoroom'],
    passiveAffordances: [PassiveAffordance.STORAGE_MEDIUM],

    color: 'blue',
  },
  {
    id: ItemName.car_green,
    primaryKey: 'CAR',
    secondaryKeys: [],
    images: ['car_green-Photoroom'],
    passiveAffordances: [PassiveAffordance.STORAGE_MEDIUM],

    color: 'green',
  },
  {
    id: ItemName.fan,
    primaryKey: 'FAN',
    secondaryKeys: [],
    images: ['fan_crop'],
    activeAffordances: [ActiveAffordance.MOVABLE, ActiveAffordance.STORES_IN_MEDIUM],
  },
  {
    id: ItemName.globe,
    primaryKey: 'GLOBE',
    secondaryKeys: [],
    images: ['globe_crop'],
    activeAffordances: [ActiveAffordance.MOVABLE, ActiveAffordance.STORES_IN_MEDIUM],
  },
  {
    id: ItemName.potted_plant,
    primaryKey: 'POTTED_PLANT',
    secondaryKeys: [],
    images: ['pot_plant_crop'],
    activeAffordances: [ActiveAffordance.MOVABLE, ActiveAffordance.STORES_IN_MEDIUM],
  },
  {
    id: ItemName.suitcase_white,
    primaryKey: 'SUITCASE',
    secondaryKeys: [],
    images: ['suitcas2_crop'],
    passiveAffordances: [PassiveAffordance.STORAGE_SMALL],

    activeAffordances: [ActiveAffordance.MOVABLE, ActiveAffordance.STORES_IN_MEDIUM],
  },
  {
    id: ItemName.suitcase_blue,
    primaryKey: 'SUITCASE',
    secondaryKeys: [],
    images: ['suitcase1_crop'],
    passiveAffordances: [PassiveAffordance.STORAGE_SMALL],

    activeAffordances: [ActiveAffordance.MOVABLE, ActiveAffordance.STORES_IN_MEDIUM],
  },
  {
    id: ItemName.melon,
    primaryKey: 'MELON',
    secondaryKeys: [],
    images: ['melon_whole'],
    activeAffordances: [ActiveAffordance.MOVABLE, ActiveAffordance.STORES_IN_SMALL],
  },
  { id: ItemName.house, primaryKey: 'house', images: ['house_crop', 'house_front'] },
  {
    id: ItemName.car_old_movable,
    primaryKey: 'CAR',
    images: ['car_blue_old_crop'],
    activeAffordances: [ActiveAffordance.MOVABLE, ActiveAffordance.PARKABLE],

    color: 'blue',
  },
  {
    id: ItemName.parking_lot,
    primaryKey: 'PARKING_LOT',
    images: ['parking_lot_1', 'parking_lot_2'],
    passiveAffordances: [PassiveAffordance.IS_PARKING_SPACE],
  },
] as const
