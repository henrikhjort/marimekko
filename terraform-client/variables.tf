# terraform/variables.tf

variable "project_name" {
  type = string
  description = "Project name"
}

variable "team_id" {
  type = string
  description = "Vercel team ID"
}

variable "project_root" {
  type = string
  description = "Project source directory"
}

variable "source_branch" {
  type = string
  description = "Branch to trigger deployments"
}

variable "repository_name" {
  type = string
  description = "Repository name"
}

variable "api_token" {
  type = string
  description = "Vercel API token"
}

variable "prod_api_url" {
  type = string
  description = "API URL for the prod environment"
}

variable "prod_api_key" {
  type = string
  description = "API key"
}