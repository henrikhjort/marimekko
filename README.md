
# Marimekko assignment setup guide

Welcome to the setup guide for the Marimekko Assignment. Below you will find all the necessary steps to get both the Azure Functions app and the Next.js application up and running, along with their provisioning on Azure and Vercel.

## Project overview

### Live site
Access the live application here: [Marimekko assignment](https://marimekko-assignment.vercel.app)

You can log in using the following test credentials:
```
email: maija.poppanen@email.com
code: 1234
```

### Key Features
- Serverless API hosted on Azure Functions
- Frontend powered by Next.js and hosted on Vercel
- MongoDB

### Future Improvements
For potential enhancements and known issues, please refer to the [Issues section](https://github.com/henrikhjort/marimekko/issues) on GitHub.

## Setup Instructions

### Provisioning Azure Functions

1. **Configure Terraform variables**  
   Navigate to the `terraform-functions` directory and create a `terraform.tfvars` file with the following content:
   ```
   project = "your_project_name"
   environment = "dev"
   location = "your_azure_region"
   database_url = "your_database_connection_string"
   jwt_secret = "your_jwt_secret"
   ```

2. **Initialize and apply Terraform configuration**  
   Execute the following commands to provision the Azure resources:
   ```bash
   terraform init
   terraform apply
   ```

3. **Setup GitHub secrets**  
   Obtain the Azure Function App publish profile from the Azure portal and add it as a GitHub secret for automated deployments:
   - **Secret Name**: `AZURE_PUBLISH_PROFILE`
   - **Secret Value**: `your_azure_publish_profile`

### Setting up the Next.js Application on Vercel

1. **Connect GitHub Repository**  
   Link your GitHub repository with your Vercel account for continuous deployment.

2. **Obtain Vercel API token (needed in the next step)

3. **Configure Terraform Variables for Vercel**  
   Navigate to `terraform-client` and set up the `terraform.tfvars` file:
   ```
   project_name = "MarimekkoAssignment"
   team_id = "your_vercel_team_id"
   project_root = "path_to_your_nextjs_project_root"
   source_branch = "main"
   repository_name = "your_github_repository_name"
   api_token = "your_vercel_api_token"
   prod_api_url = "https://marimekko-assignment.vercel.app/api"
   ```

4. **Initialize and apply Terraform configuration**  
   Execute the following commands to provision the Vercel resources:
   ```bash
   terraform init
   terraform apply
   ```

### Local Development Setup

#### Azure Functions App

1. **Install Dependencies**
   ```bash
   cd functions
   npm install
   ```

2. **Configure Local Environment Variables**  
   Create a `.env` file in the `functions` directory with the following entries:
   ```
   DATABASE_URL=your_local_database_url
   JWT_SECRET=your_jwt_secret
   ```

3. **Create local.settings.json**
   ```bash
   touch local.settings.json
   ```
   Please refer to local.settings.template.json
   The file content should be good as is.

4. **Start the Functions App**
   ```bash
   npm start
   ```

#### Next.js Application

1. **Install Dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Set Local Environment Variables**  
   Create a `.env.local` file in the `client` directory:
   ```
   NEXT_PUBLIC_API_URL=http://127.0.0.1:7071/api
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

### Tests

#### Client

There is a Github actions workflow that automatically runs client component tests.

Note: Application deployment doesn't currently care about running the test suite first. Todo.

### Functions

Todo.
