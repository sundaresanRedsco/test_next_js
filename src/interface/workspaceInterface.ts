export interface workspaceInterface {
  document: string;
  id: string;
  tenant_id: string;
  name: string;
  summary: string;
  permission: string;
  status: string;
  created_by: string;
  created_at: string; // You might use Date type if you prefer working with Date objects
  updated_at: string; // You might use Date type if you prefer working with Date objects
  profile_picture: any
}
