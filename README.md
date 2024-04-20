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

Set publish profile in github secrets

https://github.com/henrikhjort/marimekko/settings/secrets/actions
```
AZURE_PUBLISH_PROFILE = xxxx
```

## Nextjs
todo

# Local development

## Functions app

Install dependencies
```
npm i
```

Set .env variables in `functions/.env`

```
DATABASE_URL="file:./db/db.sqlite3"
JWT_SECRET= xxxx
```

Seed database

```
npm run seed
```
