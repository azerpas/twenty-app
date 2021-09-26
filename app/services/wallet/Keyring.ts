import { cast, types } from "mobx-state-tree";
import { KeyringStore, KeyringStoreModel } from "../../models/keyring-store/keyring-store";
import { MemoryStore, MemoryStoreModel } from "../../models/memory-store/memory-store";
import { Keyring as KeyringType, KeyringModel } from "../../models/keyring/keyring";
import { RNMnemonicKey } from "react-native-mnemonic-key";

export default class Keyring {
    /**
     * Encrypted data saved in device storage
     */
    store: KeyringStore;
    /**
     * Decrypted data unsaved
     */
    memoryStore: MemoryStore;
    keyrings: KeyringType[];
    password: string;

    constructor(init){
        this.store = KeyringStoreModel.create(init);
        this.memoryStore = MemoryStoreModel.create();
        this.keyrings = [];
    }

    hello = () => {
        console.log("hello !");
    }
    
    createNewKeychain = async (password: string) => {
        this.clearKeyrings();

        await this.store.persist(this.keyrings, password);
        await this.addNewKeyring();
        await this.store.setUnlocked();
        this.memoryStore.keyrings = cast(this.keyrings);
    }

    clearKeyrings = () => {
        this.memoryStore.keyrings = cast([]); // https://stackoverflow.com/a/55740478/12440368
        this.keyrings = [];
    }

    addNewKeyring = async () => {
        const key = await RNMnemonicKey.create();
        const Keyring = KeyringModel.create({
            wallets: [
                {
                    publicKey: key.publicKey.toString('hex'),
                    privateKey: key.privateKey.toString('hex')
                }
            ]
        });
        this.keyrings.push(Keyring);
        await this.store.persist(this.keyrings, this.password)
    }

    exportSeedPhrase = () => {
        return this.keyrings[0].mnemonic;
    }
    
}