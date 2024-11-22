import { type Quest, type AlchemyAction, type Grid, type Field, type LevelTemplate, LevelProperty } from "@/types";
import { toRaw } from "vue";
import { getActionableActionsOnGrid } from "./alchemyUtils";
import { CapabilityPartnered, capabilityVerbs } from "@/data/affordances";
import { getTranslationForKey } from "./translationUtils";
import { translationStore } from "@/translationStore";


export function getAvailableQuestsBasedOnLevel(level: LevelTemplate, grid: Grid, returnOnlyPlayable = false): Quest[] {
    const quests: Quest[] = []
    const actions = getActionableActionsOnGrid(grid)
    actions.forEach((action) => {
        if (action.affordance in CapabilityPartnered) {
            action.senderKeys.forEach(senderKey => {
                action.receiverKeys?.forEach(receiverKey => {
                    const quest: Quest = {
                        requiredAffordance: action.affordance,
                        requiredReceiverKey: receiverKey,
                        requiredSenderKey: senderKey
                    }
                    quests.push(quest)

                })
            })
        }
    })
    const questsThatArePlayable = quests.filter(quest => {
        return getTranslationForKey(getQuestKey(quest), translationStore.activeLanguageCode) !== undefined
    })

    if (returnOnlyPlayable) {
        return questsThatArePlayable
    } else {
        return quests
    }
}

export function isQuestStillPossible(quest: Quest, grid: Grid): boolean {
    const actions = getActionableActionsOnGrid(grid)
    let isPossible = false
    console.log('checking whether quest is still possible', quest)
    actions.forEach(action => {
        // TODO: what about quests where the og was "put a flower in x" and now only "put the flower in x" is possible??
        if (action.affordance == quest.requiredAffordance) {
            console.log('found affordance match')
            if (quest.requiredReceiverKey === undefined || quest.requiredReceiverKey !== undefined && action.receiverKeys.includes(quest.requiredReceiverKey)) {
                console.log('found receiver match')
                if (quest.requiredSenderKey === undefined || quest.requiredSenderKey !== undefined && action.senderKeys.includes(quest.requiredSenderKey)) {
                    isPossible = true
                    console.log('found sender match')
                }
            }
        }
    })
    return isPossible
}

// I thought I didn't need this, but if I have stuff like level-wide bans of move quests ets
// requires some general redesign, though
// export function getAvailableQuestsBasedOnGridAndLevel

export function getQuestKey(quest: Quest): string {
    let key = ""
    if (quest.requiredSenderKey) {
        key += quest.requiredSenderKey
    } else {
        key += "ANY"
    }


    key += "__" + capabilityVerbs[quest.requiredAffordance] + '__'

    if (quest.requiredReceiverKey) {
        key += quest.requiredReceiverKey
    } else {
        key += "ANY"
    }

    return key

}

export function actionFulfilledQuest(action: AlchemyAction, quest: Quest): boolean {
    let questFufilled = false;
    // affordance must match, otherwise no matter
    if (action.affordance === quest.requiredAffordance) {
        questFufilled = true;
        // if there is a required sender key, check for that
        // (but if it's unset, the quest doesn't care about the sender, so don't check)
        if (quest.requiredSenderKey !== undefined) {
            if (!(action.senderKeys.includes(quest.requiredSenderKey))) {
                questFufilled = false
            }
        }
        if (quest.requiredReceiverKey !== undefined) {
            if (!(action.receiverKeys && action.receiverKeys.includes(quest.requiredReceiverKey))) {
                questFufilled = false
            }
        }

    }
    return questFufilled
}