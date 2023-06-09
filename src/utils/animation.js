import { paths } from "./svg-data";

export const handlePathAnimation = (svgRef, isScrolledUp, scrollPosition) => {
  if (svgRef.current.getAttribute("style") !== null && isScrolledUp) {
    return;
  }

  document.querySelectorAll(".anim-path").forEach((each, i) => {
    if (isScrolledUp) {
      each.style.transitionTimingFunction = "ease-in";
      each.setAttribute(
        "d",
        scrollPosition <= 200 ? paths.initial[i] : paths.medium[i]
      );
    } else {
      each.setAttribute(
        "d",
        scrollPosition <= 200 ? paths.medium[i] : paths.final[i]
      );
    }
  });
};

export const handleScaleAnimation = (
  svgRef,
  isScrolledUp,
  scaleTimeoutId,
  setScaleTimeoutId,
  pathTimeoutId,
  setPathTimeoutId,
  scrollPosition,
  scaleStart,
  setScaleStart
) => {
  const animPath = document.querySelectorAll(".anim-path");

  if (isScrolledUp) {
    svgRef.current.style.transform = "scale(1,1)";
    clearTimeout(scaleTimeoutId);
    const id = setTimeout(() => {
      animPath.forEach((each, i) => {
        each.style.transitionTimingFunction = "ease-in";
        each.setAttribute(
          "d",
          scrollPosition <= 200 ? paths.initial[i] : paths.medium[i]
        );
      });
    }, 3500);
    setPathTimeoutId(id);
    setScaleStart(false);
  } else {
    clearTimeout(pathTimeoutId);
    const scaleFactor = 2 + scrollPosition / 1000;

    const id = setTimeout(() => {
      svgRef.current.style.transform = `scale(${scaleFactor}, ${scaleFactor})`;
      animPath.forEach((each, i) => {
        each.setAttribute("d", paths.final[i]);
      });
      setScaleStart(true);
    }, 1500);

    if (scaleStart) {
      svgRef.current.style.transform = `scale(${scaleFactor}, ${scaleFactor})`;
    }
    setScaleTimeoutId(id);
  }
};
