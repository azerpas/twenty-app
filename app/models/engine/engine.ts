import { cast, flow, getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { RNMnemonicKey } from "react-native-mnemonic-key";
import { KeyringStoreModel } from "../keyring-store/keyring-store";
import { KeyringModel } from "../keyring/keyring";
import { MemoryStoreModel } from "../memory-store/memory-store";

/**
 * Engine model.
 */
export const EngineModel = types.model("Engine")
    .props({
        store: types.optional(KeyringStoreModel, {}),
        keyrings: types.array(KeyringModel),
        password: types.optional(types.string, "")
    })
    .actions(self => ({
        addNewKeyring: async () => {
            const key = await RNMnemonicKey.create();
            
            const Keyring = KeyringModel.create({
                wallets: [
                    {
                        publicKey: key.publicKey.toString('hex'),
                        privateKey: key.privateKey.toString('hex')
                    }
                ]
            });
            
            self.keyrings.push(Keyring);
            await self.store.persist(self.keyrings, self.password)
        }
    }))
    .actions(self => ({
        createNewKeychain: flow(function* (password: string){
            console.info(`Starting createNewKeychain`);
            self.store.clearKeyrings();
            console.info(`Cleared keyrings`);
            yield self.store.persist(self.keyrings, password);
            console.info(`Persisted keyrings`);
            yield self.addNewKeyring();
            console.info(`Added new keyring`);
            self.store.setUnlocked();
            return self.keyrings; // TODO: remove
        }),
        exportSeedPhrase: () => {
            return self.keyrings[0].mnemonic;
        },
        clearKeyrings: () => {
            self.keyrings = cast([]);
        },
        hello: () => {
            console.log(`WORLD`)
        }
    }));

type EngineType = Instance<typeof EngineModel>
export interface Engine extends EngineType {}
type EngineSnapshotType = SnapshotOut<typeof EngineModel>
export interface EngineSnapshot extends EngineSnapshotType {}
export const createEngineDefaultModel = () => types.optional(EngineModel, {})