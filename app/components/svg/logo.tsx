import * as React from "react"
import Svg, {
  SvgProps,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"
import { View, StyleSheet } from "react-native"

export const LogoSvg = (props: SvgProps) => {
    return (
        <View>
            <Svg
                viewBox="0 0 252 301"
                {...props}
            >
                <Circle
                    cx={184.5}
                    cy={172.5}
                    r={57}
                    fill="url(#prefix__paint0_linear)"
                    stroke="#000"
                    strokeWidth={21}
                    strokeMiterlimit={3.33}
                />
                <Path
                    d="M4.3 301v-45.85l95.6-100.68c12.76-14.53 21.73-26.76 26.9-36.68 5.16-9.92 7.74-19.22 7.74-27.92 0-9.64-2.58-17.8-7.75-24.45-5.16-6.8-12.9-10.2-23.23-10.2-11.28 0-19.63 4.02-25.07 12.03-5.43 7.88-8.15 18.55-8.15 32H.44l-.41-1.23c-.4-18.34 3.53-34.91 11.82-49.72 8.42-14.81 20.52-26.56 36.28-35.26C63.89 4.34 82.43 0 103.76 0c32.07 0 57.14 8.22 75.2 24.66 18.21 16.3 27.31 37.84 27.31 64.6 0 12.23-2.1 23.5-6.31 33.83-4.08 10.19-10.87 21.13-20.38 32.81-9.38 11.69-21.95 25.81-37.7 42.39l-44.84 47.48.4 1.02h58.9l3.06-24.66H213V301H4.3z"
                    fill="#000"
                />
                <Path fill="#000" d="M0 92h183v52H0z" />
                <Defs>
                    <LinearGradient
                    id="prefix__paint0_linear"
                    x1={252}
                    y1={170.32}
                    x2={119.18}
                    y2={170.32}
                    gradientUnits="userSpaceOnUse"
                    >
                        <Stop stopColor="#0B31B6" />
                        <Stop offset={1} stopColor="#5136F7" />
                    </LinearGradient>
                </Defs>
            </Svg>
        </View>
    )
}