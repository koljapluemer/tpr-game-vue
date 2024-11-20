// levelTemplates.js

import type { LevelTemplate } from '@/types'
import { ItemName } from './items'

const thingsThatFitInCar: ItemName[] = [
  ItemName.fan,
  ItemName.globe,
  ItemName.potted_plant,
  ItemName.suitcase_white,
  ItemName.suitcase_blue,
  ItemName.melon,
]
const colorfulCars: ItemName[] = [ItemName.car_black, ItemName.car_blue, ItemName.car_green]

export enum LevelTemplateName {
  cut_fruit_1,
  pack_car_x,
  park_car_x,
}

export const levelTemplates: LevelTemplate[] = [
  {
    id: LevelTemplateName.cut_fruit_1,

    grid: [
      [[[ItemName.kiwi]], [[ItemName.knife]]],
      [[[]], [[]]],
    ],
    prerequisites: [],
  },
  {
    id: LevelTemplateName.pack_car_x,

    grid: [
      [[[]], [colorfulCars], [colorfulCars], [[]]],
      [[thingsThatFitInCar], [thingsThatFitInCar], [thingsThatFitInCar], [thingsThatFitInCar]],
    ],
  },
  {
    id: LevelTemplateName.park_car_x,

    grid: [
      [[[]], [[ItemName.parking_lot]], [[]]],
      [[[ItemName.parking_lot]], [[ItemName.house]], [[ItemName.parking_lot]]],
      [[[ItemName.car_old_movable]], [[ItemName.parking_lot]], [[]]],
    ],
  },
]
