'use strict'
const env = process.env
const fs = require('fs')
const packageObj = JSON.parse(fs.readFileSync('package.json', 'utf8'))

let envVariables = {
  LEARNER_URL: env.sunbird_learner_player_url || 'https://dev.sunbirded.org/api/',
  CONTENT_URL: env.sunbird_content_player_url || 'https://dev.sunbirded.org/api/',
  CONFIG_URL: env.sunbird_config_service_url || 'https://dev.sunbirded.org/api/config/',
  CONFIG_CACHE_TTL: env.config_cache_ttl || 600,
  CONTENT_PROXY_URL: env.sunbird_content_proxy_url || 'https://dev.sunbirded.org',
  PORTAL_REALM: env.sunbird_portal_realm || 'sunbird',
  PORTAL_AUTH_SERVER_URL: env.sunbird_portal_auth_server_url || 'https://dev.sunbirded.org/auth',
  PORTAL_AUTH_SERVER_CLIENT: env.sunbird_portal_auth_server_client || 'portal',
  APPID: process.env.sunbird_environment + '.' + process.env.sunbird_instance + '.portal',
  DEFAULT_CHANNEL: env.sunbird_default_channel,
  EKSTEP_ENV: env.ekstep_env || 'qa',
  PORTAL_PORT: env.sunbird_port || 3000,
  PORTAL_API_AUTH_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMTc1MDIwNDdlODc0ODZjOTM0ZDQ1ODdlYTQ4MmM3MyJ9.7LWocwCn5rrCScFQYOne8_Op2EOo-xTCK5JCFarHKSs",
  PORTAL_TELEMETRY_PACKET_SIZE: env.sunbird_telemetry_packet_size || 1000,
  PORTAL_ECHO_API_URL: env.sunbird_echo_api_url || 'https://dev.sunbirded.org/api/echo/',
  PORTAL_AUTOCREATE_TRAMPOLINE_USER: env.sunbird_autocreate_trampoline_user || 'true',
  PORTAL_TRAMPOLINE_CLIENT_ID: env.sunbird_trampoline_client_id || 'trampoline',
  PORTAL_TRAMPOLINE_SECRET: env.sunbird_trampoline_secret,
  ENABLE_PERMISSION_CHECK: env.sunbird_enabless_permission_check || 0,
  PORTAL_SESSION_STORE_TYPE: env.sunbird_session_store_type || 'in-memory',
  PORTAL_TITLE_NAME: env.sunbird_instance || 'Sunbird',
  PORTAL_CDN_URL: env.sunbird_portal_cdn_url || '',
  PORTAL_THEME: env.sunbird_theme || 'default',
  PORTAL_DEFAULT_LANGUAGE: env.sunbird_portal_default_language || 'en',
  PORTAL_PRIMARY_BUNDLE_LANGUAGE: env.sunbird_portal_primary_bundle_language || 'en',
  CONTENT_SERVICE_UPSTREAM_URL: env.sunbird_content_service_upstream_url || 'http://localhost:5000/',
  LEARNER_SERVICE_UPSTREAM_URL: env.sunbird_learner_service_upstream_url || 'http://localhost:9000/',
  DATASERVICE_URL: env.sunbird_dataservice_url || 'https://dev.sunbirded.org/api/',
  KEY_CLOAK_PUBLIC: env.sunbird_keycloak_public || 'true',
  KEY_CLOAK_REALM: env.sunbird_keycloak_realm || 'sunbird',
  CACHE_STORE: env.sunbird_cache_store || 'memory',
  CACHE_TTL: env.sunbird_cache_ttl || 1800,
  learner_Service_Local_BaseUrl: env.sunbird_learner_service_local_base_url || 'http://learner-service:9000',
  content_Service_Local_BaseUrl: env.sunbird_content_service_local_base_url || 'http://content_service_content_service:5000',
  ANDROID_APP_URL: env.sunbird_android_app_url || 'http://www.sunbird.org',
  EXPLORE_BUTTON_VISIBILITY: env.sunbird_explore_button_visibility || 'true',
  ENABLE_SIGNUP: env.sunbird_enable_signup || 'true',
  BUILD_NUMBER: env.build_number || packageObj.version+'.'+packageObj.buildNumber,
  TELEMETRY_SERVICE_LOCAL_URL: env.sunbird_telemetry_service_local_url || 'http://telemetry-service:9001/',
  PORTAL_API_CACHE_TTL: env.sunbird_api_response_cache_ttl || '600',
  SUNBIRD_EXTCONT_WHITELISTED_DOMAINS: env.sunbird_extcont_whitelisted_domains || 'youtube.com,youtu.be',
  TENANT_CDN_URL: env.sunbird_tenant_cdn_url || '',
  CLOUD_STORAGE_URLS: env.sunbird_cloud_storage_urls,
  PORTAL_USER_UPLOAD_REF_LINK: env.sunbird_portal_user_upload_ref_link || 'http://www.sunbird.org/features-documentation/register_user',
  AZURE_ACCOUNT_NAME: env.julia_azure_account_name  || 'nuih',
  AZURE_ACCOUNT_KEY: env.julia_azure_account_key || '5SghfAqT/SbYk6dSQU+xuJEaZPQH4IcdiohieLvwcpm4toa3B3xzgO24paGfFtulScKK/PKNnVigpfwynvEdaA==',
  AZURE_STORAGE_URL: env.julia_azure_storage_url || 'https://nuih.blob.core.windows.net/',
  CERTIFICATE_STORE_CONTAINER_NAME: env.julia_certificate_storage_container_name || 'certificate',
  CERTIFICATE_PROVIDER_NAME: env.julia_certificate_provider_name || 'NUIH',
  CERTIFICATE_INSTRUCTOR_NAME: env.julia_certificate_instructor_name || 'Abhijith Chandraprabhu',
  EMAIL_STORE_AZURE_ACCOUNT_NAME: 'nuihsunbird',
  EMAIL_STORE_AZURE_ACCOUNT_KEY: 'PiAc4nsoLrcyfxqH2E4PEiNeEZ2Ji42LiyGKe698a46DAaOLEqS3CbS9gMzdYBQBIEjO+f0uIj9szZBvEosDVQ==',
  EMAIL_STORE_CONTAINER_NAME: 'emails'
}

envVariables.PORTAL_CASSANDRA_URLS = (env.sunbird_cassandra_urls && env.sunbird_cassandra_urls !== '')
  ? env.sunbird_cassandra_urls.split(',') : ['localhost']

module.exports = envVariables
