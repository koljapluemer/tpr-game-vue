import { type Quest, type AlchemyAction, type Grid, type Field, type LevelTemplate, LevelProperty } from "@/types";
import { toRaw } from "vue";
import { getActionableActionsOnGrid } from "./alchemyUtils";
import { CapabilityPartnered, capabilityVerbs } from "@/data/affordances";
import { getTranslationForKey } from "./translationUtils";


export function getAvailableQuestsBasedOnLevel(level: LevelTemplate, grid: Grid): Quest[] {
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
        getTranslationForKey(getQuestKey(quest), "ar") !== undefined
    })
    return questsThatArePlayable
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
        if (quest.requiredSenderKey) {
            if (!(action.senderKeys.includes(quest.requiredSenderKey))) {
                questFufilled = false
            }
        }
        if (quest.requiredReceiverKey) {
            if (!(action.receiverKeys && action.receiverKeys.includes(quest.requiredReceiverKey))) {
                questFufilled = false
            }
        }

    }
    return questFufilled
}