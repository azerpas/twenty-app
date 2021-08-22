import * as React from "react"
import { View as ReactNativeView } from "react-native"
import { ViewProps } from "./view.props"
import { presets } from "./view.presets"

/**
 * For your view displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function View(props: ViewProps) {
  // grab the props
  const { children, style: styleOverride, ...rest } = props

  // figure out which content to use
  const content = children

  const style = presets;
  const styles = [style, styleOverride]

  return (
    <ReactNativeView {...rest} style={styles}>
      {content}
    </ReactNativeView>
  )
}
