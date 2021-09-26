import { cast, getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
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
        createNewKeychain: async (password: string) => {
            self.store.clearKeyrings();
            await self.store.persist(self.keyrings, password);
            await self.addNewKeyring();
            await self.store.setUnlocked();
            return self.keyrings; // TODO: remove
        },
        exportSeedPhrase: () => {
            return self.keyrings[0].mnemonic;
        },
        clearKeyrings: () => {
            self.keyrings = cast([]);
        }
    }));

type EngineType = Instance<typeof EngineModel>
export interface Engine extends EngineType {}
type EngineSnapshotType = SnapshotOut<typeof EngineModel>
export interface EngineSnapshot extends EngineSnapshotType {}
export const createEngineDefaultModel = () => types.optional(EngineModel, {})