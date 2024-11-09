interface Operation {
  id: string;
  document: string;
  operation_id: string;
  operation_name: string;
  collection_id: string;
  enpoint_status: string;
  method: string;
  method_name: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  status: string;
}

interface Collection {
  id: string;
  document: string;
  project_id: string;
  collection_id: string;
  collection_name: string;
  active_version: string | null;
  service_type: string;
  stage_id: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string | null;
  status: string;
  operations: Operation[];
}

export interface GetCollecOperTreeInterface {
  count: number;
  collections: Collection[];
}
