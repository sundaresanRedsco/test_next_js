import { createTheme, Palette, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette extends signInUpPalette {}
  interface PaletteOptions extends signInUpPaletteOptions {}
  interface Palette extends DashboardPalette {}
  interface PaletteOptions extends DashboardPaletteOptions {}
}

interface signInUpPalette {
  signInUpBackground: Palette["primary"];
  signInUpBlack: Palette["primary"];
  signInUpWhite: Palette["primary"];
  signInUpPrimary: Palette["primary"];
  signInUpDimGray: Palette["primary"];
  signInUpLightGray: Palette["primary"];
  signInUpPurple: Palette["primary"];
}

interface signInUpPaletteOptions {
  signInUpBackground: PaletteOptions["primary"];
  signInUpBlack: PaletteOptions["primary"];
  signInUpWhite: PaletteOptions["primary"];
  signInUpPrimary: PaletteOptions["primary"];
  signInUpDimGray: PaletteOptions["primary"];
  signInUpLightGray: PaletteOptions["primary"];
  signInUpPurple: PaletteOptions["primary"];
}

interface DashboardPalette {
  primaryWhite: Palette["primary"];
  primaryBlack: Palette["primary"];
  primaryBlue: Palette["primary"];
  primaryPurple: Palette["primary"];
  primaryGrey: Palette["primary"];
  grayishBlue: Palette["primary"];
  LGrayishBlue: Palette["primary"];
  silverGrey: Palette["primary"];
  btnCancelGrey: Palette["primary"];
  primaryBody: Palette["primary"];
  navbarBody: Palette["primary"];
  primaryText: Palette["primary"];
  secondaryBody: Palette["primary"];
  globalHeaderBg: Palette["primary"];
  primaryBorder: Palette["primary"];
  secondaryBorder: Palette["primary"];
  cardInfoBody: Palette["primary"];
  mainWhite: Palette["primary"];
  mainGreen: Palette["primary"];
  mainYellow: Palette["primary"];
  mainRed: Palette["primary"];
  DarkBlack: Palette["primary"];
  CardBlack: Palette["primary"];
  LightBlack: Palette["primary"];
  BackGroundBlack: Palette["primary"];

  secondaryColor: Palette["primary"];
  teritiaryColor: Palette["primary"];
  fourthColor: Palette["primary"];
  fifthColor: Palette["primary"];
  linkColor: Palette["primary"];
  iconBackground: Palette["primary"];
  notifyColor: Palette["primary"];
  royalBlue: Palette["primary"];
  btnGrey: Palette["primary"];

  //
  V2GlobalHeaderBackground: Palette["primary"];
  V2GlobalHeaderColor: Palette["primary"];
  CardButton: Palette["primary"];
  V2SectionBackgroundColor: Palette["primary"];
  V2TextColor: Palette["primary"];
  V2SecondSidebarBackground: Palette["primary"];
  V2SectionMainBackground: Palette["primary"];
  V2OutlinedButtonColor: Palette["primary"];
  //

  v2PrimaryColor: Palette["primary"];
  v2SecondaryColor: Palette["primary"];
  v2SectionColour: PaletteOptions["primary"];
  v2WhiteColour: PaletteOptions["primary"];
  ImportCardColour: PaletteOptions["primary"];
  v2TeritiaryColor: Palette["primary"];
  v2MainTextColor: Palette["primary"];

  //sidebar
  v2SidebarBg1Color: Palette["primary"];
  v2SidebarIconColor: Palette["primary"];
  v2SidebarIconActiveColor: Palette["primary"];
  v2SidebarBg2Color: Palette["primary"];
  v2EndpointColor: Palette["primary"];
  v2EndpointActiveColor: Palette["primary"];
  v2MainButtonColor: Palette["primary"];
  v2IconTextColor: Palette["primary"];
  v2TeamWorkspaceBgColor: Palette["primary"];
  v2MsgBtnBg: Palette["primary"];
  v2BtnBorderColor: Palette["primary"];

  // new colors
  iconSidebarBackground: Palette["primary"];
  iconSidebarIconColor: Palette["primary"];
  iconSidebarIconHoverBackground: Palette["primary"];
  sidebarMainBackground: Palette["primary"];

  sidebarWorkspaceColor: Palette["primary"];
  sidebarWorkspaceBgColor: Palette["primary"];
  textPrimaryColor: Palette["primary"];
  textSecondaryColor: Palette["primary"];
  textTertiaryColor: Palette["primary"];
}

interface DashboardPaletteOptions {
  primaryWhite: PaletteOptions["primary"];
  primaryBlack: PaletteOptions["primary"];
  primaryBlue: PaletteOptions["primary"];
  primaryPurple: PaletteOptions["primary"];
  grayishBlue: PaletteOptions["primary"];
  LGrayishBlue: PaletteOptions["primary"];
  silverGrey: PaletteOptions["primary"];
  primaryBody: PaletteOptions["primary"];
  btnCancelGrey: PaletteOptions["primary"];
  navbarBody: PaletteOptions["primary"];
  primaryText: PaletteOptions["primary"];

  secondaryBody: PaletteOptions["primary"];
  globalHeaderBg: PaletteOptions["primary"];
  primaryBorder: PaletteOptions["primary"];
  secondaryBorder: PaletteOptions["primary"];
  cardInfoBody: PaletteOptions["primary"];
  mainWhite: PaletteOptions["primary"];
  mainGreen: PaletteOptions["primary"];
  mainYellow: PaletteOptions["primary"];
  mainRed: PaletteOptions["primary"];
  DarkBlack: PaletteOptions["primary"];
  CardBlack: PaletteOptions["primary"];
  LightBlack: PaletteOptions["primary"];
  BackGroundBlack: PaletteOptions["primary"];
  secondaryColor: PaletteOptions["primary"];
  teritiaryColor: PaletteOptions["primary"];
  fourthColor: PaletteOptions["primary"];
  fifthColor: PaletteOptions["primary"];
  linkColor: PaletteOptions["primary"];
  iconBackground: PaletteOptions["primary"];
  notifyColor: PaletteOptions["primary"];
  royalBlue: PaletteOptions["primary"];
  btnGrey: PaletteOptions["primary"];
  //
  V2GlobalHeaderBackground: PaletteOptions["primary"];
  V2GlobalHeaderColor: PaletteOptions["primary"];
  CardButton: PaletteOptions["primary"];
  V2SectionBackgroundColor: PaletteOptions["primary"];
  V2TextColor: PaletteOptions["primary"];
  V2SecondSidebarBackground: PaletteOptions["primary"];
  V2SectionMainBackground: PaletteOptions["primary"];
  V2OutlinedButtonColor: PaletteOptions["primary"];
  //
  v2PrimaryColor: PaletteOptions["primary"];
  v2SecondaryColor: PaletteOptions["primary"];
  v2SectionColour: PaletteOptions["primary"];
  v2WhiteColour: PaletteOptions["primary"];
  ImportCardColour: PaletteOptions["primary"];
  v2MainTextColor: PaletteOptions["primary"];
  v2MainButtonColor: PaletteOptions["primary"];

  v2TeritiaryColor: PaletteOptions["primary"];

  //sidebar
  v2SidebarBg1Color: PaletteOptions["primary"];
  v2SidebarIconColor: PaletteOptions["primary"];
  v2SidebarIconActiveColor: PaletteOptions["primary"];
  v2SidebarBg2Color: PaletteOptions["primary"];
  v2EndpointColor: PaletteOptions["primary"];
  v2EndpointActiveColor: PaletteOptions["primary"];
  v2IconTextColor: PaletteOptions["primary"];
  v2TeamWorkspaceBgColor: PaletteOptions["primary"];
  v2MsgBtnBg: PaletteOptions["primary"];
  v2BtnBorderColor: PaletteOptions["primary"];

  // new colors
  iconSidebarBackground: PaletteOptions["primary"];
  iconSidebarIconColor: PaletteOptions["primary"];
  iconSidebarIconHoverBackground: PaletteOptions["primary"];
  sidebarMainBackground: PaletteOptions["primary"];

  sidebarWorkspaceColor: PaletteOptions["primary"];
  sidebarWorkspaceBgColor: PaletteOptions["primary"];
  textPrimaryColor: PaletteOptions["primary"];
  textSecondaryColor: PaletteOptions["primary"];
  textTertiaryColor: PaletteOptions["primary"];
}

const lightTheme = createTheme({
  palette: {
    // signInUp
    signInUpBackground: {
      main: "#f0f9ff", // Add your custom color here
    },
    signInUpBlack: {
      main: "#000", // Add your custom color here
    },
    signInUpWhite: {
      main: "#fff", // Add your custom color here
    },
    signInUpPrimary: {
      main: "#262626", // Add your custom color here
    },
    signInUpDimGray: {
      main: "#525252", // Add your custom color here
    },
    signInUpLightGray: {
      main: "#A3A3A3", // Add your custom color here
    },
    signInUpPurple: {
      main: "#6B21A8", // Add your custom color here
    },

    // dashboard
    primaryBlack: {
      main: "#000", // Add your custom color here
    },
    primaryWhite: {
      main: "#fff", // Add your custom color here
    },
    primaryBlue: {
      main: "#2563EB",
    },
    primaryPurple: {
      main: "#6B21A8",
    },
    grayishBlue: {
      main: "#111827",
    },
    LGrayishBlue: {
      main: "#F7F9FC",
    },
    silverGrey: {
      main: "#D4D4D4",
    },
    btnCancelGrey: {
      main: "#E5E5E5",
    },
    primaryBody: {
      main: "#F5F5F5",
    },
    navbarBody: {
      main: "#171717", // Add your custom color here
    },
    primaryText: {
      main: "#262626",
    },
    secondaryBody: {
      main: "#2C2C2C", // Add your custom color here
    },
    globalHeaderBg: {
      main: "#1e1e1e", // Add your custom color here
    },
    primaryBorder: {
      main: "#2c2c2c",
    },
    secondaryBorder: {
      main: "#383838",
    },
    cardInfoBody: {
      main: "#080808", // Add your custom color here
    },
    mainWhite: {
      main: "#fff",
    },
    mainGreen: {
      main: "#22DD99",
    },
    mainYellow: {
      main: "#F6D68D",
    },
    mainRed: {
      main: "#FE4773",
    },
    DarkBlack: {
      main: "#0E0F12",
    },

    LightBlack: {
      main: "#535864",
    },

    BackGroundBlack: {
      main: "#292C33",
    },
    secondaryColor: {
      main: "#979797",
    },
    teritiaryColor: {
      main: "#a8a8a8",
    },
    fourthColor: {
      main: "#878787",
    },
    fifthColor: {
      main: "#2D2D2D",
    },

    linkColor: {
      main: "#1376dd",
    },
    iconBackground: {
      main: "#353535",
    },
    notifyColor: {
      main: "#eb5b62",
    },
    royalBlue: {
      main: "#000B1D",
    },
    btnGrey: {
      main: "#E8E8E8",
    },

    //v2
    V2GlobalHeaderBackground: {
      main: "#282F79",
    },
    CardBlack: {
      main: "#FDFBFB",
    },

    CardButton: {
      main: "#282F79",
    },

    V2GlobalHeaderColor: {
      main: "#FFFFFF",
    },
    V2SectionBackgroundColor: {
      main: "#F6F9FF",
    },
    V2TextColor: {
      main: "#000000",
    },
    V2SecondSidebarBackground: {
      main: "#F6F9FF",
    },
    V2SectionMainBackground: {
      main: "#FFFFFF",
    },
    V2OutlinedButtonColor: {
      main: "#282F79",
    },
    //

    v2PrimaryColor: {
      // main: "#343a40", // Black color
      main: "#282F79", //blue color
    },
    v2SecondaryColor: {
      // main: "#A4A8C9", //grey color
      main: "#9A93B9", //purple color
    },
    v2SectionColour: {
      // main: "#343a40", // Black color
      main: "#F6F9FF", //blue color
    },

    v2WhiteColour: {
      // main: "#343a40", // Black color
      main: "#FFFFFF", //blue color
    },

    ImportCardColour: {
      // main: "#343a40", // Black color
      main: "#FFFFFF", //blue color
    },
    v2TeritiaryColor: {
      main: "#9A93B9",
    },

    v2MainTextColor: {
      main: "#000000",
    },

    //sidebar
    v2SidebarBg1Color: {
      main: "#F6F9FF", //icons bar
    },

    v2SidebarIconColor: {
      main: "#9A93B9",
    },

    v2SidebarIconActiveColor: {
      main: "#282F79",
    },

    v2SidebarBg2Color: {
      main: "#FFFFFF",
    },

    v2EndpointColor: {
      main: "#424650",
    },
    v2EndpointActiveColor: {
      main: "#282F79",
    },

    v2MainButtonColor: {
      main: "#2BBCD4",
    },

    v2IconTextColor: {
      main: "#000000",
    },

    v2TeamWorkspaceBgColor: {
      main: "#F6F9FF",
    },

    v2MsgBtnBg: {
      main: "#282F79",
    },

    v2BtnBorderColor: {
      main: "#000080",
    },

    // new colors
    iconSidebarBackground: {
      main: "#121212",
    },
    iconSidebarIconColor: {
      main: "#FFFFFF80",
    },
    iconSidebarIconHoverBackground: {
      main: "#7A43FE",
    },
    sidebarMainBackground: {
      main: "#211C27",
    },

    sidebarWorkspaceColor: {
      main: "#FFFFFF",
    },
    sidebarWorkspaceBgColor: {
      main: "#FFFFFF1A",
    },
    textPrimaryColor: {
      main: "#FFFFFF",
    },
    textSecondaryColor: {
      main: "#CCCCCC",
    },
    textTertiaryColor: {
      main: "#ACAAB3",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    // signInUp
    signInUpBackground: {
      main: "#f0f9ff", // Add your custom color here
    },
    signInUpBlack: {
      main: "#000", // Add your custom color here
    },
    signInUpWhite: {
      main: "#fff", // Add your custom color here
    },
    signInUpPrimary: {
      main: "#262626", // Add your custom color here
    },
    signInUpDimGray: {
      main: "#525252", // Add your custom color here
    },
    signInUpLightGray: {
      main: "#A3A3A3", // Add your custom color here
    },
    signInUpPurple: {
      main: "#6B21A8", // Add your custom color here
    },

    // dashboard
    primaryBlack: {
      main: "#000", // Add your custom color here
    },
    primaryWhite: {
      main: "#fff", // Add your custom color here
    },
    primaryBlue: {
      main: "#2563EB",
    },
    primaryPurple: {
      main: "#6B21A8",
    },
    grayishBlue: {
      main: "#111827",
    },
    LGrayishBlue: {
      main: "#F7F9FC",
    },
    silverGrey: {
      main: "#D4D4D4",
    },
    btnCancelGrey: {
      main: "#E5E5E5",
    },
    primaryBody: {
      main: "#F5F5F5",
    },
    navbarBody: {
      main: "#171717", // Add your custom color here
    },
    primaryText: {
      main: "#262626",
    },
    secondaryBody: {
      main: "#2C2C2C", // Add your custom color here
    },
    globalHeaderBg: {
      main: "#1e1e1e", // Add your custom color here
    },
    primaryBorder: {
      main: "#2c2c2c",
    },
    secondaryBorder: {
      main: "#383838",
    },
    cardInfoBody: {
      main: "#080808", // Add your custom color here
    },
    mainWhite: {
      main: "#fff",
    },
    mainGreen: {
      main: "#22DD99",
    },
    mainYellow: {
      main: "#F6D68D",
    },
    mainRed: {
      main: "#FE4773",
    },

    DarkBlack: {
      main: "#0E0F12",
    },

    LightBlack: {
      main: "#535864",
    },

    BackGroundBlack: {
      main: "#292C33",
    },

    secondaryColor: {
      main: "#979797", // Add your custom color here
    },
    teritiaryColor: {
      main: "#a8a8a8",
    },
    fourthColor: {
      main: "#878787",
    },
    fifthColor: {
      main: "#2D2D2D",
    },

    linkColor: {
      main: "#1376dd",
    },
    iconBackground: {
      main: "#353535",
    },
    notifyColor: {
      main: "#eb5b62",
    },
    royalBlue: {
      main: "#000B1D",
    },
    btnGrey: {
      main: "#E8E8E8",
    },

    //v2

    //
    V2GlobalHeaderBackground: {
      main: "#0E0F12",
    },
    CardBlack: {
      main: "#0E0F12",
    },

    CardButton: {
      main: "#2BBCD4",
    },
    V2GlobalHeaderColor: {
      main: "#FFFFFF",
    },
    V2TextColor: {
      main: "#EEEEEE",
    },
    V2SectionBackgroundColor: {
      main: "#292C33",
    },

    V2SecondSidebarBackground: {
      main: "#4D4A57",
    },
    V2SectionMainBackground: {
      main: "#292C33",
    },
    V2OutlinedButtonColor: {
      main: "#FFFFFF",
    },
    //
    v2PrimaryColor: {
      // main: "#343a40", // Black color
      main: "#FFFFFF", //white color
    },
    v2SecondaryColor: {
      // main: "#A4A8C9", //grey color
      main: "#EEEEEE",
    },
    v2SectionColour: {
      // main: "#343a40", // Black color
      main: "#F6F9FF", //blue color
    },

    v2WhiteColour: {
      // main: "#343a40", // Black color
      main: "#FFFFFF", //blue color
    },

    ImportCardColour: {
      // main: "#343a40", // Black color
      main: "#0E0F12", //blue color
    },

    v2TeritiaryColor: {
      main: "#9A93B9",
    },

    v2MainTextColor: {
      main: "#000000",
    },

    //sidebar
    v2SidebarBg1Color: {
      main: "#4D4A57", //icons bar
    },

    v2SidebarIconColor: {
      main: "#9A93B9",
    },

    v2SidebarIconActiveColor: {
      main: "#2BBCD4",
    },

    v2SidebarBg2Color: {
      main: "#31333B",
    },

    v2EndpointColor: {
      main: "#EEEEEE",
    },

    v2EndpointActiveColor: {
      main: "#2BBCD4",
    },

    v2MainButtonColor: {
      main: "#2BBCD4",
    },

    v2IconTextColor: {
      main: "#FFFFFF",
    },

    v2TeamWorkspaceBgColor: {
      main: "#EEEEEE",
    },

    v2MsgBtnBg: {
      main: "#282F79",
    },

    v2BtnBorderColor: {
      main: "#FFFFFF",
    },
    // new color
    iconSidebarBackground: {
      main: "#121212",
    },

    iconSidebarIconColor: {
      main: "#FFFFFF80",
    },
    iconSidebarIconHoverBackground: {
      main: "#7A43FE",
    },
    sidebarMainBackground: {
      main: "#211C27",
    },
    sidebarWorkspaceColor: {
      main: "#FFFFFF",
    },
    sidebarWorkspaceBgColor: {
      main: "#FFFFFF1A",
    },
    textPrimaryColor: {
      main: "#FFFFFF",
    },
    textSecondaryColor: {
      main: "#CCCCCC",
    },
    textTertiaryColor: {
      main: "#ACAAB3",
    },
  },
});

const theme = lightTheme;
// const theme = darkTheme;
export { lightTheme, darkTheme };

export default theme;
