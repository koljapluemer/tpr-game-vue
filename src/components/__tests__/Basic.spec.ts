import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '@/App.vue'


import { getGridFromLevelTemplate } from '@/utils/gridUtils'
import { ItemName } from '@/data/items';
import test from 'node:test';
import { getActionableActionsOnGrid, getActionsForWhenFieldIsDroppedOnField, IsPartneredCapabilityActionableOnField } from '@/utils/alchemyUtils';
import type { Field, Grid } from '@/types';
import { CapabilityPartnered, PassiveAffordance } from '@/data/affordances';


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
    row: 0,
    col: 0,
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
    row: 0,
    col: 1,
    identifiers: ["THE__TEST_KNIFE"]
} as const

const emptyField: Field = {
    card: undefined,
    row: 0,
    col: 2,
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
const cutsAffordance = CapabilityPartnered.Cuts


describe('UTILS', () => {
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

    it('getActionableActionsOnGrid(): basic kiwi-knife field action count', () => {
        expect(
            getActionableActionsOnGrid(twoKiwisOneKnife).length
        ).toEqual(2)
    })
})
