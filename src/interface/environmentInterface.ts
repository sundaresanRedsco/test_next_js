// Type for Version Information
interface Version {
  id: string;
  projectId: string;
  version: string;
  status: string;
}

// Type for Project
export interface environmentDataInterface {
  project_id: string;
  name?: string;
  tenant_id: string;
  project_name: string;
  summary: string;
  status: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  activeVersion?: Version | null; // Optional as the key can be null
  active_Version?: null; // This seems to be always null based on the example
  versions: Version[];
  project_publish_details?: any | null; // This can be adjusted based on what project_publish_details would hold
}

// Type for the Root Object containing the list of Projects
interface ProjectsData {
  projects: environmentDataInterface[];
}
