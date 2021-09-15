import { AccountTrackerController, CurrencyRateController, KeyringController, PreferencesController, TransactionController } from "@metamask/controllers"
import { Instance, SnapshotOut, types, castToSnapshot } from "mobx-state-tree"

export const EngineContextModel = types.model("EngineContext").props({
    KeyringController: types.maybe(castToSnapshot(KeyringController)),
    TransactionController: types.maybe(castToSnapshot(TransactionController)), 
    PreferencesController: types.maybe(castToSnapshot(PreferencesController)),
    CurrencyRateController: types.maybe(castToSnapshot(CurrencyRateController)),
    AccountTrackerController: types.maybe(castToSnapshot(AccountTrackerController))
});

type EngineContextType = Instance<typeof EngineContextModel>
export interface EngineContext extends EngineContextType {}
type EngineContextSnapshotType = SnapshotOut<typeof EngineContextModel>
export interface EngineContextSnapshot extends EngineContextSnapshotType {}
export const createEngineContextDefaultModel = () => types.optional(EngineContextModel, {})