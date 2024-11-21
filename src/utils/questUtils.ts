import { ActiveAffordance, affordancePairs, affordanceVerbs } from "@/data/affordances";
import { type Quest, type AlchemyAction, type Grid, type Field, type LevelTemplate, LevelProperty } from "@/types";
import { activeAffordanceIsActionableOnItem } from "./affordanceUtils";
import { toRaw } from "vue";


export function getAvailableQuestsBasedOnLevel(level: LevelTemplate, grid: Grid): Quest[] {
    const quests: Quest[] = []

    const fieldsWithCards: Field[] = []
    grid.forEach(row => {
        row.forEach(cell => {
            if (cell.card) {
                fieldsWithCards.push(cell)
            }
        })
    })

    fieldsWithCards.forEach(field => {
        field.card?.item.activeAffordances?.forEach(affordance => {
            // indepdent affordance (like move)
            if (affordancePairs[affordance] === undefined) {

                structuredClone(toRaw(field.identifiers)).forEach(key => {
                    const quest: Quest = {
                        requiredAffordance: affordance,
                        requiredSenderKey: key
                    }
                    const questExcluded = (
                        (level.props?.includes(LevelProperty.DisableMovementQuests) && affordance === ActiveAffordance.MOVABLE)
                        || false
                    )
                    if (!questExcluded) {
                        quests.push(quest)
                    }
                })

            } else {
                // affordances needing another to work
                fieldsWithCards.forEach(receiverField => {
                    if (receiverField.card && activeAffordanceIsActionableOnItem(affordance, receiverField.card.item)) {
                        structuredClone(toRaw(field.identifiers)).forEach(senderKey => {
                            structuredClone(toRaw(receiverField.identifiers)).forEach(receiverKey => {
                                const quest: Quest = {
                                    requiredAffordance: affordance,
                                    requiredSenderKey: senderKey,
                                    requiredReceiverKey: receiverKey
                                }
                                const questExcluded = false
                                if (!questExcluded) {
                                    quests.push(quest)
                                }
                            })
                        })
                        // todo: make the other quest types
                        // ANY CUT ANY
                        // THE__KNIFE__CUT__ANY
                        // ANY__CUT__THE__KIWI
                        // THE__KNIFE__CUT__THE__KIWI
                        // THE__KNIFE__MOVE
                    }
                })
            }
        })
    })

    return quests
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
    key += "__" + affordanceVerbs[quest.requiredAffordance] + '__'

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
                console.log('required key', quest.requiredSenderKey, 'not in action key', action.senderKeys)
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