export interface TeamListInterface {
  id: string;
  cover_picture: string;
  created_at?: string;
  created_by?: string;
  profile_picture: string;
  team_discovery: boolean;
  team_name: string;
  tenant_id: string;
  updated_at?: string;
  updated_by?: string;
  workspace_id: string;
}

interface CurrentTeamInterface {
  id: string;
  team_name: string;
  workspace_id: string;
}

export interface TeamRoleInterface {
  id: string;
  description: string;
  role_name: string;
  role_type: string;
}

export interface GetTeamPermissionsInterface {
  role_id: number;
  permission_description: string;
  permission_name: string;
  role_name: string;
  role_permission_id: number;
  role_type: string;
  role_description: string;
}

export interface TeamMembersInterface {
  description: string;
  members_id: string;
  role: number;
  team_id: string;
  user_id: number;
  email: string;
  first_name: string;
}

interface TeamInviteMembersInterface {
  created_at?: string;
  email_id: string;
  expiry_at?: string;
  id: string;
  role_id: number;
  status: string;
  team_id: string;
  tenant_id: string;
  updatedAt?: string;
  access_type: string | null;
  activation_token: string | null;
  created_by?: string | null;
  email_text_content: string | null;
  frontEndUrl: string | null;
  frontend_url: string | null;
  roles: string | null;
  subject: string | null;
  updated_by?: string | null;
  role: number | null;
  user_status: string | null;
}
