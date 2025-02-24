import { createTheme, Palette, PaletteOptions } from "@mui/material/styles";

import { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    apiTrail: {
      signInUp: {
        Bg?: string;
        ButtonPrimary?: string;
        ButtonSecondary?: string;
        TextPrimary?: string;
        TextSecondary?: string;
        TextTertiary?: string;
        TextLink?: string;
        TextPlaceholder?: string;
        TextLable?: string;
        Border?: string;
        Error?: string;
        CheckBox?: string;
        CheckedCheckBox?: string;
        CheckBoxTick?: string;
        LayoutCircleBorder?: string;
        LayoutCircleBorderShadow?: string;
        LayoutCirclePrimary?: string;
        LayoutCircleSeconday?: string;
      };
      onboarding: {
        sideBarTitle?: string;
        PrimaryText?: string;
        SecondaryText?: string;
        TertiaryText?: string;
        DisabledText?: string;
        TopBarBg?: string;
        Black?: string;
        WhiteSecondary?: string;
        BlackSecondary?: string;
        Background?: string;
        SecondaryBackground?: string;
        StepperContainerBg?: string;
        Primary?: string;
        Border?: string;
        StepperConnector?: string;
        StepperTextDefault?: string;
        StepperTextActive?: string;
        StepperTextPrimary?: string;
        StepperTextSecondary?: string;
        StepperTextTertary?: string;
        StepperIconComplete?: string;
        StepperIconActive?: string;
        StepperIconDefault?: string;
        ButtonPrimary?: string;
        ButtonSecondary?: string;
        ButtonBorder?: string;
        ButtonBorderSecondary?: string;
        Loader?: string;
        SkeletonDefault?: string;
        SkeletonPrimary?: string;
        HelperText?: string;
        InputBg?: string;
        InputBg1?: string;
        InputBg2?: string;
        InputBg3?: string;
        InputBg4?: string;
        Gray?: string;
        Red?: string;
        RadioBg?: string;
        RadioBg1?: string;
        RadioBg2?: string;
        RadioBg3?: string;
        RadioBg4?: string;
        RadioBg5?: string;
        RadioBg6?: string;
        RadioBg7?: string;
        RadioBg8?: string;
        Link?: string;
        LGrayishBlue?: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    apiTrail?: {
      signInUp?: {
        Bg?: string;
        ButtonPrimary?: string;
        ButtonSecondary?: string;
        TextPrimary?: string;
        TextSecondary?: string;
        TextTertiary?: string;
        TextLink?: string;
        TextPlaceholder?: string;
        TextLable?: string;
        Border?: string;
        Error?: string;
        CheckBox?: string;
        CheckedCheckBox?: string;
        CheckBoxTick?: string;
        LayoutCircleBorder?: string;
        LayoutCircleBorderShadow?: string;
        LayoutCirclePrimary?: string;
        LayoutCircleSeconday?: string;
      };
      onboarding: {
        sideBarTitle?: string;
        PrimaryText?: string;
        SecondaryText?: string;
        TertiaryText?: string;
        DisabledText?: string;
        TopBarBg?: string;
        Black?: string;
        WhiteSecondary?: string;
        BlackSecondary?: string;
        Background?: string;
        SecondaryBackground?: string;
        StepperContainerBg?: string;
        Primary?: string;
        Border?: string;
        StepperConnector?: string;
        StepperTextDefault?: string;
        StepperTextActive?: string;
        StepperTextPrimary?: string;
        StepperTextSecondary?: string;
        StepperTextTertary?: string;
        StepperIconComplete?: string;
        StepperIconActive?: string;
        StepperIconDefault?: string;
        ButtonPrimary?: string;
        ButtonSecondary?: string;
        ButtonBorder?: string;
        ButtonBorderSecondary?: string;
        Loader?: string;
        SkeletonDefault?: string;
        SkeletonPrimary?: string;
        HelperText?: string;
        InputBg?: string;
        InputBg1?: string;
        InputBg2?: string;
        InputBg3?: string;
        InputBg4?: string;
        Gray?: string;
        Red?: string;
        RadioBg?: string;
        RadioBg1?: string;
        RadioBg2?: string;
        RadioBg3?: string;
        RadioBg4?: string;
        RadioBg5?: string;
        RadioBg6?: string;
        RadioBg7?: string;
        RadioBg8?: string;
        Link?: string;
        LGrayishBlue?: string;
      };
    };
  }
}

declare module "@mui/material/styles" {
  interface Palette extends landingPagePalette {}
  interface PaletteOptions extends landingPagePaletteOptions {}
  interface Palette extends signInUpPalette {}
  interface PaletteOptions extends signInUpPaletteOptions {}
  interface Palette extends DashboardPalette {}
  interface PaletteOptions extends DashboardPaletteOptions {}
}

interface landingPagePalette {
  landingPrimary: Palette["primary"];
  landingBg: Palette["primary"];
  landingLogInBtnText: Palette["primary"];
  landingNavBg: Palette["primary"];
  landingNavLink: Palette["primary"];
  landingStartWithFreeBtn: Palette["primary"];
  landingContactUsBtn: Palette["primary"];
  landingContactUsBtnBg: Palette["primary"];
  landingHeroSectionDesc: Palette["primary"];
  landingNavLinkHighlight: Palette["primary"];
}

interface landingPagePaletteOptions {
  landingPrimary: PaletteOptions["primary"];
  landingBg: PaletteOptions["primary"];
  landingLogInBtnText: PaletteOptions["primary"];
  landingNavBg: PaletteOptions["primary"];
  landingNavLink: PaletteOptions["primary"];
  landingStartWithFreeBtn: PaletteOptions["primary"];
  landingContactUsBtn: PaletteOptions["primary"];
  landingContactUsBtnBg: PaletteOptions["primary"];
  landingHeroSectionDesc: PaletteOptions["primary"];
  landingNavLinkHighlight: PaletteOptions["primary"];
}

interface signInUpPalette {
  signInUpBg: Palette["primary"];
  signInButtonPrimary: Palette["primary"];
  signInButtonSecondary: Palette["primary"];
  signInTextPrimary: Palette["primary"];
  signInTextSecondary: Palette["primary"];
  signInTextTertiary: Palette["primary"];
  signInTextLink: Palette["primary"];
  signInTextPlaceholder: Palette["primary"];
  signInTextLable: Palette["primary"];
  signInBorder: Palette["primary"];
}

interface signInUpPaletteOptions {
  signInUpBg: PaletteOptions["primary"];
  signInButtonPrimary: PaletteOptions["primary"];
  signInButtonSecondary: PaletteOptions["primary"];
  signInTextPrimary: PaletteOptions["primary"];
  signInTextSecondary: PaletteOptions["primary"];
  signInTextTertiary: PaletteOptions["primary"];
  signInTextLink: PaletteOptions["primary"];
  signInTextPlaceholder: PaletteOptions["primary"];
  signInTextLable: PaletteOptions["primary"];
  signInBorder: PaletteOptions["primary"];
}

interface DashboardPalette {}

interface DashboardPaletteOptions {}

const lightTheme = createTheme({
  palette: {
    // signInUP
    signInUpBg: {
      main: "#F6F4FF",
    },
    signInButtonPrimary: {
      main: "#7448F4",
    },
    signInButtonSecondary: {
      main: "#FFFFFFBF",
    },
    signInTextPrimary: {
      main: "#FFFFFF",
    },
    signInTextSecondary: {
      main: "#121212BF",
    },
    signInTextTertiary: {
      main: "#121212BF",
    },
    signInTextLink: {
      main: "#7448F4",
    },
    signInTextPlaceholder: {
      main: "#12121266",
    },
    signInTextLable: {
      main: "#12121280",
    },
    signInBorder: {
      main: "#12121240",
    },
    landingPrimary: {
      main: "#FFFFFF",
    },
    landingBg: {
      main: "#000000",
    },
    landingLogInBtnText: {
      main: "#7448F4",
    },
    landingNavBg: {
      main: "#ffffff40",
    },
    landingNavLink: {
      main: "#ffffffbf",
    },
    landingStartWithFreeBtn: {
      main: "#7448F4",
    },
    landingContactUsBtn: {
      main: "#ffffff80",
    },
    landingContactUsBtnBg: {
      main: "#FFFFFF33",
    },
    landingHeroSectionDesc: {
      main: "#bfbfbf",
    },
    landingNavLinkHighlight: {
      main: "#7946FD",
    },
  },
  apiTrail: {
    signInUp: {
      Bg: "#F6F4FF",
      ButtonPrimary: "#7448F4",
      ButtonSecondary: "#FFFFFFBF",
      TextPrimary: "#FFFFFF",
      TextSecondary: "#121212BF",
      TextTertiary: "#121212BF",
      TextLink: "#7448F4",
      TextPlaceholder: "#12121266",
      TextLable: "#12121280",
      Border: "#12121240",
      Error: "#d32f2f",
      CheckBox: "#D9D9D9",
      CheckedCheckBox: "#D9D9D9",
      CheckBoxTick: "#4CAF50",
      LayoutCircleBorder: "#C688EA59",
      LayoutCircleBorderShadow: "#DBACFF80",
      LayoutCirclePrimary: "#ED634C",
      LayoutCircleSeconday: "#A049E1",
    },
    onboarding: {
      sideBarTitle: "#B7A9F6",
      PrimaryText: "#F3F3F3",
      SecondaryText: "#F3F3F3BF",
      TertiaryText: "#FFFFFFBF",
      DisabledText: "#F3F3F380",
      TopBarBg: "#94949426",
      Black: "#000",
      WhiteSecondary: "#f0f0f0",
      BlackSecondary: "#d0dee71f",
      Background: "#12121280",
      SecondaryBackground: "#19181f",
      StepperContainerBg: "#121212BF",
      Primary: "#fff",
      Border: "#FFFFFF80",
      StepperConnector: "#4F4F4F80",
      StepperTextDefault: "#9A9A9A",
      StepperTextActive: "#F3F3F3",
      StepperTextPrimary: "#F3F3F380",
      StepperTextSecondary: "#F3F3F3BF",
      StepperTextTertary: "#FFFFFFBF",
      StepperIconComplete: "#287444",
      StepperIconActive: "#7A43FE",
      StepperIconDefault: "#343434",
      ButtonPrimary: "#37265C",
      ButtonSecondary: "#F3F3F31A",
      ButtonBorder: "#F3F3F340",
      ButtonBorderSecondary: "#FFFFFF40",
      Loader: "#1976d2",
      SkeletonDefault: "#473d51",
      SkeletonPrimary: "#2f2935",
      HelperText: "#d32f2f",
      InputBg: "#7946FD40",
      InputBg1: "#291e3b",
      InputBg2: "#18151c",
      InputBg3: "#c9c9c961",
      InputBg4: "#31244F80",
      Gray: "#808080",
      Red: "#ff0000",
      RadioBg: "#D9D9D9",
      RadioBg1: "#D9D9D980",
      RadioBg2: "#ced9e0",
      RadioBg3: "#30404d",
      RadioBg4: "#394b59",
      RadioBg5: "#394b59",
      RadioBg6: "#10161a66",
      RadioBg7: "#ffffff0d",
      RadioBg8: "#ffffff00",
      Link: "#327fb9",
      LGrayishBlue: "#211c27",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    // signInUP
    signInUpBg: {
      main: "#F6F4FF",
    },
    signInButtonPrimary: {
      main: "#7448F4",
    },
    signInButtonSecondary: {
      main: "#FFFFFFBF",
    },
    signInTextPrimary: {
      main: "#FFFFFF",
    },
    signInTextSecondary: {
      main: "#121212BF",
    },
    signInTextTertiary: {
      main: "#121212BF",
    },
    signInTextLink: {
      main: "#7448F4",
    },
    signInTextPlaceholder: {
      main: "#12121266",
    },
    signInTextLable: {
      main: "#12121280",
    },
    signInBorder: {
      main: "#12121240",
    },
    landingPrimary: {
      main: "#FFFFFF",
    },
    landingBg: {
      main: "#000000",
    },
    landingLogInBtnText: {
      main: "#7448F4",
    },
    landingNavBg: {
      main: "#ffffff40",
    },
    landingNavLink: {
      main: "#ffffffbf",
    },
    landingStartWithFreeBtn: {
      main: "#7448F4",
    },
    landingContactUsBtn: {
      main: "#ffffff80",
    },
    landingContactUsBtnBg: {
      main: "#ffffff33",
    },
    landingHeroSectionDesc: {
      main: "#bfbfbf",
    },
    landingNavLinkHighlight: {
      main: "#7946FD",
    },
  },
  apiTrail: {
    signInUp: {
      Bg: "#F6F4FF",
      ButtonPrimary: "#7448F4",
      ButtonSecondary: "#FFFFFFBF",
      TextPrimary: "#FFFFFF",
      TextSecondary: "#121212BF",
      TextTertiary: "#121212BF",
      TextLink: "#7448F4",
      TextPlaceholder: "#12121266",
      TextLable: "#12121280",
      Border: "#12121240",
      Error: "#d32f2f",
      CheckBox: "#D9D9D9",
      CheckedCheckBox: "#D9D9D9",
      CheckBoxTick: "#4CAF50",
      LayoutCircleBorder: "#C688EA59",
      LayoutCircleBorderShadow: "#DBACFF80",
      LayoutCirclePrimary: "#ED634C",
      LayoutCircleSeconday: "#A049E1",
    },
    onboarding: {
      sideBarTitle: "#B7A9F6",
      PrimaryText: "#F3F3F3",
      SecondaryText: "#F3F3F3BF",
      TertiaryText: "#FFFFFFBF",
      DisabledText: "#F3F3F380",
      TopBarBg: "#94949426",
      Black: "#000",
      WhiteSecondary: "#f0f0f0",
      BlackSecondary: "#d0dee71f",
      Background: "#12121280",
      SecondaryBackground: "#19181f",
      StepperContainerBg: "#121212BF",
      Primary: "#fff",
      Border: "#FFFFFF80",
      StepperConnector: "#4F4F4F80",
      StepperTextDefault: "#9A9A9A",
      StepperTextActive: "#F3F3F3",
      StepperTextPrimary: "#F3F3F380",
      StepperTextSecondary: "#F3F3F3BF",
      StepperTextTertary: "#FFFFFFBF",
      StepperIconComplete: "#287444",
      StepperIconActive: "#7A43FE",
      StepperIconDefault: "#343434",
      ButtonPrimary: "#37265C",
      ButtonSecondary: "#F3F3F31A",
      ButtonBorder: "#F3F3F340",
      ButtonBorderSecondary: "#FFFFFF40",
      Loader: "#1976d2",
      SkeletonDefault: "#473d51",
      SkeletonPrimary: "#2f2935",
      HelperText: "#d32f2f",
      InputBg: "#7946FD40",
      InputBg1: "#291e3b",
      InputBg2: "#18151c",
      InputBg3: "#c9c9c961",
      InputBg4: "#31244F80",
      Gray: "#808080",
      Red: "#ff0000",
      RadioBg: "#D9D9D9",
      RadioBg1: "#D9D9D980",
      RadioBg2: "#ced9e0",
      RadioBg3: "#30404d",
      RadioBg4: "#394b59",
      RadioBg5: "#394b59",
      RadioBg6: "#10161a66",
      RadioBg7: "#ffffff0d",
      RadioBg8: "#ffffff00",
      Link: "#327fb9",
      LGrayishBlue: "#211c27",
    },
  },
});

const theme = lightTheme;
// const theme = darkTheme;
export { lightTheme, darkTheme };

export default theme;
