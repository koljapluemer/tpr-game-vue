export type FieldProperty = {
    id: FieldPropertyId,
    payload?: any

}

export enum FieldPropertyId {
    IdentifyPositionInRelationToCoordinate,
    ForceUniqueItem
}