# terraform/variables.tf

variable "project" {
  type = string
  description = "Project name"
}

variable "environment" {
  type = string
  description = "Environment (dev / stage / prod)"
}

variable "location" {
  type = string
  description = "Azure region to deploy module to"
}

variable "database_url" {
  type = string
  description = "Database url"
}

variable "jwt_secret" {
  type = string
  description = "JWT secret key"
}