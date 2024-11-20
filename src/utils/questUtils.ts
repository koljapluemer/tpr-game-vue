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