import { ConfigPlugin } from "@expo/config-plugins";
import withAndroidWidget from "./withAndroidWidget";
import withIosWidget from "./withIosWidget";

const withWidget: ConfigPlugin = (config) => {
  config = withAndroidWidget(config);
  return withIosWidget(config);
};

export default withWidget;