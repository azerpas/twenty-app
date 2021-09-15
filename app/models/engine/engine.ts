import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { EngineContextModel } from "./context"

export const EngineModel = types.model("Engine").props({
    context: types.optional(EngineContextModel, {} as any)
})

type EngineType = Instance<typeof EngineModel>
export interface Engine extends EngineType {}
type EngineSnapshotType = SnapshotOut<typeof EngineModel>
export interface EngineSnapshot extends EngineSnapshotType {}
export const createEngineDefaultModel = () => types.optional(EngineModel, {})