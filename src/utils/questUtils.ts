import { affordanceVerbs } from "@/data/affordances";
import { type Quest, type AlchemyAction } from "@/types";

export function getAvailableQuestsBasedonActionList(actions: AlchemyAction[]): Quest[] {
    const quests: Quest[] = []
    // ANY CUT ANY
    // THE__KNIFE__CUT__ANY
    // ANY__CUT__THE__KIWI
    // THE__KNIFE__CUT__THE__KIWI
    // THE__KNIFE__MOVE

    actions.forEach(action => {
        if (action.sender) {
            action.sender.identifiers.forEach(id => {
                const quest: Quest = {
                    requiredAffordance: action.affordance,
                    requiredSenderKey: id
                }
                quests.push(quest)
            })

        }
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