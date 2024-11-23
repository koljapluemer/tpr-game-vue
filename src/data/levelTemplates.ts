// levelTemplates.js

import { LevelProperty, type LevelTemplate, type Topic } from '@/types'
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
const colorfulSuitcases = [ItemName.suitcase_blue, ItemName.suitcase_white]
const basicPackingMix: ItemName[] = [ItemName.shoes, ItemName.water_bottle, ...colorfulSuitcases]

export enum LevelTemplateName {
  cut_fruit_1,
  pack_car_x,
  park_car_x,
  shoes_in_suitcase,
  bottle_in_suitcase,
  mixed_in_suitcase,
  suitcase_in_car,
  shoes_in_car,
  bottle_in_car,
  shoes_suitcase_etc_mixed_in_car,
  car_lock_unlock,
}

export const topics: Topic[] = [
  {
    id: "packing-car-shoes-bottle-suitcase",
    progressions: [
      [
        LevelTemplateName.shoes_in_suitcase,
        LevelTemplateName.bottle_in_suitcase,
        LevelTemplateName.mixed_in_suitcase,
        LevelTemplateName.mixed_in_suitcase,
        LevelTemplateName.mixed_in_suitcase,
      ],
      [
        LevelTemplateName.suitcase_in_car,
        LevelTemplateName.shoes_in_car,
        LevelTemplateName.bottle_in_car,
        LevelTemplateName.shoes_suitcase_etc_mixed_in_car,
        LevelTemplateName.shoes_suitcase_etc_mixed_in_car,
        LevelTemplateName.shoes_suitcase_etc_mixed_in_car,
      ]
    ],
    finalPracticeRotation: [
      LevelTemplateName.shoes_suitcase_etc_mixed_in_car,
      LevelTemplateName.mixed_in_suitcase,
    ]
  },
  {
    id: "cutting-fruits",
    progressions: [
      [
        LevelTemplateName.cut_fruit_1,
      ]
    ],
    finalPracticeRotation: [
      LevelTemplateName.cut_fruit_1,
    ]
  },
  {
    id: "lock-unlock",
    progressions: [
      [LevelTemplateName.car_lock_unlock]
    ],
    finalPracticeRotation: [LevelTemplateName.car_lock_unlock]
  }

]

export const levelTemplates: LevelTemplate[] = [
  {
    id: LevelTemplateName.cut_fruit_1,

    grid: [
      [[[ItemName.kiwi]], [[ItemName.knife]]],
      [[[]], [[]]],
    ],
    prerequisites: [],
    props: [LevelProperty.DisableMovementQuests]

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
  // first progression
  {
    id: LevelTemplateName.bottle_in_suitcase,
    grid: [
      [[[ItemName.water_bottle]], [[ItemName.suitcase_blue, ItemName.suitcase_white]]]
    ]
  },
  {
    id: LevelTemplateName.shoes_in_suitcase,
    grid: [
      [[[ItemName.shoes]], [[ItemName.suitcase_blue, ItemName.suitcase_white]]]
    ]
  },
  {
    id: LevelTemplateName.suitcase_in_car,
    grid: [
      [[colorfulCars], [[ItemName.suitcase_blue, ItemName.suitcase_white]]]
    ]
  },
  {
    id: LevelTemplateName.bottle_in_car,
    grid: [
      [[[ItemName.water_bottle]], [colorfulCars]]
    ]
  },
  {
    id: LevelTemplateName.shoes_in_car,
    grid: [
      [[[ItemName.shoes]], [colorfulCars]]
    ]
  },
  {
    id: LevelTemplateName.mixed_in_suitcase,
    grid: [
      [[colorfulSuitcases], [basicPackingMix], [basicPackingMix]]
    ],
  },
  {
    id: LevelTemplateName.shoes_suitcase_etc_mixed_in_car,
    grid: [
      [[colorfulCars], [[]], [[]]],
      [[basicPackingMix], [basicPackingMix], [basicPackingMix]]
    ],
  },
  // lock/unlock
  {
    id: LevelTemplateName.car_lock_unlock,
    grid: [
      [
        [[ItemName.car_keys]]
      ],
      [
        [[ItemName.car_mustang_open]]
      ]
    ]
  }
]
