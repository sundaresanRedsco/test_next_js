// src/mui-theme.d.ts
import { Palette, PaletteOptions } from "@mui/material/styles";
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
  interface Palette {
    // Landing Page custom properties
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
    // SignIn/SignUp custom properties
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
  interface PaletteOptions {
    landingPrimary?: PaletteOptions["primary"];
    landingBg?: PaletteOptions["primary"];
    landingLogInBtnText?: PaletteOptions["primary"];
    landingNavBg?: PaletteOptions["primary"];
    landingNavLink?: PaletteOptions["primary"];
    landingStartWithFreeBtn?: PaletteOptions["primary"];
    landingContactUsBtn?: PaletteOptions["primary"];
    landingContactUsBtnBg?: PaletteOptions["primary"];
    landingHeroSectionDesc?: PaletteOptions["primary"];
    landingNavLinkHighlight?: PaletteOptions["primary"];
    //
    signInUpBg?: PaletteOptions["primary"];
    signInButtonPrimary?: PaletteOptions["primary"];
    signInButtonSecondary?: PaletteOptions["primary"];
    signInTextPrimary?: PaletteOptions["primary"];
    signInTextSecondary?: PaletteOptions["primary"];
    signInTextTertiary?: PaletteOptions["primary"];
    signInTextLink?: PaletteOptions["primary"];
    signInTextPlaceholder?: PaletteOptions["primary"];
    signInTextLable?: PaletteOptions["primary"];
    signInBorder?: PaletteOptions["primary"];
  }
}
