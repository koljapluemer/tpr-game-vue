// levelTemplates.js

import { type FieldProperty, FieldPropertyName, LevelProperty, type LevelTemplate, type Topic } from '@/types'
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
const colorFulCats: ItemName[] = [ItemName.cat_brown, ItemName.cat_grey, ItemName.cat_white]
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
  board_a_bus,
  board_bus_front_back,
  board_bus_front_back_middle,
  park_around_building,
  feed_3_cats
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
  },
  {
    id: "bus-boarding",
    progressions: [
      [
        LevelTemplateName.board_a_bus,
        LevelTemplateName.board_bus_front_back,
        LevelTemplateName.board_bus_front_back,
      ],
      [
        LevelTemplateName.board_a_bus,
        LevelTemplateName.board_bus_front_back,
        LevelTemplateName.board_bus_front_back_middle,
        LevelTemplateName.board_bus_front_back_middle,
        LevelTemplateName.board_bus_front_back_middle
      ]
    ],
    finalPracticeRotation: [LevelTemplateName.board_bus_front_back_middle, LevelTemplateName.board_bus_front_back]
  },
  {
    id: "park-behind-left-right-front",
    progressions: [
      [
      LevelTemplateName.park_around_building
      ]
    ],
    finalPracticeRotation: [LevelTemplateName.park_around_building]
  },
  {
    id: "feeding-colorful-cats",
    progressions: [
      [
        LevelTemplateName.feed_3_cats
      ]
    ],
    finalPracticeRotation: [LevelTemplateName.feed_3_cats]
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
        [[ItemName.car_mustang_closed]]
      ]
    ]
  },
  // BUS BOARDING
  //   board_a_bus, board_bus_front_back, board_bus_front_back_middle
  {
    id: LevelTemplateName.board_bus_front_back_middle,
    grid: [
      [
        [[ItemName.bus_mid]], [[]]
      ],
      [
        [[ItemName.bus_mid]], [[]]
      ],
      [
        [[ItemName.bus_mid]], [[ItemName.character_woman]]
      ],
    ],
    props: [LevelProperty.GenerateRelativePositions]
  },
  {
    id: LevelTemplateName.board_bus_front_back,
    grid: [
      [
        [[ItemName.bus_mid]], [[]]
      ],
      [
        [[ItemName.bus_mid]], [[ItemName.character_woman]]
      ]
    ],
    props: [LevelProperty.GenerateRelativePositions]
  },
  {
    id: LevelTemplateName.board_a_bus,
    grid: [
      [
        [[ItemName.bus_mid]], [[ItemName.character_woman]]
      ],
    ]
  },
  // parking
  {
    id: LevelTemplateName.park_around_building,
    grid: [
      [
        [[]], [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 1}}]   ], [[]]
      ],
      [
        [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 1}}]], [[ItemName.house]], [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 1}}]]
      ],
      [
        [[ItemName.car_old_movable]], [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 1}}]], [[]]
      ],
    ]
  },
  // cats
  {
    id: LevelTemplateName.feed_3_cats,
    grid: [
      [
        [colorFulCats, [{name: FieldPropertyName.ForceUniqueItem}]], [colorFulCats, [{name: FieldPropertyName.ForceUniqueItem}]], [colorFulCats, [{name: FieldPropertyName.ForceUniqueItem}]]
      ],
      [
        [[ItemName.cat_food]], [[ItemName.cat_food]], [[]]
      ]
    ]
  }
]
