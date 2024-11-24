// levelTemplates.js

import { type FieldProperty, FieldPropertyName, LevelProperty, type LevelTemplate, type LevelTemplateGridRowField, type Topic } from '@/types'
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
const cuttableFruits: ItemName[] = [ItemName.kiwi, ItemName.avocado, ItemName.broccoli, ItemName.lemon, ItemName.watermelon, ItemName.onion]
const cuttableFruitsWithBowl: ItemName[] = [ItemName.kiwi, ItemName.avocado, ItemName.broccoli, ItemName.lemon, ItemName.watermelon, ItemName.onion, ItemName.bowl]

const carLockInteractionStuff: LevelTemplateGridRowField = [[ItemName.hand_push, ItemName.car_keys, ItemName.hand_pull], [{name: FieldPropertyName.ForceUniqueItem}]]
const doorLockInteractionStuff: LevelTemplateGridRowField = [[ItemName.hand_push, ItemName.key, ItemName.hand_pull], [{name: FieldPropertyName.ForceUniqueItem}]]

export enum LevelTemplateName {
  pack_car_x,
  park_car_x,
  shoes_in_suitcase,
  bottle_in_suitcase,
  mixed_in_suitcase,
  suitcase_in_car,
  shoes_in_car,
  bottle_in_car,
  shoes_suitcase_etc_mixed_in_car,
  board_a_bus,
  board_bus_front_back,
  board_bus_front_back_middle,
  park_car,
  park_around_building,
  park_front_building,
  park_left_building,
  park_front_left_building,
  park_behind_building,
  park_behind_left_building,
  park_behind_front_left_building,
  park_right_building,
  park_right_left_building,
  feed_3_cats,
  car_open,
  car_close,
  car_unlock_open,
  car_close_lock,
  car_close_lock_all,
  door_unlock,
  door_unlock_open,
  door_close_lock,
  door_close_lock_all,
  box_open,
  cut_fruit_1,
  cut_fruits_bowl_all,
  cut_avocado,
  cut_kiwi_avocado,
  place_kiwi_bowl,
  place_avocado_bowl,
  place_kiwi_avocado,
  place_cut_kiwi_avocado,
  place_cut_broccoli,
  place_cut_lemon,
  place_cut_lemon_broccoli,
  place_cut_onion,
  place_cut_watermelon,
  place_cut_watermelon_onion
}

// TODO: add the cutting level progression

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
      LevelTemplateName.pack_car_x
    ]
  },
  // NEXT: more of these
  {
    id: "cutting-fruits",
    progressions: [
      [
        LevelTemplateName.cut_fruit_1,
        LevelTemplateName.cut_avocado,
        LevelTemplateName.cut_kiwi_avocado,
        LevelTemplateName.place_kiwi_bowl,
        LevelTemplateName.place_avocado_bowl,
        LevelTemplateName.place_kiwi_avocado,
        LevelTemplateName.place_kiwi_avocado,
        LevelTemplateName.place_cut_kiwi_avocado,
        LevelTemplateName.place_cut_kiwi_avocado,
        LevelTemplateName.place_cut_lemon,
        LevelTemplateName.place_cut_broccoli,
        LevelTemplateName.place_cut_lemon_broccoli,
        LevelTemplateName.place_cut_lemon_broccoli,
        LevelTemplateName.place_cut_watermelon,
        LevelTemplateName.place_cut_onion,
        LevelTemplateName.place_cut_watermelon_onion,
        LevelTemplateName.place_cut_watermelon_onion,
        LevelTemplateName.cut_fruits_bowl_all,
        LevelTemplateName.cut_fruits_bowl_all,
      ]
    ],
    finalPracticeRotation: [
      LevelTemplateName.cut_fruits_bowl_all,
    ]
  },
  {
    id: "lock-unlock",
    progressions: [
      [
        LevelTemplateName.box_open,
        LevelTemplateName.car_open,
        LevelTemplateName.car_close,
        LevelTemplateName.car_close_lock,
        LevelTemplateName.car_close_lock_all,
        LevelTemplateName.car_close_lock_all,
        LevelTemplateName.door_unlock,
        LevelTemplateName.door_unlock_open,
        LevelTemplateName.door_close_lock,
        LevelTemplateName.door_close_lock_all,
        LevelTemplateName.door_close_lock_all,
      ]
    ],
    finalPracticeRotation: [LevelTemplateName.car_close_lock_all, LevelTemplateName.door_close_lock_all]
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
    // park_front_building,
    // park_left_building,
    // park_front_left_building,
    // park_behind_building,
    // park_behind_left_building,
    // park_behind_front_left_building,
    // park_right_building,
    // park_right_left_building,
    progressions: [
      [
        LevelTemplateName.park_car ,
        LevelTemplateName.park_front_building ,
        LevelTemplateName.park_left_building ,
        LevelTemplateName.park_front_left_building ,
        LevelTemplateName.park_front_left_building ,
        LevelTemplateName.park_behind_building ,
        LevelTemplateName.park_behind_left_building ,
        LevelTemplateName.park_behind_left_building ,
        LevelTemplateName.park_right_building ,
        LevelTemplateName.park_right_left_building ,
        LevelTemplateName.park_right_left_building ,
        LevelTemplateName.park_around_building,
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
  // CUTTING FRUITS
  // cut_fruit_1,
  // cut_fruits_bowl_all,
  // cut_avocado,
  // cut_kiwi_avocado,
  // place_kiwi_bowl,
  // place_avocado_bowl,
  // place_cut_kiwi_avocado,
  // place_cut_broccoli,
  // place_cut_lemon,
  // place_cut_lemon_broccoli,
  // place_cut_onion,
  // place_cut_watermelon,
  // place_cut_watermelon_onion
  {
    id: LevelTemplateName.cut_fruit_1,
    grid: [
      [
        [[ItemName.kiwi, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]],  [[ItemName.kiwi, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]]
      ]
    ],
    prerequisites: [],
    props: [LevelProperty.DisableMovementQuests]
  },
  {
    id: LevelTemplateName.cut_avocado,
    grid: [
      [
        [[ItemName.avocado, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.avocado, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]]
      ]
    ]
  },
  {
    id: LevelTemplateName.cut_fruits_bowl_all,
    grid: [
      [
        [[ItemName.knife, ItemName.bowl], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.knife, ItemName.bowl], [{name:FieldPropertyName.ForceUniqueItem}]], [[]]
      ],
      [
        [cuttableFruits], [cuttableFruitsWithBowl], [cuttableFruitsWithBowl]
      ]
    ]
  },
  {
    id: LevelTemplateName.cut_kiwi_avocado,
    grid: [
      [
        [[ItemName.avocado, ItemName.knife, ItemName.kiwi], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.avocado, ItemName.knife, ItemName.kiwi], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.avocado, ItemName.kiwi]]
      ]
    ]
  },
  {
    id: LevelTemplateName.place_kiwi_bowl,
    grid: [
      [
        [[ItemName.kiwi, ItemName.bowl], [{name:FieldPropertyName.ForceUniqueItem}]],  [[ItemName.kiwi, ItemName.bowl], [{name:FieldPropertyName.ForceUniqueItem}]]
      ]
    ],
  },
  {
    id: LevelTemplateName.place_avocado_bowl,
    grid: [
      [
        [[ItemName.avocado, ItemName.bowl], [{name:FieldPropertyName.ForceUniqueItem}]],  [[ItemName.avocado, ItemName.bowl], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.bowl, ItemName.avocado]]
      ]
    ],
  },
  {
    id: LevelTemplateName.place_kiwi_avocado,
    grid: [
      [
        [[ItemName.avocado, ItemName.bowl, ItemName.kiwi], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.avocado, ItemName.bowl, ItemName.kiwi], [{name:FieldPropertyName.ForceUniqueItem}]]
      ],
      [
        [[ItemName.avocado, ItemName.kiwi, ItemName.bowl ]],   [[ItemName.avocado, ItemName.kiwi, ItemName.bowl ]], 
      ]
    ]
  },
  { 
    id: LevelTemplateName.place_cut_kiwi_avocado,
    grid: [
      [
        [[ItemName.avocado, ItemName.bowl, ItemName.kiwi, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.avocado, ItemName.bowl, ItemName.kiwi, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]]
      ],
      [
        [[ItemName.avocado, ItemName.kiwi, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]],  [[ItemName.avocado, ItemName.kiwi, ItemName.bowl ]], 
      ]
    ]

  },
  {
    id: LevelTemplateName.place_cut_broccoli,
    grid: [
      [
        [[ItemName.broccoli, ItemName.bowl,ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.broccoli, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]]
      ],
      [
        [[ItemName.broccoli, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]],  [[ItemName.broccoli, ItemName.bowl ]], 
      ]
    ]
  },
  {
    id: LevelTemplateName.place_cut_lemon,
    grid: [
      [
        [[ItemName.lemon, ItemName.bowl,ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.lemon, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]]
      ],
      [
        [[ItemName.lemon, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]],  [[ItemName.lemon, ItemName.bowl ]], 
      ]
    ]
  },
  {
    id: LevelTemplateName.place_cut_lemon_broccoli,
    grid: [
      [
        [[ItemName.lemon,ItemName.broccoli, ItemName.bowl,ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.lemon,ItemName.broccoli, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.lemon,ItemName.broccoli]]
      ],
      [
        [[ItemName.lemon,ItemName.broccoli, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]],  [[ItemName.lemon,ItemName.broccoli, ItemName.bowl ]],  [[ItemName.lemon,ItemName.broccoli]]
      ]
    ]
  },
  
  {
    id: LevelTemplateName.place_cut_watermelon,
    grid: [
      [
        [[ItemName.watermelon, ItemName.bowl,ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.watermelon, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]]
      ],
      [
        [[ItemName.watermelon, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]],  [[ItemName.watermelon, ItemName.bowl ]], 
      ]
    ]
  },
  {
    id: LevelTemplateName.place_cut_onion,
    grid: [
      [
        [[ItemName.onion, ItemName.bowl,ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.onion, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]]
      ],
      [
        [[ItemName.onion, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]],  [[ItemName.onion, ItemName.bowl ]], 
      ]
    ]
  },
  {
    id: LevelTemplateName.place_cut_watermelon_onion,
    grid: [
      [
        [[ItemName.onion,ItemName.watermelon, ItemName.bowl,ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.onion,ItemName.watermelon, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]], [[ItemName.watermelon,ItemName.onion]]
      ],
      [
        [[ItemName.onion,ItemName.watermelon, ItemName.bowl, ItemName.knife], [{name:FieldPropertyName.ForceUniqueItem}]],  [[ItemName.watermelon,ItemName.onion, ItemName.bowl ]],  [[ItemName.watermelon,ItemName.onion]]
      ]
    ]
  },

  // CAR PACKING (OLD)
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
      [ [basicPackingMix], [basicPackingMix], [colorfulSuitcases]]
    ],
  },
  {
    id: LevelTemplateName.shoes_suitcase_etc_mixed_in_car,
    grid: [
      [[colorfulCars], [[]], [[]]],
      [[basicPackingMix], [basicPackingMix], [basicPackingMix]]
    ],
  },
  // LOCK_UNLOCK
  //   car_open,
  // car_close,
  // car_unlock_open,
  // car_close_lock,
  // door_unlock,
  // door_unlock_open,
  // door_close_lock,
  // box_open,
  // box_close
  {
    id: LevelTemplateName.car_open,
    grid: [
      [
        [[ItemName.hand_pull]],
        [[ItemName.car_mustang_ajar]]
    ]]
  },
  {
    id: LevelTemplateName.car_close,
    grid: [
      [
        [[ItemName.hand_push]],
        [[ItemName.car_mustang_open]]
    ]]
  },
  {
    id: LevelTemplateName.car_unlock_open,
    grid: [
      [
        [[ItemName.car_mustang_closed]], [[]]
      ],
      [
      [[ItemName.hand_pull]], [[ItemName.car_keys]]
      ]
    ]
  },
  {
    id: LevelTemplateName.car_close_lock,
    grid: [
      [
        [[ItemName.car_mustang_open]], [[]]
      ],
      [
      [[ItemName.hand_push]], [[ItemName.car_keys]]
      ]
    ]
  },
  {
    id: LevelTemplateName.car_close_lock_all,
    grid: [
      [
        [[]], [[ItemName.car_mustang_open, ItemName.car_mustang_closed]], [[]]
      ],
      [
        carLockInteractionStuff, carLockInteractionStuff, carLockInteractionStuff
      ]
    ]
  },
  {
    id: LevelTemplateName.door_unlock,
    grid: [
      [
        [[ItemName.door_red_closed]], [[ItemName.key]]
      ]
    ]
  },
  {
    id: LevelTemplateName.door_unlock_open,
    grid: [
      [
        [[ItemName.door_red_closed]], [[]]
      ],
      [
        [[ItemName.key]], [[ItemName.hand_push]]
      ]
    ]
  },
  {
    id: LevelTemplateName.door_close_lock,
    grid: [
      [
        [[ItemName.door_red_open]], [[]]
      ],
      [
        [[ItemName.key]], [[ItemName.hand_pull]]
      ]
    ]
  },
  {
    id: LevelTemplateName.door_close_lock_all,
    grid: [
      [
        [[ItemName.door_red_open, ItemName.door_red_closed, ItemName.door_red_ajar]], [[]], [[]]
      ],
      [
        doorLockInteractionStuff, doorLockInteractionStuff, doorLockInteractionStuff 
      ]
    ]
  },
  {
    id: LevelTemplateName.box_open,
    grid: [
      [
        [[ItemName.box_closed]], [[ItemName.hand_pull]]
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
        [[]], [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 1}}]], [[]]
      ],
      [
        [[ItemName.car_old_movable]], [[]], [[]]
      ]
    ],
    props: [LevelProperty.OnlyAllowRelationalIDsIfTheyExist]
  },
  {
    id: LevelTemplateName.park_behind_front_left_building,
    grid: [
      [
        [[]], [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 1}}]   ]
      ],
      [
        [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 1}}]], [[ItemName.house]], 
      ],
      [
         [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 1}}]]
      ],
      [
        [[ItemName.car_old_movable]], [[]]
      ]
    ],
    props: [LevelProperty.OnlyAllowRelationalIDsIfTheyExist]
  },
  {
    id: LevelTemplateName.park_left_building,
    grid: [
      [
        [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 0, col: 1}}]], [[ItemName.house]], 
      ],
      [
        [[ItemName.car_old_movable]], [[]]
      ],
    ],
    props: [LevelProperty.OnlyAllowRelationalIDsIfTheyExist]
  },
  {
    id: LevelTemplateName.park_right_building,
    grid: [
      [
        [[ItemName.house]],   [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 0, col: 0}}]],
      ],
      [
        [[ItemName.car_old_movable]], [[]]
      ],
    ],
    props: [LevelProperty.OnlyAllowRelationalIDsIfTheyExist]
  },
  {
    id: LevelTemplateName.park_front_left_building,
    grid: [
      [
        [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 0, col: 1}}]], [[ItemName.house]],  ],
      [
        [[]], [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 0, col: 1}}]]
      ],
      [
        [[ItemName.car_old_movable]], [[]]
      ]
    ],
    props: [LevelProperty.OnlyAllowRelationalIDsIfTheyExist]
  },
  {
    id: LevelTemplateName.park_behind_building,
    grid: [
      [
        [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 0}}]]
      ],
      [
        [[ItemName.house]]
      ],
      [
        [[ItemName.car_old_movable]]
      ]
    ],
    props: [LevelProperty.OnlyAllowRelationalIDsIfTheyExist]
  },
  {
    id: LevelTemplateName.park_front_building,
    
    grid: [
      [
        [[ItemName.house]]
      ],
      [
        [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 0, col: 0}}]]
      ],
    
      [
        [[ItemName.car_old_movable]]
      ]
    ],
    props: [LevelProperty.OnlyAllowRelationalIDsIfTheyExist]
  },
  {
    id: LevelTemplateName.park_behind_left_building,
    grid: [
      [
        [[]], [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 1}}]   ]
      ],
      [
        [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 1, col: 1}}]], [[ItemName.house]], 
      ],
      [
        [[ItemName.car_old_movable]], [[]]
      ],
    ],
    props: [LevelProperty.OnlyAllowRelationalIDsIfTheyExist]
  },
  {
    id: LevelTemplateName.park_right_left_building,
    grid: [
      [
        [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 0, col: 1}}]],
        [[ItemName.house]],
        [[ItemName.parking_lot], [{name: FieldPropertyName.IdentifyPositionInRelationToCoordinate, data: {row: 0, col: 1}}]],

      ],
      [
        [[]],
        [[ItemName.car_old_movable]],
        [[]]
      ]
    ],
    props: [LevelProperty.OnlyAllowRelationalIDsIfTheyExist]
  },
  {
    id: LevelTemplateName.park_car,
    grid: [
      [
        [[ItemName.parking_lot]]
      ],
      [
        [[ItemName.car_old_movable]]
      ]
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
