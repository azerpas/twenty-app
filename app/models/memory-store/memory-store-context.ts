import { createContext, useContext } from "react"
import { MemoryStore } from "./memory-store"

/**
 * Create a context we can use to
 * - Access the Memory Store everywhere
 */
const MemoryStoreContext = createContext<MemoryStore>({} as MemoryStore)

/**
 * The provider our root component will use to expose the root store
 */
export const MemoryStoreProvider = MemoryStoreContext.Provider

/**
 * A hook that screens can use to gain access to our stores, with
 * `const { someStore, someOtherStore } = useStores()`,
 * or less likely: `const MemoryStore = useStores()`
 */
export const useMemoryStore = (mapStateToProps?: any): MemoryStore => 
{
    const store = useContext(MemoryStoreContext);
    if (typeof mapStateToProps !== 'undefined') {
        return mapStateToProps(store);
    }
    return store;
}