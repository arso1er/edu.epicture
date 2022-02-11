import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 980 614" {...props}>
      <Path
        d="M461 1.6c-86.5 8-170.4 42.3-259.5 106.3-68 48.8-142 121.3-197.4 193.4L-.2 307l3.3 4.2c57.5 73.7 120.1 136 187.1 186.3 78.9 59.2 159.7 96.9 235.8 109.9 25.9 4.5 34.1 5.1 65 5 31.4 0 42.2-1 69-6 50.5-9.4 108.4-31.9 160.5-62.4 73.9-43.3 150.6-108.7 218.5-186.5 13.6-15.6 40.5-49.1 40.5-50.4 0-1.2-15.8-21.6-28.9-37.3-35.8-42.9-83-90.1-125.2-125.4-87.2-72.9-175-118.8-259.8-135.8-28.4-5.8-39-6.8-71.1-7.1-15.9-.1-31-.1-33.5.1zm50 122.9c40.8 4.7 76.7 21.8 106.4 50.5 45.9 44.5 65 105.9 52.5 168.9-12.6 63.3-59.8 116.5-121.6 137.1-96.2 32-200.4-20-232.3-115.8-16.9-50.7-11.2-105.9 15.5-151.2 15-25.3 38-48.7 62.8-63.9 34.9-21.3 76.1-30.4 116.7-25.6z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default SvgComponent;
