// base paths
const INDEX_PATH = "/";
export const SIGNINUP_PATH = "/sign";
const PRICING_PATH = "/pricing";
const ACTIVATION_PATH = "/activation";

// forget password paths
const FORGET_PASSWORD_PATH = "/forget-password";
const FORGET_PASSWORD_OTP_VERIFICATION_PATH = "/forget-password-otp";
const TWO_FACTOR_ENABLE_OTP_VERIFICATION_PATH = "/two-factor-otp";

// signin and signup paths
const SIGNUP_PATH = "/signup";
export const SIGNINUP_OTP_VERIFICATION_PATH = "/signup/otp-verification";
const SIGNINUP_VERIFY_PATH = "/signup/verify";
export const SIGNINUP_COMPANY_PATH = "/signup/company";

// gateway import
const GATEWAY_FIRST_IMPORT_PATH = "/gateway-import";

// dahsboard paths
const API_RISK_PATH = "/api-risk";
const API_INTELLIGENCE_PATH = "/api-intelligence";
const API_TESTING_PATH = "/api-testing";
const MANAGE_TEAM_PATH = "/manage-team";
const SETTINGS_PATH = "/settings";

// Subpath constants for the "API Management" section
const API_MANAGEMENT_DASHBOARD_PATH = "/";
const API_MANAGER_PATH = `/api-manager`;
const DESIGN_API_PATH = `/design-api`;
const API_MANAGEMENT_REPORTS_PATH = `/api-manage-reports`;
const CHANGE_HISTORY_PATH = `/change-history`;
const API_MANAGEMENT_MANAGE_TEAMS_PATH = `/api-manage-teams`;

// Subpath constants for the "API Risk" section
const API_RISK_DASHBOARD_PATH = `${API_RISK_PATH}`;
const RISKY_APIS_PATH = `/risks`;
const POLICIES_RULES_PATH = `/showpolicy`;
const VULNERABILITIES_PATH = `/vulnerabilities`;
const SENSITIVE_DATA_PATH = `/sensitive-data`;
const API_RISK = "/risk-operation";

// Subpath constants for the "API Intelligence" section
const API_INTELLIGENCE_DASHBOARD_PATH = `${API_INTELLIGENCE_PATH}`;
const API_ENDPOINTS_PATH = `/api-endpoints`;
const API_ANALYTICS_PATH = `/api-analytics`;

// Subpath constants for the "API Testing" section
const API_TESTING_DASHBOARD_PATH = `${API_TESTING_PATH}`;
const SECURITY_SCANS_PATH = `/security-scan`;
const API_TESTING_REPORTS_PATH = `/api-testing-reports`;

const TEST_RUNNERS_PATH = `/test-runners`;
const AUTHENTICATIONS_PATH = `/authentication`;
const TEST_MANAGE_TEAMS_PATH = `/test-manage-teams`;

// Subpath constants for the "Manage Team" section
const MANAGE_TEAM_DASHBOARD_PATH = `${MANAGE_TEAM_PATH}`;
// You can define subpath constants for Manage Team as needed.

// Subpath constants for the "Settings" section
// export const SETTINGS_DASHBOARD_PATH = `${SETTINGS_PATH}`;
const SETTINGS_PROFILE_PATH = `${SETTINGS_PATH}`;
const SETTINGS_ACCOUNTS_PATH = `/accounts`;
const SETTINGS_NOTIFICATION_PATH = `/notifications`;
const SETTINGS_APIKEYS_PATH = `/apiKeys`;
// You can define subpath constants for Settings as needed.
