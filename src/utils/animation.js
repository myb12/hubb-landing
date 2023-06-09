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

export const morphAnimation = (text1, text2) => {
  const elts = {
    text1: text1,
    text2: text2,
  };

  // The strings to morph between. You can change these to anything you want!
  const texts = [
    "Love",
    "Home",
    "Community",
    "Health",
    "Nature",
    "Tranquility",
    "Family",
  ];

  // Controls the speed of morphing.
  const morphTime = 1;
  const cooldownTime = 0.25;

  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  // A lot of the magic happens here, this is what applies the blur filter to the text.
  function setMorph(fraction) {
    // fraction = Math.cos(fraction * Math.PI) / -2 + .5;

    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
  }

  function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
  }

  // Animation loop, which is called every frame.
  function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }

  // Start the animation.
  animate();
};
