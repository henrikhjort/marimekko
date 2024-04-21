# Specify the required Terraform and Provider settings
terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

provider "vercel" {
  api_token = var.api_token
}

# Resource to create a Vercel project
resource "vercel_project" "marimekko" {
  name      = "${var.project_name}"
  framework = "nextjs"
  team_id   = "${var.team_id}"

  git_repository = {
    type = "github"
    repo = "${var.repository_name}"
    ref  = "${var.source_branch}"
  }

  root_directory = "${var.project_root}"
}

output "vercel_project_id" {
  value = vercel_project.marimekko.id
}

output "vercel_team_id" {
  value = "${var.team_id}"
}

resource "vercel_project_environment_variable" "prod_api_url" {
  project_id = vercel_project.marimekko.id
  team_id   = "${var.team_id}"
  key        = "NEXT_PUBLIC_API_URL"
  value      = "${var.prod_api_url}"
  target     = ["production"]
}

resource "vercel_project_environment_variable" "prod_api_key" {
  project_id = vercel_project.marimekko.id
  team_id   = "${var.team_id}"
  key        = "NEXT_PUBLIC_API_KEY"
  value      = "${var.prod_api_key}"
  target     = ["production"]
}