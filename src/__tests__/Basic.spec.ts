import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '@/App.vue'


import { getGridFromLevelTemplate } from '@/utils/gridUtils'
import { ItemName } from '@/data/items';
import test from 'node:test';
import { getActionableActionsOnGrid, getActionsForWhenFieldIsDroppedOnField, IsPartneredCapabilityActionableOnField } from '@/utils/alchemyUtils';
import { LevelProperty, type Field, type Grid, type Level, type LevelTemplate } from '@/types';
import { CapabilityPartnered, PassiveAffordance } from '@/data/affordances';
import { getAvailableQuestsBasedOnLevel } from '@/utils/questUtils';
import { LevelTemplateName } from '@/data/levelTemplates';
import { getLevelTemplateByID } from '@/utils/levelUtils';
import { setIdentifiersForFields } from '@/utils/identifierUtils';


const kiwiField: Field = {
    card: {
        item: {
            id: ItemName.kiwi,
            primaryKey: "TEST_KIWI",
            images: [],
            isMovable: true,
            activeAffordances: [],
            passiveAffordances: [PassiveAffordance.IsCuttable],
        },
        images: []
    },
    identifiers: ["THE__TEST_KIWI"],
}

const knifeField: Field = {
    card: {
        item: {
            id: ItemName.knife,
            primaryKey: 'TEST_KIFE',
            secondaryKeys: [],
            images: [],
            isMovable: true,
            activeAffordances: [CapabilityPartnered.Cuts],
        },
        images: []
    },
    identifiers: ["THE__TEST_KNIFE"]
} as const

const melonField: Field = {
    card: {
        item: {
            id: ItemName.melon,
            primaryKey: 'TEST_MELON',
            secondaryKeys: [],
            images: [],
            isMovable: true,
            activeAffordances: [CapabilityPartnered.StoresInMedium, CapabilityPartnered.StoresInSmall],
        },
        images: []
    },
    identifiers: ["THE__TEST_MELON"]
} as const

const suitcaseField: Field = {
    card: {
        item: {
            id: ItemName.suitcase_blue,
            primaryKey: 'TEST_SUITCASE',
            secondaryKeys: [],
            images: [],
            isMovable: true,
            activeAffordances: [CapabilityPartnered.StoresInMedium],
            passiveAffordances: [PassiveAffordance.IsStorageSmall]
        },
        images: []
    },
    identifiers: ["THE__TEST_SUITCASE"]
} as const

const carField: Field = {
    card: {
        item: {
            id: ItemName.car_black,
            primaryKey: 'TEST_CAR',
            secondaryKeys: [],
            images: [],
            isMovable: false,
            passiveAffordances: [PassiveAffordance.IsStorageSmall, PassiveAffordance.IsStorageMedium]
        },
        images: []
    },
    identifiers: ["THE__TEST_CAR"]
} as const

const emptyField: Field = {
    card: undefined,
    identifiers: []
}

const kiwiKnifeGrid: Grid = [
    [
        knifeField, emptyField, kiwiField
    ]
]
const twoKiwisOneKnife: Grid = [
    [
        knifeField, emptyField, kiwiField, kiwiField
    ]
]

const gridCarMelonSuitcase: Grid = [
    [
        melonField, suitcaseField, carField
    ]
]

const cutsAffordance = CapabilityPartnered.Cuts

const levelKiwiKnifeGridBasic: LevelTemplate = {
    id: LevelTemplateName.cut_fruit_1,
    grid: []
}

const levelCarBasic: LevelTemplate = {
    id: LevelTemplateName.pack_car_x,
    grid: []
}

// bus stuff

const busLevelTemplate = getLevelTemplateByID(LevelTemplateName.board_bus_front_back)
const busLevelGrid = getGridFromLevelTemplate(busLevelTemplate!) 

const busLevelTemplate3 = getLevelTemplateByID(LevelTemplateName.board_bus_front_back_middle)
const busLevelGrid3 = getGridFromLevelTemplate(busLevelTemplate3!) 


describe('UTILS', () => {
    // alchemy
    it('IsPartneredCapabilityActionableOnField(): Cutting A Kiwi', () => {
        expect(IsPartneredCapabilityActionableOnField(cutsAffordance, kiwiField)).toBe(true)
    })

    it('IsPartneredCapabilityActionableOnField(): Cutting A Knife (nonsense)', () => {
        expect(IsPartneredCapabilityActionableOnField(cutsAffordance, knifeField)).toBe(false)
    })


    it('getActionsForWhenFieldIsDroppedOnField(): knife dropped on kiwi', () => {
        expect(
            getActionsForWhenFieldIsDroppedOnField(knifeField, kiwiField).length
        ).toEqual(1)
    })

    it('getActionsForWhenFieldIsDroppedOnField(): kiwi moved to empty', () => {
        expect(
            getActionsForWhenFieldIsDroppedOnField(kiwiField, emptyField).length
        ).toEqual(0)
    })

    // TODO: unskip
    it.skip('getActionableActionsOnGrid(): basic kiwi-knife field action count', () => {
        expect(
            getActionableActionsOnGrid(twoKiwisOneKnife).length
        ).toEqual(2)
    })
    // quests
    it('getAvailableQuestsBasedOnLevel: 1 kiwi knife quest please', () => {
        expect(
            getAvailableQuestsBasedOnLevel(levelKiwiKnifeGridBasic, kiwiKnifeGrid).length
        ).toEqual(1)
    })
    it.skip('getAvailableQuestsBasedOnLevel: 2 kiwi knife quests please', () => {
        expect(
            getAvailableQuestsBasedOnLevel(levelKiwiKnifeGridBasic, twoKiwisOneKnife).length
        ).toEqual(2)
    })
    // quests pack car
    it('getAvailableQuestsBasedOnLevel: car packing essential', () => {
        expect(
            getAvailableQuestsBasedOnLevel(levelCarBasic, gridCarMelonSuitcase).length
        ).toEqual(4)
    })

    // bus
    it('bus identifier generations correct at base level', () => {
        expect(
            setIdentifiersForFields(busLevelGrid)
        ).toEqual([
            "A__BUS",
            "A__BUS",
            "THE__CHARACTER_WOMAN",
          ])
    })

    it('bus identifier generations correct for front-back', () => {
        expect(
            setIdentifiersForFields(busLevelGrid, [LevelProperty.GenerateRelativePositions])
        ).toEqual([
            "A__BUS",
            "A__BUS",
            "THE__CHARACTER_WOMAN",
            "THE__BUS__AT_BACK",
            "THE__BUS__AT_FRONT",
          ])
    })

    it('bus identifier generations correct for front-back-middle', () => {
        expect(
            setIdentifiersForFields(busLevelGrid3, [LevelProperty.GenerateRelativePositions])
        ).toEqual([
            "A__BUS",
            "A__BUS",
            "A__BUS",
            "THE__CHARACTER_WOMAN",
            "THE__BUS__AT_BACK",
            "THE__BUS__IN_MIDDLE",
            "THE__BUS__AT_FRONT",
          ])
    })
})

