/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect, useRef } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import { NativeBaseProvider } from "native-base"
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
  PrimaryParamList,
} from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import { IUserContext, UserContext } from "./context/user"
import { theme } from "./theme/nativebase"
import { useFlipper } from "@react-navigation/devtools"
enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
function App() {
    const navigationRef = useRef<NavigationContainerRef>(null)
    const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
    const [user, setUser] = useState<IUserContext|null>(null);

    useFlipper(navigationRef);

    setRootNavigation(navigationRef);
    useBackButtonHandler(navigationRef, canExit)
    const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
        storage,
        NAVIGATION_PERSISTENCE_KEY,
    )

    // Handle user state changes
    const onAuthStateChanged = (user: FirebaseAuthTypes.User) => setUser(user);

    // Init Firebase on auth state change
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Kick off initial async loading actions, like loading fonts and RootStore
    useEffect(() => {
        ;(async () => {
        await initFonts() // expo
        setupRootStore().then(setRootStore)
        })()
    }, [])

    // Before we show the app, we have to wait for our state to be ready.
    // In the meantime, don't render anything. This will be the background
    // color set in native by rootView's background color. You can replace
    // with your own loading component if you wish.
    if (!rootStore) return null

    // otherwise, we're ready to render the app
    return (
        <UserContext.Provider value={user}>
            <ToggleStorybook>
                <RootStoreProvider value={rootStore}>
                    <NativeBaseProvider theme={theme}>
                        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                            <RootNavigator
                            ref={navigationRef}
                            initialState={initialNavigationState}
                            onStateChange={onNavigationStateChange}
                            />
                        </SafeAreaProvider>
                    </NativeBaseProvider>
                </RootStoreProvider>
            </ToggleStorybook>
        </UserContext.Provider>
    )
}

export default App
