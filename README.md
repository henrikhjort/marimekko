# Website

https://marimekko-assignment.vercel.app

# Provisioning

## Functions app

Enter correct variables in `terraform-functions/terraform.tfvars`

```
project = xxxx
environment = xxxx
location = xxxx
database_url = xxxx
jwt_secret = xxxx
```

Provision Azure resources
```
cd terraform-functions
terraform apply
```

Download function app publish profile from Azure portal

Enable Access-Control-Allow-Credentials in portal.
Set origins to https://marimekko-assignment.vercel.app/

Set publish profile in github secrets

https://github.com/henrikhjort/marimekko/settings/secrets/actions
```
AZURE_PUBLISH_PROFILE = xxxx
```

## Nextjs

Link github repo with Vercel account

Enter correct variables in `terraform-client/terraform.tfvars`

```
project_name = xxxx
team_id = xxxx
project_root = xxxx
source_branch = xxxx
repository_name = xxxx
api_token = xxxx
prod_api_url = xxxx
```

# Local development

## Functions app

Install dependencies
```
npm i
```

Set .env variables in `functions/.env`

```
DATABASE_URL= xxxx
JWT_SECRET= xxxx
```

Seed database

```
npm run seed
```

Start app

```
npm run start
```

## Nextjs

Install dependencies
```
npm i
```

Set .env variables in `client/.env.local`

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:7071/api
```

Start app

```
npm run dev
```