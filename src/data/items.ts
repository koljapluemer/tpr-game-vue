import type { Item } from '@/types'
import { CapabilityPartnered, PassiveAffordance } from './affordances'

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
  shoes,
  water_bottle,
  car_mustang_closed,
  car_mustang_open,
  car_keys,
  key,
  bus_mid,
  bus_large_yellow_red,
  bus_blue,
  character_woman,
  cat_food,
  cat_grey,
  cat_brown,
  cat_white,
  hand_push,
  hand_pull,
  box_closed,
  box_open,
  car_mustang_ajar,
  door_red_open,
  door_red_closed,
  door_red_ajar
}

export const items: Item[] = [
  {
    id: ItemName.kiwi,
    primaryKey: 'KIWI',
    secondaryKeys: [],
    images: ['kiwi_uncut'],
    activeAffordances: [],
    isMovable: true,
    passiveAffordances: [PassiveAffordance.IsCuttable],
    load_when_cut: ItemName.kiwi_cut,
  },
  {
    id: ItemName.knife,
    primaryKey: 'KIFE',
    secondaryKeys: [],
    isMovable: true,
    images: ['knife'],
    activeAffordances: [CapabilityPartnered.Cuts,],
  },
  {
    id: ItemName.kiwi_cut,
    primaryKey: 'KIWI_HALVES',
    secondaryKeys: [],
    isMovable: true,
    images: ['kiwi_cut'],
    activeAffordances: [],
  },
  {
    id: ItemName.car_black,
    primaryKey: 'CAR',
    secondaryKeys: [],
    images: ['car_black-Photoroom'],
    passiveAffordances: [PassiveAffordance.IsStorageMedium, PassiveAffordance.IsStorageSmall],
    color: 'BLACK',
  },
  {
    id: ItemName.car_blue,
    primaryKey: 'CAR',
    secondaryKeys: [],
    images: ['car_blue_bmw_crop', 'car_blue-Photoroom'],
    passiveAffordances: [PassiveAffordance.IsStorageMedium, PassiveAffordance.IsStorageSmall],

    color: 'BLUE',
  },
  {
    id: ItemName.car_green,
    primaryKey: 'CAR',
    secondaryKeys: [],
    images: ['car_green-Photoroom'],
    passiveAffordances: [PassiveAffordance.IsStorageMedium, PassiveAffordance.IsStorageSmall],

    color: 'GREEN',
  },
  {
    id: ItemName.fan,
    primaryKey: 'FAN',
    secondaryKeys: [],
    isMovable: true,
    images: ['fan_crop'],
    activeAffordances: [CapabilityPartnered.StoresInMedium],
  },
  {
    id: ItemName.globe,
    primaryKey: 'GLOBE',
    isMovable: true,
    secondaryKeys: [],
    images: ['globe_crop'],
    activeAffordances: [CapabilityPartnered.StoresInMedium],
  },
  {
    id: ItemName.potted_plant,
    primaryKey: 'POTTED_PLANT',
    isMovable: true,
    secondaryKeys: [],
    images: ['pot_plant_crop'],
    activeAffordances: [CapabilityPartnered.StoresInMedium],
  },
  {
    id: ItemName.suitcase_white,
    primaryKey: 'SUITCASE',
    isMovable: true,
    secondaryKeys: [],
    images: ['suitcas2_crop'],
    passiveAffordances: [PassiveAffordance.IsStorageSmall],

    activeAffordances: [CapabilityPartnered.StoresInMedium],
  },
  {
    id: ItemName.suitcase_blue,
    primaryKey: 'SUITCASE',
    isMovable: true,
    secondaryKeys: [],
    images: ['suitcase1_crop'],
    passiveAffordances: [PassiveAffordance.IsStorageSmall],

    activeAffordances: [CapabilityPartnered.StoresInMedium],
  },
  {
    id: ItemName.melon,
    primaryKey: 'MELON',
    isMovable: true,
    secondaryKeys: [],
    images: ['melon_whole'],
    activeAffordances: [CapabilityPartnered.StoresInSmall, CapabilityPartnered.StoresInMedium],
  },
  { id: ItemName.house, primaryKey: 'HOUSE', images: ['house_crop', 'house_front'] },
  {
    id: ItemName.car_old_movable,
    isMovable: true,
    primaryKey: 'CAR',
    images: ['car_blue_old_crop'],
    activeAffordances: [CapabilityPartnered.Parkable],
    color: 'BLUE',
  },
  {
    id: ItemName.parking_lot,
    primaryKey: 'PARKING_LOT',
    images: ['parking_lot_1', 'parking_lot_2'],
    passiveAffordances: [PassiveAffordance.IsParkingSpace],
  },
  {
    id: ItemName.water_bottle,
    primaryKey: 'WATER-BOTTLE',
    isMovable: true,
    secondaryKeys: [],
    images: ['water-bottle'],
    activeAffordances: [CapabilityPartnered.StoresInSmall, CapabilityPartnered.StoresInMedium],
  },
  {
    id: ItemName.shoes,
    primaryKey: 'SHOES',
    isMovable: true,
    secondaryKeys: [],
    images: ['shoes'],
    activeAffordances: [CapabilityPartnered.StoresInSmall, CapabilityPartnered.StoresInMedium],
  },

  {
    id: ItemName.car_keys,
    primaryKey: 'CAR_KEYS',
    isMovable: true,
    images: ['car_keys'],
    activeAffordances: [CapabilityPartnered.Locks, CapabilityPartnered.Unlocks]
  },
  {
    id: ItemName.character_woman,
    primaryKey: 'CHARACTER_WOMAN',
    isMovable: true,
    images: ['you'],
    activeAffordances: [CapabilityPartnered.Boards]
  },
  {
    id: ItemName.bus_mid,
    primaryKey: 'BUS',
    isMovable: false,
    images: ['bus_mid_size'],
    passiveAffordances: [PassiveAffordance.IsBoardable]
  },
  {
    id: ItemName.bus_large_yellow_red,
    primaryKey: 'BUS',
    isMovable: false,
    images: ['bus_big_crop'],
    passiveAffordances: [PassiveAffordance.IsBoardable]
  },
  {
    id: ItemName.bus_blue,
    primaryKey: 'BUS',
    isMovable: false,
    images: ['bus_blue'],
    passiveAffordances: [PassiveAffordance.IsBoardable]
  },
  {
    id: ItemName.cat_food,
    primaryKey: 'CAT_FOOD',
    isMovable: true,
    images: ['cat_food'],
    activeAffordances: [CapabilityPartnered.Giveable]
  },
  {
    id: ItemName.cat_brown,
    primaryKey: 'CAT',
    color: 'BROWN',
    images: ['cat_brown'],
    passiveAffordances: [PassiveAffordance.Takes]
  },
  {
    id: ItemName.cat_white,
    primaryKey: 'CAT',
    color: 'WHITE',
    images: ['cat_white'],
    passiveAffordances: [PassiveAffordance.Takes]
  },
  {
    id: ItemName.cat_grey,
    primaryKey: 'CAT',
    color: 'GREY',
    images: ['cat_grey'],
    passiveAffordances: [PassiveAffordance.Takes]
  },
  // advanced push pull
  {
    id: ItemName.box_closed,
    primaryKey: 'CARDBOARD_BOX',
    images: ['box-closed'],
    passiveAffordances: [PassiveAffordance.Pullable],
    load_when_pulled: ItemName.box_open
  },
  {
    id: ItemName.box_open,
    primaryKey: 'CARDBOARD_BOX',
    images: ['box-open'],
  },
  {
    id: ItemName.door_red_ajar,
    primaryKey: 'DOOR_PUSH_TO_OPEN',
    images: ['door-red-ajar'],
    load_when_locked: ItemName.door_red_closed,
    load_when_pushed: ItemName.door_red_open,
    passiveAffordances: [PassiveAffordance.Lockable, PassiveAffordance.Pushable]
  },
  {
    id: ItemName.door_red_closed,
    primaryKey: 'DOOR_PUSH_TO_OPEN',
    images: ['door-red-closed'],
    load_when_unlocked: ItemName.door_red_ajar,
    passiveAffordances: [PassiveAffordance.Unlockable]
  },
  {
    id: ItemName.door_red_open,
    primaryKey: 'DOOR_PUSH_TO_OPEN',
    images: ['door-red-open'],
    load_when_unlocked: ItemName.door_red_ajar,
    passiveAffordances: [PassiveAffordance.Pullable]
  },
  {
    id: ItemName.car_mustang_ajar,
    primaryKey: 'CAR',
    images: ['mustang-closed'],
    passiveAffordances: [PassiveAffordance.Lockable, PassiveAffordance.Pullable],
    load_when_locked: ItemName.car_mustang_closed,
    load_when_pulled: ItemName.car_mustang_open
  },
  {
    id: ItemName.car_mustang_closed,
    primaryKey: 'CAR',
    isMovable: false,
    images: ['mustang-closed'],
    passiveAffordances: [PassiveAffordance.Unlockable],
    load_when_unlocked: ItemName.car_mustang_ajar
  },
  {
    id: ItemName.car_mustang_open,
    primaryKey: 'CAR',
    isMovable: false,
    images: ['mustang-open'],
    passiveAffordances: [PassiveAffordance.Pushable],
    load_when_pushed: ItemName.car_mustang_ajar
  },
  {
    id: ItemName.hand_pull,
    primaryKey: "HAND",
    isMovable: true,
    images: ['hand_pull'],
    activeAffordances: [CapabilityPartnered.Pulls]
  },
  {
    id: ItemName.hand_push,
    primaryKey: "HAND",
    isMovable: true,
    images: ['hand_push'],
    activeAffordances: [CapabilityPartnered.Pushes]
  }
] as const
