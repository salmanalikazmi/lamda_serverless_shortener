# URL Shortener Using AWS Lambda

This repo contains components for a POC URL shortner service running on Amazon's API Gateway and Lambda services.


## Components

* API Gateway front-end
* Lambda JavaScript function back-end
* DynamoDB datastore

### Required AWS resources

The `main.tf` [Terraform](https://www.terraform.io/) file contains basic resources required for DynamoDB including a table and IAM role with associated policies.

To use this [install and configure Terraform](https://www.terraform.io/intro/getting-started/install.html) for your AWS account.

### API Gateway

[v1-swagger.yml](v1-swagger.yml) contains a [Swagger](http://swagger.io/getting-started/) YAML definition for the front-end interface. This can be imported into your AWS using Amazon.

**NOTE**: References to Amazon account id have been replaced with `{accountid}`. You will need to change these to your numeric AWS account id.

### Lambda Functions

All Lambda functions are organized under `lambda` using the [Apex framework](http://apex.run/).

**NOTE**: References to Amazon account id have been replaced with `{accountid}`. You will need to change these to your numeric AWS account id.

Once you [install Apex](http://apex.run/#installation), you can deploy via the CLI:

```
> cd lambda
> apex deploy
```

And execute locally via the CLI:

```
> cd lambda
> echo '{ "token":"xxxxxxx" }' | apex invoke lookup_token
```
