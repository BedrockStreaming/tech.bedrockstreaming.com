---
layout: post
title: "Backend dev principles"
description: "We develop the backend, and we have principles !"
author:
name: Bedrock backend team 
avatar:         
email:          
twitter: Bedrock_Tech      
facebook:       
github:    
category:
tags: [backend, php]
image:
  feature: posts/bonnes-pratiques-web/bedrock.jpg
feature: 
credit: 
creditlink:
comments: true
---

# We do software with principles 

In Bedrock teams we aim to enforce statements to help culture and best practice spread all around our big company. 
Here are the principles defined by the backend PHP tech team. 

# Backend principles 

Following rules are applied in all backend teams in Bedrock. They aim to enforce some homogeneity in practices and to ensure 
a standard quality of service. Although teams are still free to take local decisions about how to manage their projects, 
they MUST comply with these non-negotiable rules. Rules can be changed through a Request For Comments (RFC), approved by 
80% of Backend Tech & Team Lead.


The keywords "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and 
"OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

# Projects
* A project MUST be versioned by Git, hosted on internal GitHub in private (except for open-source projects).
* A project/library MUST have a clear owner/maintainer.
* Maintainer MAY be a person or a group of people.
* Maintainer SHOULD maintain the project roadmap.
* Maintainer MUST ensure that the project is up-to-date, or archive it.
* Maintainer MUST review pull requests.
* Owner MUST be the only one responsible for repository administration.
* Each API project MUST use GraphQL and/or REST-like approach.
* REST-like API MUST be documented with an OpenAPI file.
* An internal project name MUST respect the following scheme: type - scope - name.
* The type MUST be service, bundle, library or reporting depending on its function.
* The scope MUST be bedrock for core projects or the related customer name.
* New services SHOULD be bootstrapped from the skeleton project.
* Projects SHOULD use Symfony if a framework is needed.
* Internal project MUST use Jenkins (waiting for GHA) as CI.
* A project MUST have a SLO defined.
* Projects MUST enforce soft limits wherever it’s possible (http rate limits, number of items returned, number of items stored etc...).
* Project SHOULD leverage a cache system local to the server. For exemple, cache (even few seconds) data in APCU before caching elsewhere.

# Quality
* Every development MUST be peer reviewed, and obtain (at least) 2 approvals, and at least 1 from maintainers.
* Every new development MUST be unit tested using PhpUnit.
* Migration of old unit tests written with Atoum is OPTIONAL.
* Every internal Php project MUST run these common quality tools:
  * Local Php security checker
  * PhpStan with the maximum level
  * CsFixer (following Bedrock rules set)
  * Composer source checker [^1]
  * Git commit checker [^2]
* Every external Php project MUST run these common quality tools:
  * Local Php security checker (or equivalent)
  * PhpStan
  * CsFixer (following Bedrock rules set)
* The project team SHOULD ensure that the quality insight from oKaPI [^3] are green.

[^1] Internal tool validating that all our dependencies are installed via our [own satis server](https://tech.bedrockstreaming.com/composer-installation-without-github.html)

[^2] Internal tool validating the commit format

[^3] OKaPI is our internal tool for static analysis enforcing internal rules such as: 
PHP and Terraform version, mandatory libs etc.  

# Monitoring
* Projects MUST be monitored in production.
  * They MUST use New Relic
  * Deployment MUST be tracked
  * A dashboard by project, tenant and env MUST be present using terraform
  * All NewRelic resources MUST contain all common tags such as team, product-line, …
  * An alert MUST be defined for detecting and responding to incident

# Performance
* Each Http call MUST have a timeout.
* Project MUST use HttpDefault[^4].
* Retries SHOULD NOT be applied for non-blocking http call
* Internal Http call SHOULD use the ingress[^5]
* External Http call SHOULD use the egress[^6], except for calls to AWS services

[^4] HttpDefault is an internal library (maybe open sourced one day) which, once installed, force the developer to set 
timeouts on http calls. 

[^5] see [this blog post](https://tech.bedrockstreaming.com/increase-performance-and-stability-by-adding-an-egress-controller/)

[^6] see [this blog post](https://tech.bedrockstreaming.com/increase-performance-and-stability-by-adding-an-egress-controller/)


# Architecture
* Business logic SHOULD NOT be mixed with external dependencies (Symfony, Doctrine…) to limit impact of dependencies migration/update core code
* Concepts MUST be clearly named (even if it’s a difficult task)

# Process
* Deployments
  * Deployments MUST be announced publicly in #deploy-platform Slack channel
  * Deployments MUST be performed/tested in staging (including previews) first, and then in production
  * The person in charge of the deployment MUST monitor every anomaly occurring 2 hours after
* Squat [^5]
  * Squat MUST be announced publicly in #deploy-platform Slack channel
  * Squat MUST be pinned in #deploy-platform

[^5] "squat" means for us the action to temporarily deploy a branch of the source code in staging env
(and more rarely in production) for debugging purpose.