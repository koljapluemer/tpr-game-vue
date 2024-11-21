import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '@/App.vue'


import { getGridFromLevelTemplate } from '@/utils/gridUtils'
import { capability, capabilityClick, capabilityMove, capabilityPartnered, passiveAffordance, type Capability, type CapabilityClick, type CapabilityMove, type CapabilityPartnered } from "@/data/affordances";
import type { AlchemyAction, AlchemyActionClick, AlchemyActionMove, AlchemyActionPartnered, Field, Grid, Item } from "@/types"
import { ItemName } from '@/data/items';
import test from 'node:test';
import { IsPartneredCapabilityActionableOnField } from '@/utils/alchemyUtils';


const kiwiField: Field = {
    card: {
        item: {
            id: ItemName.kiwi,
            primaryKey: "TEST_KIWI",
            images: [],
            activeAffordances: [capability.Movable],
            passiveAffordances: [passiveAffordance.IsCuttable],
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
            activeAffordances: [capability.Cuts, capability.Movable],
        },
        images: []
    },
    row: 0,
    col: 1,
    identifiers: ["THE__TEST_KNIFE"]
} as const

const cutsAffordance = capability.Cuts


describe('UTILS', () => {
    it('IsPartneredCapabilityActionableOnField(): Cutting A Kiwi', () => {
        expect(IsPartneredCapabilityActionableOnField(cutsAffordance, kiwiField)).toBe(true)
    })

    it('IsPartneredCapabilityActionableOnField(): Cutting A Knife (nonsense)', () => {
        expect(IsPartneredCapabilityActionableOnField(cutsAffordance, knifeField)).toBe(false)
    })
})
