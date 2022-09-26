import WebFont from "webfontloader";

export const loadFonts = () => {
  WebFont.load({
    google: {
      families: ["sans-serif", "Montserrat:300,400,500,700&display=swap"],
    },
  });
};
