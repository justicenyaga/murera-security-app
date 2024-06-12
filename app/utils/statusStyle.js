import colors from "../config/colors";

export default function (status) {
  const style = { backgroundColor: "#9e9e9e", color: colors.white };

  switch (status) {
    case "Pending":
      style.backgroundColor = "#ffeb3b";
      style.color = colors.medium;
      break;
    case "InProgress":
      style.backgroundColor = "#4caf50";
      break;
  }

  return style;
}
