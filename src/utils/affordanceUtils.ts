import { affordancePairs, PassiveAffordance, type ActiveAffordance } from "@/data/affordances";
import type { Item, AlchemyAction } from "@/types";

export function activeAffordanceIsActionableOnItem(affordance: ActiveAffordance, item: Item): boolean {
    const requiresOneOfTheFollowingAffordances: PassiveAffordance[] | undefined = affordancePairs[affordance]
    if (requiresOneOfTheFollowingAffordances === undefined) {
        return true
    } else {
        let matchFound = false
        requiresOneOfTheFollowingAffordances.forEach(passiveAffordance => {
            if (item.passiveAffordances !== undefined) {
                if (passiveAffordance in item.passiveAffordances) {
                    matchFound = true
                }
            }
        })
        return matchFound
    }
}
