export const weatherIcon = (id: string) => {
  if (id.includes("01")) {
    return require("../../../assets/images/demo/Bigger/weather_icon_bigger-01.png");
  } else if (id.includes("02") || id.includes("03") || id.includes("04")) {
    return require("../../../assets/images/demo/Bigger/weather_icon_bigger-02.png");
  } else if (id.includes("09")) {
    return require("../../../assets/images/demo/Bigger/weather_icon_bigger-04.png");
  } else if (id.includes("10")) {
    return require("../../../assets/images/demo/Bigger/weather_icon_bigger-03.png");
  } else if (id.includes("11")) {
    return require("../../../assets/images/demo/Bigger/weather_icon_bigger-05.png");
  } else if (id.includes("13")) {
    return require("../../../assets/images/demo/Bigger/weather_icon_bigger-14.png");
  } else if (id.includes("50")) {
    return require("../../../assets/images/demo/Bigger/weather_icon_bigger-13.png");
  }
};
