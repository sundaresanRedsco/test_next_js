export interface userInterface {
  user_id: string;
  first_name: string;
  last_name: string;
  token: string;
  email: string;
  tenant_id: string;
  profile_picture: string;
  cover_picture: string;
  workspace_id: string;
  user_registered: string; // Assuming there are only two possible values
  expiration_time: number;
  user_from: string | null; // Assuming "NULL" can be represented as null
  refresh_token: string;
  is_2fa_enable: boolean;
  team_workspace_id: string;
  first_login: boolean;
  role_id: string;
}
