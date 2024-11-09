export interface apiMangeDahboardCountInterface {
  total_no_of_projects: number;
  total_no_of_operations: number;
}

export interface projectInterface {
  project_id: string | undefined;
  tenant_id: string;
  name: string;
  project_name: string;
  summary: string;
  status: string;
  created_at: string; // Date should be represented as a string
  created_by: string;
  updated_at: string; // Date should be represented as a string
  updated_by: string;
  activeVersion: {
    id: string;
    projectId: string;
    version: string;
    status: string;
  };
  active_Version: {
    id: string;
    project_id: string;
    version: string;
    name: string;
    summary: string;
    permission: string;
    status: string;
    created_by: string;
    created_at: string; // Date should be represented as a string
    updated_at: string; // Date should be represented as a string
    updated_by: string;
  };
  versions: Array<{
    id: string;
    projectId: string;
    version: string;
    status: string;
  }>;
  project_publish_details: {
    project_id: string;
    project_unique_number: number; // Changed type to number
    project_name: string;
    publish_url: string;
    project_version: string;
    project_version_id: string;
    publish_id: string;
    publish_version: number; // Changed type to number
    publish_notes: string;
    published_by: string;
    published_on: string; // Date should be represented as a string
    primary_key: string;
    primary_secret: string;
    secondary_key: string;
    secondary_secret: string;
  };
}

export interface projectsOffsetInterface {
  project_id: string;
  tenant_id: string;
  workspace_id: string;
  email: string;
  project_name: string;
  status: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  summary: string;
  permission: string;
  activeVersionId: string;
  lastPublishedOn: string;
  lastPublishedBy: string;
  project_published_log_id: string;
  user: {
    id: string;
    tenant_id: string;
    first_name: string;
    last_name: string;
    user_name: string;
    password: string;
    confirm_password: string;
    email: string;
    status: string;
    created_at: string;
    updated_at: string;
    type: string;
    access_token: string;
    last_login_at: string;
    last_logout_at: string;
    reset_password_token: string;
    last_reset_password_at: string;
    last_update_password_at: string;
    member_invite_id: string;
    profile_picture: string;
    cover_picture: string;
    otp: string;
    user_verify: string;
    refresh_token: string;
    secret_key: string;
    is_2fa_enable: boolean;
  };
  active_version: {
    id: string;
    project_id: string;
    version: string;
    name: string;
    summary: string;
    permission: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
  };
  project_versions: Array<{
    id: string;
    project_id: string;
    version: string;
    name: string;
    summary: string;
    permission: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
  }>;
  publishDetails: {
    project_id: string;
    project_unique_number: number;
    project_name: string;
    publish_url: string;
    project_version: string;
    project_version_id: string;
    publish_id: string;
    publish_version: number;
    publish_notes: string;
    published_by: string;
    published_on: string;
    primary_key: string;
    primary_secret: string;
    secondary_key: string;
    secondary_secret: string;
  };
  publishing_details: {
    project_id: string;
    project_unique_number: number;
    project_name: string;
    publish_url: string;
    project_version: string;
    project_version_id: string;
    publish_id: string;
    publish_version: number;
    publish_notes: string;
    published_by: string;
    published_on: string;
    primary_key: string;
    primary_secret: string;
    secondary_key: string;
    secondary_secret: string;
  };
  project_publish_list: Array<{
    project_id: string;
    project_unique_number: number;
    project_name: string;
    publish_url: string;
    project_version: string;
    project_version_id: string;
    publish_id: string;
    publish_version: number;
    publish_notes: string;
    published_by: string;
    published_on: string;
    primary_key: string;
    primary_secret: string;
    secondary_key: string;
    secondary_secret: string;
  }>;
  publish_detail: Array<{
    project_id: string;
    project_unique_number: number;
    project_name: string;
    publish_url: string;
    project_version: string;
    project_version_id: string;
    publish_id: string;
    publish_version: number;
    publish_notes: string;
    published_by: string;
    published_on: string;
    primary_key: string;
    primary_secret: string;
    secondary_key: string;
    secondary_secret: string;
  }>;
  projectSettings: {
    unique_number: number;
    project_id: string;
    primary_key: string;
    primary_secret: string;
    secondary_key: string;
    secondary_secret: string;
  };
  pin_project: boolean;
}

export interface singleProjectInterface {
  project_id: string;
  tenant_id: string;
  project_name: string;
  summary: string;
  status: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  activeVersion: {
    id: string;
    projectId: string;
    version: string;
    status: string;
  };
  active_Version: {
    id: string;
    project_id: string;
    version: string;
    name: string;
    summary: string;
    permission: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
  };
  versions: Array<{
    id: string;
    projectId: string;
    version: string;
    status: string;
  }>;
  project_publish_details: {
    project_id: string;
    project_unique_number: number;
    project_name: string;
    publish_url: string;
    project_version: string;
    project_version_id: string;
    publish_id: string;
    publish_version: number;
    publish_notes: string;
    published_by: string;
    published_on: string;
    primary_key: string;
    primary_secret: string;
    secondary_key: string;
    secondary_secret: string;
  };
  location: string;
}

export interface collectionsInterface {
  collections_id: string;
  project_id: string;
  name: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  type: string;
  base_url: string;
  web_service_authentication: string;
  description: string;
  status: string;
  service_type: string;
  wsdl_url: string;
  activeVersionID: string;
  active_vesion: string;
  operations: Array<{
    collection: string[];
    id: string;
    name: string;
    description: string;
    pass_through_forheaders: boolean;
    pass_through_forinputs: boolean;
    pass_through_foroutputs: boolean;
    pass_through_authorization: boolean;
    pass_through_queryparameters: boolean;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    status: string;
    security_type: string;
    soap_action: string;
    endpoint_url: string;
    soap_version: string;
    response_encoding: string;
    server_auth_mode: string;
    binding_name: string;
    soap_input_message: string;
    http_method: string;
    collections_id: string;
    collection_version_id: string;
    publish_name: string;
    method_name: string;
    operationHeaders: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    operationInputs: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    operationOutputs: Array<{
      id: string;
      operation_id: string;
      name: string;
      record_id: string;
      collection_id: string;
      param_order: number;
      data_type: string;
      scope: string;
      format_type: string;
      format_value: string;
      path: string;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      parent_order: number;
    }>;
    operation_Authorizations: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    operation_queryparamaeters: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    passThroughPayload: string;
    passThroughHeaders: string;
  }>;
  projects: Array<{
    project_id: string;
    tenant_id: string;
    workspace_id: string;
    email: string;
    project_name: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    summary: string;
    permission: string;
    activeVersionId: string;
    lastPublishedOn: string;
    lastPublishedBy: string;
    project_published_log_id: string;
    user: {
      id: string;
      tenant_id: string;
      first_name: string;
      last_name: string;
      user_name: string;
      password: string;
      confirm_password: string;
      email: string;
      status: string;
      created_at: string;
      updated_at: string;
      type: string;
      access_token: string;
      last_login_at: string;
      last_logout_at: string;
      reset_password_token: string;
      last_reset_password_at: string;
      last_update_password_at: string;
      member_invite_id: string;
      profile_picture: string;
      cover_picture: string;
      otp: string;
      user_verify: string;
      refresh_token: string;
      secret_key: string;
      is_2fa_enable: boolean;
    };
    active_version: {
      id: string;
      project_id: string;
      version: string;
      name: string;
      summary: string;
      permission: string;
      status: string;
      created_by: string;
      created_at: string;
      updated_at: string;
      updated_by: string;
    };
    project_versions: Array<{
      id: string;
      project_id: string;
      version: string;
      name: string;
      summary: string;
      permission: string;
      status: string;
      created_by: string;
      created_at: string;
      updated_at: string;
      updated_by: string;
    }>;
    publishDetails: {
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    };
    publishing_details: {
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    };
    project_publish_list: Array<{
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    }>;
    publish_detail: Array<{
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    }>;
    projectSettings: {
      unique_number: number;
      project_id: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    };
    pin_project: boolean;
  }>;
  activeVersion: {
    collection_version_id: string;
    collection_id: string;
    version: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
  };
  collection_versions: Array<{
    collection_version_id: string;
    collection_id: string;
    version: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
  }>;
}

export interface singleCollectionInterface {
  collections_id: string;
  project_id: string;
  name: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  type: string;
  base_url: string;
  web_service_authentication: string;
  description: string;
  status: string;
  service_type: string;
  wsdl_url: string;
  activeVersionID: string;
  active_vesion: string;
  operations: Array<{
    collection: string[];
    id: string;
    name: string;
    description: string;
    pass_through_forheaders: boolean;
    pass_through_forinputs: boolean;
    pass_through_foroutputs: boolean;
    pass_through_authorization: boolean;
    pass_through_queryparameters: boolean;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    status: string;
    security_type: string;
    soap_action: string;
    endpoint_url: string;
    soap_version: string;
    response_encoding: string;
    server_auth_mode: string;
    binding_name: string;
    soap_input_message: string;
    http_method: string;
    collections_id: string;
    collection_version_id: string;
    publish_name: string;
    method_name: string;
    operationHeaders: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    operationInputs: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    operationOutputs: Array<{
      id: string;
      operation_id: string;
      name: string;
      record_id: string;
      collection_id: string;
      param_order: number;
      data_type: string;
      scope: string;
      format_type: string;
      format_value: string;
      path: string;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      parent_order: number;
    }>;
    operation_Authorizations: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    operation_queryparamaeters: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    passThroughPayload: string;
    passThroughHeaders: string;
  }>;
  projects: Array<{
    project_id: string;
    tenant_id: string;
    workspace_id: string;
    email: string;
    project_name: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    summary: string;
    permission: string;
    activeVersionId: string;
    lastPublishedOn: string;
    lastPublishedBy: string;
    project_published_log_id: string;
    user: {
      id: string;
      tenant_id: string;
      first_name: string;
      last_name: string;
      user_name: string;
      password: string;
      confirm_password: string;
      email: string;
      status: string;
      created_at: string;
      updated_at: string;
      type: string;
      access_token: string;
      last_login_at: string;
      last_logout_at: string;
      reset_password_token: string;
      last_reset_password_at: string;
      last_update_password_at: string;
      member_invite_id: string;
      profile_picture: string;
      cover_picture: string;
      otp: string;
      user_verify: string;
      refresh_token: string;
      secret_key: string;
      is_2fa_enable: boolean;
    };
    active_version: {
      id: string;
      project_id: string;
      version: string;
      name: string;
      summary: string;
      permission: string;
      status: string;
      created_by: string;
      created_at: string;
      updated_at: string;
      updated_by: string;
    };
    project_versions: Array<{
      id: string;
      project_id: string;
      version: string;
      name: string;
      summary: string;
      permission: string;
      status: string;
      created_by: string;
      created_at: string;
      updated_at: string;
      updated_by: string;
    }>;
    publishDetails: {
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    };
    publishing_details: {
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    };
    project_publish_list: Array<{
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    }>;
    publish_detail: Array<{
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    }>;
    projectSettings: {
      unique_number: number;
      project_id: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    };
    pin_project: boolean;
  }>;
  activeVersion: {
    collection_version_id: string;
    collection_id: string;
    version: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
  };
  collection_versions: Array<{
    collection_version_id: string;
    collection_id: string;
    version: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
  }>;
}

export interface operationInterface {
  collections_id: string;
  project_id: string;
  name: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  type: string;
  base_url: string;
  web_service_authentication: string;
  description: string;
  status: string;
  service_type: string;
  wsdl_url: string;
  activeVersionID: string;
  active_vesion: string;
  operations: Array<{
    collection: string[];
    id: string;
    name: string;
    description: string;
    pass_through_forheaders: boolean;
    pass_through_forinputs: boolean;
    pass_through_foroutputs: boolean;
    pass_through_authorization: boolean;
    pass_through_queryparameters: boolean;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    status: string;
    security_type: string;
    soap_action: string;
    endpoint_url: string;
    soap_version: string;
    response_encoding: string;
    server_auth_mode: string;
    binding_name: string;
    soap_input_message: string;
    http_method: string;
    collections_id: string;
    collection_version_id: string;
    publish_name: string;
    method_name: string;
    operationHeaders: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    operationInputs: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    operationOutputs: Array<{
      id: string;
      operation_id: string;
      name: string;
      record_id: string;
      collection_id: string;
      param_order: number;
      data_type: string;
      scope: string;
      format_type: string;
      format_value: string;
      path: string;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      parent_order: number;
    }>;
    operation_Authorizations: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    operation_queryparamaeters: Array<{
      id: string;
      operation_id: string;
      name: string;
      data_type: string;
      param_order: number;
      default_value: string;
      test_value: string;
      source_value: string;
      encode: boolean;
      is_deletable: boolean;
      pass_null: boolean;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      description: string;
      scope: string;
      optional: boolean;
    }>;
    passThroughPayload: string;
    passThroughHeaders: string;
  }>;
  projects: Array<{
    project_id: string;
    tenant_id: string;
    workspace_id: string;
    email: string;
    project_name: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    summary: string;
    permission: string;
    activeVersionId: string;
    lastPublishedOn: string;
    lastPublishedBy: string;
    project_published_log_id: string;
    user: {
      id: string;
      tenant_id: string;
      first_name: string;
      last_name: string;
      user_name: string;
      password: string;
      confirm_password: string;
      email: string;
      status: string;
      created_at: string;
      updated_at: string;
      type: string;
      access_token: string;
      last_login_at: string;
      last_logout_at: string;
      reset_password_token: string;
      last_reset_password_at: string;
      last_update_password_at: string;
      member_invite_id: string;
      profile_picture: string;
      cover_picture: string;
      otp: string;
      user_verify: string;
      refresh_token: string;
      secret_key: string;
      is_2fa_enable: boolean;
    };
    active_version: {
      id: string;
      project_id: string;
      version: string;
      name: string;
      summary: string;
      permission: string;
      status: string;
      created_by: string;
      created_at: string;
      updated_at: string;
      updated_by: string;
    };
    project_versions: Array<{
      id: string;
      project_id: string;
      version: string;
      name: string;
      summary: string;
      permission: string;
      status: string;
      created_by: string;
      created_at: string;
      updated_at: string;
      updated_by: string;
    }>;
    publishDetails: {
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    };
    publishing_details: {
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    };
    project_publish_list: Array<{
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    }>;
    publish_detail: Array<{
      project_id: string;
      project_unique_number: number;
      project_name: string;
      publish_url: string;
      project_version: string;
      project_version_id: string;
      publish_id: string;
      publish_version: number;
      publish_notes: string;
      published_by: string;
      published_on: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    }>;
    projectSettings: {
      unique_number: number;
      project_id: string;
      primary_key: string;
      primary_secret: string;
      secondary_key: string;
      secondary_secret: string;
    };
    pin_project: boolean;
  }>;
  activeVersion: {
    collection_version_id: string;
    collection_id: string;
    version: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
  };
  collection_versions: Array<{
    collection_version_id: string;
    collection_id: string;
    version: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
  }>;
}

export interface singleOperationInterface {
  collection: Array<{
    collections_id: string;
    project_id: string;
    name: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    type: string;
    base_url: string;
    web_service_authentication: string;
    description: string;
    status: string;
    service_type: string;
    wsdl_url: string;
    activeVersionID: string;
    active_vesion: string;
    operations: string[];
    projects: Array<{
      project_id: string;
      tenant_id: string;
      workspace_id: string;
      email: string;
      project_name: string;
      status: string;
      created_by: string;
      created_at: string;
      updated_by: string;
      updated_at: string;
      summary: string;
      permission: string;
      activeVersionId: string;
      lastPublishedOn: string;
      lastPublishedBy: string;
      project_published_log_id: string;
      user: {
        id: string;
        tenant_id: string;
        first_name: string;
        last_name: string;
        user_name: string;
        password: string;
        confirm_password: string;
        email: string;
        status: string;
        created_at: string;
        updated_at: string;
        type: string;
        access_token: string;
        last_login_at: string;
        last_logout_at: string;
        reset_password_token: string;
        last_reset_password_at: string;
        last_update_password_at: string;
        member_invite_id: string;
        profile_picture: string;
        cover_picture: string;
        otp: string;
        user_verify: string;
        refresh_token: string;
        secret_key: string;
        is_2fa_enable: boolean;
      };
      active_version: {
        id: string;
        project_id: string;
        version: string;
        name: string;
        summary: string;
        permission: string;
        status: string;
        created_by: string;
        created_at: string;
        updated_at: string;
        updated_by: string;
      };
      project_versions: Array<{
        id: string;
        project_id: string;
        version: string;
        name: string;
        summary: string;
        permission: string;
        status: string;
        created_by: string;
        created_at: string;
        updated_at: string;
        updated_by: string;
      }>;
      publishDetails: {
        project_id: string;
        project_unique_number: number;
        project_name: string;
        publish_url: string;
        project_version: string;
        project_version_id: string;
        publish_id: string;
        publish_version: number;
        publish_notes: string;
        published_by: string;
        published_on: string;
        primary_key: string;
        primary_secret: string;
        secondary_key: string;
        secondary_secret: string;
      };
      publishing_details: {
        project_id: string;
        project_unique_number: number;
        project_name: string;
        publish_url: string;
        project_version: string;
        project_version_id: string;
        publish_id: string;
        publish_version: number;
        publish_notes: string;
        published_by: string;
        published_on: string;
        primary_key: string;
        primary_secret: string;
        secondary_key: string;
        secondary_secret: string;
      };
      project_publish_list: Array<{
        project_id: string;
        project_unique_number: number;
        project_name: string;
        publish_url: string;
        project_version: string;
        project_version_id: string;
        publish_id: string;
        publish_version: number;
        publish_notes: string;
        published_by: string;
        published_on: string;
        primary_key: string;
        primary_secret: string;
        secondary_key: string;
        secondary_secret: string;
      }>;
      publish_detail: Array<{
        project_id: string;
        project_unique_number: number;
        project_name: string;
        publish_url: string;
        project_version: string;
        project_version_id: string;
        publish_id: string;
        publish_version: number;
        publish_notes: string;
        published_by: string;
        published_on: string;
        primary_key: string;
        primary_secret: string;
        secondary_key: string;
        secondary_secret: string;
      }>;
      projectSettings: {
        unique_number: number;
        project_id: string;
        primary_key: string;
        primary_secret: string;
        secondary_key: string;
        secondary_secret: string;
      };
      pin_project: boolean;
    }>;
    activeVersion: {
      collection_version_id: string;
      collection_id: string;
      version: string;
      status: string;
      created_by: string;
      created_at: string;
      updated_at: string;
      updated_by: string;
    };
    collection_versions: Array<{
      collection_version_id: string;
      collection_id: string;
      version: string;
      status: string;
      created_by: string;
      created_at: string;
      updated_at: string;
      updated_by: string;
    }>;
  }>;
  id: string;
  name: string;
  description: string;
  pass_through_forheaders: boolean;
  pass_through_forinputs: boolean;
  pass_through_foroutputs: boolean;
  pass_through_authorization: boolean;
  pass_through_queryparameters: boolean;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  status: string;
  security_type: string;
  soap_action: string;
  endpoint_url: string;
  soap_version: string;
  response_encoding: string;
  server_auth_mode: string;
  binding_name: string;
  soap_input_message: string;
  http_method: string;
  collections_id: string;
  collection_version_id: string;
  publish_name: string;
  method_name: string;
  operationHeaders: Array<{
    id: string;
    operation_id: string;
    name: string;
    data_type: string;
    param_order: number;
    default_value: string;
    test_value: string;
    source_value: string;
    encode: boolean;
    is_deletable: boolean;
    pass_null: boolean;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    description: string;
    scope: string;
    optional: boolean;
  }>;
  operationInputs: Array<{
    id: string;
    operation_id: string;
    name: string;
    data_type: string;
    param_order: number;
    default_value: string;
    test_value: string;
    source_value: string;
    encode: boolean;
    is_deletable: boolean;
    pass_null: boolean;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    description: string;
    scope: string;
    optional: boolean;
  }>;
  operationOutputs: Array<{
    id: string;
    operation_id: string;
    name: string;
    record_id: string;
    collection_id: string;
    param_order: number;
    data_type: string;
    scope: string;
    format_type: string;
    format_value: string;
    path: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    description: string;
    parent_order: number;
  }>;
  operation_Authorizations: Array<{
    id: string;
    operation_id: string;
    name: string;
    data_type: string;
    param_order: number;
    default_value: string;
    test_value: string;
    source_value: string;
    encode: boolean;
    is_deletable: boolean;
    pass_null: boolean;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    description: string;
    scope: string;
    optional: boolean;
  }>;
  operation_queryparamaeters: Array<{
    id: string;
    operation_id: string;
    name: string;
    data_type: string;
    param_order: number;
    default_value: string;
    test_value: string;
    source_value: string;
    encode: boolean;
    is_deletable: boolean;
    pass_null: boolean;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    description: string;
    scope: string;
    optional: boolean;
  }>;
  passThroughPayload: string;
  passThroughHeaders: string;
}

export interface saveGetResponseInterface {
  request: {
    collectionName: string;
    collectionVersion: string;
    apiId: string;
    apiName: string;
    payload: {
      user_id: string;
      operationInputs: Array<{
        key: string;
        value: string;
      }>;
      operationHeaders: Array<{
        key: string;
        value: string;
      }>;
      requestPayload: string;
    };
  };
  serviceInput: {
    request: {
      headers: {
        additionalProp1: {
          options: {
            propertyNameCaseInsensitive: boolean;
          };
          parent: string;
          root: string;
        };
        additionalProp2: {
          options: {
            propertyNameCaseInsensitive: boolean;
          };
          parent: string;
          root: string;
        };
        additionalProp3: {
          options: {
            propertyNameCaseInsensitive: boolean;
          };
          parent: string;
          root: string;
        };
      };
      payload: string;
      method: string;
      url: string;
    };
  };
  serviceOutput: {
    response: {
      headers: {
        additionalProp1: {
          options: {
            propertyNameCaseInsensitive: boolean;
          };
          parent: string;
          root: string;
        };
        additionalProp2: {
          options: {
            propertyNameCaseInsensitive: boolean;
          };
          parent: string;
          root: string;
        };
        additionalProp3: {
          options: {
            propertyNameCaseInsensitive: boolean;
          };
          parent: string;
          root: string;
        };
      };
      status: string;
      statusCode: number;
      responseBody: string;
    };
  };
  response: {
    additionalProp1: {
      options: {
        propertyNameCaseInsensitive: boolean;
      };
      parent: string;
      root: string;
    };
    additionalProp2: {
      options: {
        propertyNameCaseInsensitive: boolean;
      };
      parent: string;
      root: string;
    };
    additionalProp3: {
      options: {
        propertyNameCaseInsensitive: boolean;
      };
      parent: string;
      root: string;
    };
  };
  operationOutputs: Array<{
    id: string;
    operation_id: string;
    name: string;
    record_id: string;
    collection_id: string;
    param_order: number;
    data_type: string;
    scope: string;
    format_type: string;
    format_value: string;
    path: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    description: string;
    parent_order: number;
  }>;
  event_res: {
    result: {
      version: {
        major: number;
        minor: number;
        build: number;
        revision: number;
        majorRevision: number;
        minorRevision: number;
      };
      content: {
        headers: Array<{
          key: string;
          value: string[];
        }>;
      };
      statusCode: number;
      reasonPhrase: string;
      headers: Array<{
        key: string;
        value: string[];
      }>;
      trailingHeaders: Array<{
        key: string;
        value: string[];
      }>;
      requestMessage: {
        version: {
          major: number;
          minor: number;
          build: number;
          revision: number;
          majorRevision: number;
          minorRevision: number;
        };
        versionPolicy: number;
        content: {
          headers: Array<{
            key: string;
            value: string[];
          }>;
        };
        method: {
          method: string;
        };
        requestUri: string;
        headers: Array<{
          key: string;
          value: string[];
        }>;
        options: {
          additionalProp1: string;
          additionalProp2: string;
          additionalProp3: string;
        };
      };
      isSuccessStatusCode: boolean;
    };
    lookups: {
      dnsLookupTime: {
        ticks: number;
        days: number;
        hours: number;
        milliseconds: number;
        microseconds: number;
        nanoseconds: number;
        minutes: number;
        seconds: number;
        totalDays: number;
        totalHours: number;
        totalMilliseconds: number;
        totalMicroseconds: number;
        totalNanoseconds: number;
        totalMinutes: number;
        totalSeconds: number;
      };
      tcpHandshakeTime: {
        ticks: number;
        days: number;
        hours: number;
        milliseconds: number;
        microseconds: number;
        nanoseconds: number;
        minutes: number;
        seconds: number;
        totalDays: number;
        totalHours: number;
        totalMilliseconds: number;
        totalMicroseconds: number;
        totalNanoseconds: number;
        totalMinutes: number;
        totalSeconds: number;
      };
      sslHandshakeTime: {
        ticks: number;
        days: number;
        hours: number;
        milliseconds: number;
        microseconds: number;
        nanoseconds: number;
        minutes: number;
        seconds: number;
        totalDays: number;
        totalHours: number;
        totalMilliseconds: number;
        totalMicroseconds: number;
        totalNanoseconds: number;
        totalMinutes: number;
        totalSeconds: number;
      };
      transferStartTime: {
        ticks: number;
        days: number;
        hours: number;
        milliseconds: number;
        microseconds: number;
        nanoseconds: number;
        minutes: number;
        seconds: number;
        totalDays: number;
        totalHours: number;
        totalMilliseconds: number;
        totalMicroseconds: number;
        totalNanoseconds: number;
        totalMinutes: number;
        totalSeconds: number;
      };
      responseTime: {
        ticks: number;
        days: number;
        hours: number;
        milliseconds: number;
        microseconds: number;
        nanoseconds: number;
        minutes: number;
        seconds: number;
        totalDays: number;
        totalHours: number;
        totalMilliseconds: number;
        totalMicroseconds: number;
        totalNanoseconds: number;
        totalMinutes: number;
        totalSeconds: number;
      };
      downloadTime: {
        ticks: number;
        days: number;
        hours: number;
        milliseconds: number;
        microseconds: number;
        nanoseconds: number;
        minutes: number;
        seconds: number;
        totalDays: number;
        totalHours: number;
        totalMilliseconds: number;
        totalMicroseconds: number;
        totalNanoseconds: number;
        totalMinutes: number;
        totalSeconds: number;
      };
      totalTime: {
        ticks: number;
        days: number;
        hours: number;
        milliseconds: number;
        microseconds: number;
        nanoseconds: number;
        minutes: number;
        seconds: number;
        totalDays: number;
        totalHours: number;
        totalMilliseconds: number;
        totalMicroseconds: number;
        totalNanoseconds: number;
        totalMinutes: number;
        totalSeconds: number;
      };
    };
    size: {
      response_HeaderSize: number;
      response_BodySize: number;
      request_HeaderSize: number;
      request_BodySize: number;
    };
  };
}

export interface projectPublishInterface {
  project_id: string;
  project_unique_number: number;
  project_name: string;
  publish_url: string;
  project_version: string;
  project_version_id: string;
  publish_id: string;
  publish_version: number;
  publish_notes: string;
  published_by: string;
  published_on: string;
  primary_key: string;
  primary_secret: string;
  secondary_key: string;
  secondary_secret: string;
}

export interface currentChangeHistoryInterface {
  change_history_logs_id: string;
  change_property: string;
  type: string;
  category: string;
  old_value: string;
  new_value: string;
  created_at: string;
  created_by: string;
  project_id: string;
  project_published_log_id: string;
  collection_id: string;
  collections: {
    collection_id: string;
    collection_name: string;
  };
  operation_id: string;
  operations: {
    operation_id: string;
    operation_name: string;
  };
  old_value_json: string;
  new_value_json: string;
}

export interface collectionListbyProjectIdInterface {
  collection_id: string;
  collection_name: string;
  operation: Array<{
    operation_id: string;
    operation_name: string;
    http_method: string;
    http_method_name: string;
    operations_header: Array<{
      name: string;
      test_value: string;
      default_value: string;
    }>;
    operations_input: Array<{
      name: string;
      test_value: string;
      default_value: string;
    }>;
    operations_auth: Array<{
      name: string;
      test_value: string;
      default_value: string;
    }>;
    operations_query_param: Array<{
      name: string;
      test_value: string;
      default_value: string;
    }>;
    operation_output: Array<{
      name: string;
      record_id: string;
      collection_id: string;
      data_type: string;
    }>;
  }>;
}

export interface projectSolrOffsetInterface {
  project_id: string | undefined;
  name: string;
  updated_at: string; // Date should be represented as a string
  updated_by: string;
  document: string;
  id: string;
  is_pinned: boolean;
  version: string;
  workspace_id: string;
}

export interface projectSolrPaginationInterface {
  project_id: string | undefined;
  name: string;
  updated_at: string; // Date should be represented as a string
  updated_by: string;
  document: string;
  id: string;
  is_pinned: boolean;
  version: string;
  workspace_id: string;
}

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
