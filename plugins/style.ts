import { Plugin } from "@nuxt/types";
import { Params } from "~/models/Params";

declare module "@nuxt/types" {
  interface Context {
    $style: {
      colors: { [key: string]: string };
      set: (t?: "dark" | "light") => void;
    };
  }
}

const plugin: Plugin = (context) => {
  const setTheme = async (t?: "dark" | "light") => {
    const old = t;
    if (!t) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        t = "dark";
      } else {
        t = "light";
      }
    }

    let ts = ["255, 255, 255", "13, 17, 23"];
    if (t === "dark") ts = ts.reverse();

    // primary = 31 111 235

    // const theme = {
    //   light: {
    //     light: "255, 255, 255",
    //     dark: "13, 17, 23",
    //     surface: "242, 242, 242",
    //   },
    //   dark: {
    //     dark: "255, 255, 255",
    //     light: "32, 32, 32",
    //     surface: "28, 28, 28",
    //   },
    // };

    const colors: { [key: string]: string } = {
      primary: ["218, 42, 42", "255, 215, 0", "0, 0, 0", "31, 111, 235"][3],
      danger: "230, 60, 60",
      success: ["23, 201, 100", "44, 135, 44"][1],

      white: "255, 255, 255",
      black: "0, 0, 0",
      // ...theme[t],

      light: ts[0],
      dark: ts[1],
    };

    for (const key of Object.keys(colors)) {
      document.documentElement.style.setProperty(`--${key}`, colors[key]);
    }

    await context.store.dispatch("params/setTheme", old);
    context.$style = { colors, set: setTheme };
  };

  let theme: "dark" | "light" | undefined;
  const params = context.store.getters["params/get"] as Params;
  if (params) theme = params.theme;

  setTheme(theme);
};

export default plugin;
