import { createTheme, Palette, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette extends signInUpPalette {}
  interface PaletteOptions extends signInUpPaletteOptions {}
  interface Palette extends DashboardPalette {}
  interface PaletteOptions extends DashboardPaletteOptions {}
}

interface signInUpPalette {
  signInUpBackground: Palette["primary"];
  signInUpSecondaryBackground: Palette["primary"];
  signInUpPrimary: Palette["primary"];
  signInUpStepperContainerBg: Palette["primary"];
  backdrop: Palette["primary"];
  sigInUpStepperConnector: Palette["primary"];
  sigInUpStepperTextDefault: Palette["primary"];
  sigInUpStepperIconComplete: Palette["primary"];
  sigInUpStepperIconActive: Palette["primary"];
  sigInUpStepperIconDefault: Palette["primary"];
  sigInUpStepperTextActive: Palette["primary"];
  sigInUpStepperTextPrimary: Palette["primary"];
  sigInUpStepperTextSecondary: Palette["primary"];
  sigInUpButtonPrimary: Palette["primary"];
  sigInUpButtonBorder: Palette["primary"];
  skeletonDefault: Palette["primary"];
  skeletonPrimary: Palette["primary"];
  helperText: Palette["primary"];
  inputBg: Palette["primary"];
  inputBg1: Palette["primary"];
  inputBg2: Palette["primary"];
  inputBg3: Palette["primary"];
  inputBg4: Palette["primary"];
  sigInUpButtonSecondary: Palette["primary"];
  red: Palette["primary"];
  gray: Palette["primary"];
  radioBg: Palette["primary"];
  radioBg1: Palette["primary"];
  radioBg2: Palette["primary"];
  radioBg3: Palette["primary"];
  radioBg4: Palette["primary"];
  radioBg5: Palette["primary"];
  radioBg6: Palette["primary"];
  radioBg7: Palette["primary"];
  radioBg8: Palette["primary"];
  sigInUpButtonBorderSecondary: Palette["primary"];
  sigInUpStepperTextTertary: Palette["primary"];
  link: Palette["primary"];
  signInUpBlack: Palette["primary"];
  signInUpWhiteSecondary: Palette["primary"];
  signInUpBlackSecondary: Palette["primary"];
  signInUpLGrayishBlue: Palette["primary"];
  SignInUpBorder: Palette["primary"];
  signInUpLoader: Palette["primary"];
}

interface signInUpPaletteOptions {
  signInUpBackground: PaletteOptions["primary"];
  signInUpSecondaryBackground: PaletteOptions["primary"];
  signInUpPrimary: PaletteOptions["primary"];
  signInUpStepperContainerBg: PaletteOptions["primary"];
  backdrop: PaletteOptions["primary"];
  sigInUpStepperConnector: PaletteOptions["primary"];
  sigInUpStepperTextDefault: PaletteOptions["primary"];
  sigInUpStepperIconComplete: PaletteOptions["primary"];
  sigInUpStepperIconActive: PaletteOptions["primary"];
  sigInUpStepperIconDefault: PaletteOptions["primary"];
  sigInUpStepperTextActive: PaletteOptions["primary"];
  sigInUpStepperTextPrimary: PaletteOptions["primary"];
  sigInUpStepperTextSecondary: PaletteOptions["primary"];
  sigInUpButtonBorder: PaletteOptions["primary"];
  sigInUpButtonPrimary: PaletteOptions["primary"];
  skeletonPrimary: PaletteOptions["primary"];
  skeletonDefault: PaletteOptions["primary"];
  helperText: PaletteOptions["primary"];
  inputBg: PaletteOptions["primary"];
  inputBg1: PaletteOptions["primary"];
  inputBg2: PaletteOptions["primary"];
  inputBg3: PaletteOptions["primary"];
  inputBg4: PaletteOptions["primary"];
  red: PaletteOptions["primary"];
  sigInUpButtonSecondary: PaletteOptions["primary"];
  gray: PaletteOptions["primary"];
  radioBg: PaletteOptions["primary"];
  radioBg1: PaletteOptions["primary"];
  radioBg2: PaletteOptions["primary"];
  radioBg3: PaletteOptions["primary"];
  radioBg4: PaletteOptions["primary"];
  radioBg5: PaletteOptions["primary"];
  radioBg6: PaletteOptions["primary"];
  radioBg7: PaletteOptions["primary"];
  radioBg8: PaletteOptions["primary"];
  sigInUpButtonBorderSecondary: PaletteOptions["primary"];
  sigInUpStepperTextTertary: PaletteOptions["primary"];
  link: PaletteOptions["primary"];
  signInUpBlack: PaletteOptions["primary"];
  signInUpBlackSecondary: PaletteOptions["primary"];
  signInUpWhiteSecondary: PaletteOptions["primary"];
  signInUpLGrayishBlue: PaletteOptions["primary"];
  SignInUpBorder: PaletteOptions["primary"];
  signInUpLoader: PaletteOptions["primary"];
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
  navigationTabColor: Palette["primary"];
  summaryBgColor: Palette["primary"];
  summaryCardColor: Palette["primary"];
  threatTableHeaderBg: Palette["primary"];
  threatTableBodyBorderColor: Palette["primary"];
  threatTableBodyBtnColor: Palette["primary"];
  apiInsightsBackgroundColor: Palette["primary"];
  apiBackgroundUrlCardColor: Palette["primary"];
  apiBackgroundTextCardColor: Palette["primary"];
  modalBoxShadow: Palette["primary"];
  secondaryChatBg: Palette["primary"];
  textOutlinedBorderColor: Palette["primary"];
  operationPageBorderColor: Palette["primary"];
  edgeColor: Palette["primary"];
  backdropBg: Palette["primary"];
  lightTooltipColor: Palette["primary"];
  globalBtnBg: Palette["primary"];
  createWorkflowBtnBg: Palette["primary"];
  swaggerFileBtnBg: Palette["primary"];
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
  navigationTabColor: PaletteOptions["primary"];
  summaryBgColor: PaletteOptions["primary"];
  summaryCardColor: PaletteOptions["primary"];
  threatTableHeaderBg: PaletteOptions["primary"];
  threatTableBodyBorderColor: PaletteOptions["primary"];
  threatTableBodyBtnColor: PaletteOptions["primary"];
  apiInsightsBackgroundColor: PaletteOptions["primary"];
  apiBackgroundUrlCardColor: PaletteOptions["primary"];
  apiBackgroundTextCardColor: PaletteOptions["primary"];
  modalBoxShadow: PaletteOptions["primary"];
  secondaryChatBg: PaletteOptions["primary"];
  textOutlinedBorderColor: PaletteOptions["primary"];
  operationPageBorderColor: PaletteOptions["primary"];
  edgeColor: PaletteOptions["primary"];
  backdropBg: PaletteOptions["primary"];
  lightTooltipColor: PaletteOptions["primary"];
  globalBtnBg: PaletteOptions["primary"];
  createWorkflowBtnBg: PaletteOptions["primary"];
  swaggerFileBtnBg: PaletteOptions["primary"];
}

const lightTheme = createTheme({
  palette: {
    // signInUp
    signInUpBlack: {
      main: "#000",
    },
    signInUpWhiteSecondary: {
      main: "#f0f0f0",
    },
    signInUpBlackSecondary: {
      main: "#d0dee71f",
    },
    signInUpBackground: {
      main: "#12121280",
    },
    signInUpSecondaryBackground: {
      main: "#19181f",
    },
    signInUpStepperContainerBg: {
      main: "#121212BF",
    },
    signInUpPrimary: {
      main: "#fff",
    },
    SignInUpBorder: {
      main: "#FFFFFF80",
    },
    sigInUpStepperConnector: {
      main: "#4F4F4F80",
    },
    sigInUpStepperTextDefault: {
      main: "#9A9A9A",
    },
    sigInUpStepperTextActive: {
      main: "#F3F3F3",
    },
    sigInUpStepperTextPrimary: {
      main: "#F3F3F380",
    },
    sigInUpStepperTextSecondary: {
      main: "#F3F3F3BF",
    },
    sigInUpStepperTextTertary: {
      main: "#FFFFFFBF",
    },
    sigInUpStepperIconComplete: {
      main: "#287444",
    },
    sigInUpStepperIconActive: {
      main: "#7A43FE",
    },
    sigInUpStepperIconDefault: {
      main: "#343434",
    },
    sigInUpButtonPrimary: {
      main: "#37265C",
    },
    sigInUpButtonSecondary: {
      main: "#F3F3F31A",
    },
    sigInUpButtonBorder: {
      main: "#F3F3F340",
    },
    sigInUpButtonBorderSecondary: {
      main: "#FFFFFF40",
    },
    signInUpLoader: {
      main: "#1976d2",
    },
    backdrop: {
      main: "#0c070f78",
    },
    skeletonDefault: {
      main: "#473d51",
    },
    skeletonPrimary: {
      main: "#2f2935",
    },
    helperText: {
      main: "#d32f2f",
    },
    inputBg: {
      main: "#7946FD40",
    },
    inputBg1: {
      main: "#291e3b",
    },
    inputBg2: {
      main: "#18151c",
    },
    inputBg3: {
      main: "#c9c9c961",
    },
    inputBg4: {
      main: "#31244F80",
    },
    gray: {
      main: "#808080",
    },
    red: {
      main: "#ff0000",
    },
    radioBg: {
      main: "#D9D9D9",
    },
    radioBg1: {
      main: "#D9D9D980",
    },
    radioBg2: {
      main: "#ced9e0",
    },
    radioBg3: {
      main: "#30404d",
    },
    radioBg4: {
      main: "#394b59",
    },
    radioBg5: {
      main: "#394b59",
    },
    radioBg6: {
      main: "#10161a66",
    },
    radioBg7: {
      main: "#ffffff0d",
    },
    radioBg8: {
      main: "#ffffff00",
    },
    link: {
      main: "#327fb9",
    },
    signInUpLGrayishBlue: {
      main: "#211c27",
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
      main: "#7A43FE",
    },
    grayishBlue: {
      main: "#111827",
    },
    LGrayishBlue: {
      main: "#211c27",
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
    navigationTabColor: {
      main: "#7946FD",
    },
    summaryBgColor: {
      main: "#241D35",
    },
    summaryCardColor: {
      main: "#362F47",
    },
    threatTableHeaderBg: {
      main: "#1c1818a3",
    },
    threatTableBodyBorderColor: {
      main: "#FFFFFF26",
    },
    threatTableBodyBtnColor: {
      main: "#FFFFFF26",
    },
    apiInsightsBackgroundColor: {
      main: "#12121280",
    },
    apiBackgroundUrlCardColor: {
      main: "#362F47",
    },
    apiBackgroundTextCardColor: {
      main: "#ffffff",
    },
    modalBoxShadow: {
      main: "#333232",
    },
    secondaryChatBg: {
      main: "#1b1b1b",
    },
    textOutlinedBorderColor: {
      main: "#f3f3f340",
    },
    operationPageBorderColor: {
      main: "#ffffff40",
    },
    edgeColor: {
      main: "#55CCFF",
    },
    backdropBg: {
      main: "#00000066",
    },
    lightTooltipColor: {
      main: "#000000de",
    },
    globalBtnBg: {
      main: "#282F79",
    },
    createWorkflowBtnBg: {
      main: "#7A43FE26",
    },
    swaggerFileBtnBg: {
      main: "#EEEEEE",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    // signInUp
    signInUpBlack: {
      main: "#000",
    },
    signInUpWhiteSecondary: {
      main: "#f0f0f0",
    },
    signInUpBlackSecondary: {
      main: "#d0dee71f",
    },
    signInUpBackground: {
      main: "#12121280",
    },
    signInUpSecondaryBackground: {
      main: "#19181f",
    },
    signInUpStepperContainerBg: {
      main: "#121212BF",
    },
    signInUpPrimary: {
      main: "#fff",
    },
    sigInUpStepperConnector: {
      main: "#4F4F4F80",
    },
    sigInUpStepperTextDefault: {
      main: "#9A9A9A",
    },
    sigInUpStepperTextActive: {
      main: "#F3F3F3",
    },
    sigInUpStepperTextPrimary: {
      main: "#F3F3F380",
    },
    sigInUpStepperTextSecondary: {
      main: "#F3F3F3BF",
    },
    sigInUpStepperTextTertary: {
      main: "#FFFFFFBF",
    },
    sigInUpStepperIconComplete: {
      main: "#287444",
    },
    sigInUpStepperIconActive: {
      main: "#7A43FE",
    },
    sigInUpStepperIconDefault: {
      main: "#343434",
    },
    sigInUpButtonPrimary: {
      main: "#37265C",
    },
    sigInUpButtonSecondary: {
      main: "#F3F3F31A",
    },
    sigInUpButtonBorder: {
      main: "#F3F3F340",
    },
    SignInUpBorder: {
      main: "#FFFFFF80",
    },
    sigInUpButtonBorderSecondary: {
      main: "#FFFFFF40",
    },
    signInUpLoader: {
      main: "#1976d2",
    },
    backdrop: {
      main: "#0c070f78",
    },
    skeletonDefault: {
      main: "#473d51",
    },
    skeletonPrimary: {
      main: "#2f2935",
    },
    helperText: {
      main: "#d32f2f",
    },
    inputBg: {
      main: "#7946FD40",
    },
    inputBg1: {
      main: "#291e3b",
    },
    inputBg2: {
      main: "#18151c",
    },
    inputBg3: {
      main: "#c9c9c961",
    },
    inputBg4: {
      main: "#31244F80",
    },
    gray: {
      main: "#808080",
    },
    red: {
      main: "#ff0000",
    },
    radioBg: {
      main: "#D9D9D9",
    },
    radioBg1: {
      main: "#D9D9D980",
    },
    radioBg2: {
      main: "#ced9e0",
    },
    radioBg3: {
      main: "#30404d",
    },
    radioBg4: {
      main: "#394b59",
    },
    radioBg5: {
      main: "#394b59",
    },
    radioBg6: {
      main: "#10161a66",
    },
    radioBg7: {
      main: "#ffffff0d",
    },
    radioBg8: {
      main: "#ffffff00",
    },
    link: {
      main: "#327fb9",
    },
    signInUpLGrayishBlue: {
      main: "#211c27",
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
    navigationTabColor: {
      main: "#7946FD",
    },
    summaryBgColor: {
      main: "#241D35",
    },
    summaryCardColor: {
      main: "#362F47",
    },
    threatTableHeaderBg: {
      main: "#1c1818a3",
    },
    threatTableBodyBorderColor: {
      main: "#FFFFFF26",
    },
    threatTableBodyBtnColor: {
      main: "#FD0101",
    },
    apiInsightsBackgroundColor: {
      main: "#12121280",
    },
    apiBackgroundUrlCardColor: {
      main: "#362F47",
    },
    apiBackgroundTextCardColor: {
      main: "#ffffff",
    },
    modalBoxShadow: {
      main: "#333232",
    },
    secondaryChatBg: {
      main: "#333232",
    },
    textOutlinedBorderColor: {
      main: "#f3f3f340",
    },
    operationPageBorderColor: {
      main: "#ffffff40",
    },
    edgeColor: {
      main: "#55CCFF",
    },
    backdropBg: {
      main: "#00000066",
    },
    lightTooltipColor: {
      main: "#000000de",
    },
    globalBtnBg: {
      main: "#282F79",
    },
    createWorkflowBtnBg: {
      main: "#7A43FE26",
    },
    swaggerFileBtnBg: {
      main: "#EEEEEE",
    },
  },
});

const theme = lightTheme;
// const theme = darkTheme;
export { lightTheme, darkTheme };

export default theme;
