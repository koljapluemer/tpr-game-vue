import type { AlchemyAction, Card, FieldProperty } from "@/types"
import type { RefactorCard } from "./RefactorCard"

export class RefactorField {
    card: RefactorCard | undefined
    props: FieldProperty[] = []

    public getActionsWhenYouDropCardOnMe(droppedCard:RefactorCard): AlchemyAction[] {
        const actions: AlchemyAction[] = []
        // senderField.card?.item.activeAffordances?.forEach(affordance => {
        //     if (IsPartneredCapabilityActionableOnField(affordance, receiverField)) {
        //         actions.push(makePartneredAction(senderField, receiverField, affordance))
        //     }
        // })
        return actions
    }
    
}