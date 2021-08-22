import { StyleProp, ViewProps as ViewProperties } from "react-native"
import { ViewPresets } from "./view.presets"

export interface ViewProps extends ViewProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewProperties>

  /**
   * One of the different types of text presets.
   */
  presets?: ViewPresets
}
