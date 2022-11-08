---
layout: post
title: "How many DynamoDB RCU and WCU should we reserve to achieve maximum cost reductions, when our workloads are changing all the time?"
description: "How many DynamoDB RCU and WCU should we reserve to achieve maximum cost reductions, when our workloads are changing all the time?"
author: p_martin
category:
tags: [aws, dynamodb, finops]
feature-img: "images/posts/aws/dynamodb-reservations/TODO-header.jpg"
thumbnail: "images/posts/aws/dynamodb-reservations/TODO-header.jpg"
comments: true
language: en
---

Many of the microservices in our VOD and Replay platform use DynamoDB as their database.  
Performance is very good if the data is architected for it, scalability is reasonably fast, and the serverless aspect offloads a lot of the administration and hosting work: we just have to specify the capacity we need and configure an auto-scaler. Whether it's performance, resilience or time-to-market, DynamoDB helps us achieve our business goals.

That said, when we spend several hundred thousand dollars on DynamoDB every year, any optimization is good for us!

With DynamoDB, committing to a certain capacity for a year can help reduce costs -- up to 50% savings, in theory, on that capacity. But how do we know how much to reserve when the traffic on our platform varies throughout the day?

## DynamoDB: a cost model not always obvious!

> DynamoDB is serverless!

But, as with many AWS services, you have to think for a while before you really understand DynamoDB costs...

### Out of scope costs

We pay for the volume of data stored, the volume of data backed up. These costs are outside the scope of this article and I won't talk about them again today. They are not zero, however, and can even be a significant part of your bill -- for example, if you store large data hot for a long time in DynamoDB. Something you probably shouldn't do!

### WCUs and RCUs

Each DynamoDB table can be configured for either "on-demand" or "provisioned" billing mode.

In the second case, we pay for RCUs (Read Capacity Units) and WCUs (Write Capacity Units), depending on the capacity we provision for each table. The reservations are only for these RCUs and WCUs, in purple in the screenshot below.

![Cost by API Operation](/images/posts/aws/dynamodb-reservations/01-ddb-cost-by-api-operation.png)

Over the past year, our WCU and RCU costs in provisioned mode represent about half of our DynamoDB costs. Storage and backups have costs that we consider negligible today. And, from a financial standpoint, we work with far too many pay-per-request tables for my taste -- in short, they are more flexible than provisioned tables.

[The documentation](https://aws.amazon.com/dynamodb/pricing/) will tell you more, but in very broad terms:

* One WCU is consumed for writing one line of data. Or for each 1 KB block written.
* One RCU is consumed to read one line of data. Or for each 4 KB block read.
* In eventually-consistent read mode, only 1/2 RCU is consumed to read one line of data. Or for each 4 KB block.
* Transactional mode costs twice as much.

As you can imagine, the first optimization is to store only what is necessary and to request DynamoDB in the way that best meets the needs of the application, including consistency and costs. Developing a data schema that efficiently meets the needs of the application is crucial. I highly recommend you to read the very good book [The DynamoDB Book](https://www.dynamodbbook.com/) by Alex DeBrie! Financial optimization based on reservations should and can only come afterwards.

### The on-demand / pay-per-request mode

In on-demand mode, we (theoretically) don't have to worry about scalability, DynamoDB handles it for us (in practice, AWS hides what's going on, but doesn't scale to infinity instantly either).

In on-demand mode, we pay for each RCU and WCU consumed. If we don't use DynamoDB, we don't pay. If we use DynamoDB, we pay. The counterpart is that RCUs and WCUs are more expensive in this mode than in the one presented below.

This mode is therefore very practical in two cases:

* In an environment where we only perform a few queries from time to time (dev, staging).
* For tables that are generally not used much, but that receive large peaks of requests at certain times.

This mode is not adapted, for reasons of too high costs:

* For tables where consumption is stable or varies slowly. Typically, on tables whose consumption follows our daily traffic wave, which is gentle enough on most applications for a reactive auto-scaling mechanism to meet the need.

### Provisioned mode

In provisioned mode, we choose how many RCUs and WCUs we want to have and we pay for that number of RCUs and WCUs - whether we consume them or not. This billing method is therefore less flexible than the "on-demand" method. On the other hand, RCUs and WCUs are less expensive.

In "provisioned" mode, we can set up an auto-scaler on the RCUs and WCUs of the tables that need them. It will dynamically reconfigure the provisioned RCUs and WCUs for those tables, to approximate the actual usage. With an auto-scaler, we can pay as close as possible to our actual consumption, at the "provisioned" rate, which is lower than the "on-demand" rate.
However, the scale-out is not instantaneous: it takes several minutes to detect that it needs to act, and then up to several minutes (especially on a large table) to act. Also, and to simplify, scale-in can only be triggered once per hour. For more detailed information, read [the documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html) and [the quota page](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ServiceQuotas.html).

This mode is especially recommended:

* As often as possible, since each RCU and WCU costs much less than in on-demand mode.

This mode is not suitable:

* On tables where consumption varies very abruptly.

### In provisioned mode, reservations

By committing ourselves for one year (or even three years in some regions) to pay for a certain amount of RCU and WCU, these RCU and WCU become even cheaper: up to ~50% cheaper than in "basic provisioned" mode.
Reserving capacity is therefore a very good way to considerably reduce the cost of read/write operations on DynamoDB!

Reservations commit us for one year. We will pay for the reserved RCUs and WCUs, whether we use them or not. It is therefore important to calculate correctly the reservations to be made.
Also, we pay a part of the total yearly amount at the beginning of the commitment (= "upfront") and therefore have to be able to invest a certain amount in advance. The other part of the amount is spread over all the months of the commitment period.

The big question, which the rest of this document tries to answer, is therefore "how much RCU and WCU should we reserve to keep our costs as low as possible?" When our consumption varies throughout the day, this calculation is pretty fun...

These reservations are global to an AWS account, or even to all accounts that are on a consolidated bill (this is the case at Bedrock, where we have a dedicated billing account, a pay account, that aggregates data from all our other accounts).

→ "Reserved" pricing is documented on the [page of "provisioned" pricing](https://aws.amazon.com/dynamodb/pricing/provisioned/).
→ You can also read [this whitepaper](https://docs.aws.amazon.com/whitepapers/latest/cost-optimization-reservation-models/amazon-dynamodb-reservations.html).


## How many WCUs and RCUs do we consume?

For the rest of our reasoning and this article, we only count the consumption in "provisioned" mode (not "on-demand"), since that's where we can play with reservations. Also, we count provisioned WCU and RCU and not what is actually consumed -- so beware of waste.

On the DynamoDB Web Console home screen, we can see, for an account and a region, how many WCUs and RCUs we have provisioned at the current time:

![DynamoDB Capacity used, right now, in one account and region](/images/posts/aws/dynamodb-reservations/02-ddb-capacity-used-right-now-in-one-account-and-region.png)

But these numbers only give a view at a given moment, in a single AWS account and in a single region. For us who deploy our platform across dozens of accounts and multiple regions, with traffic that changes throughout the day, this is not enough.

### Table WCUs/RCUs

To get a global view of all tables in an account in a region, we can query Cloudwatch Metrics, analyzing the ProvisionedWriteCapacityUnits or ProvisionedReadCapacityUnits metrics:

![Write capacity per table, Cloudwatch metrics](/images/posts/aws/dynamodb-reservations/03-ddb-write-capacity-per-table-cloudwatch-metrics-CENSORED.png)

The Stacked Area view allows you to see, at any given time, the total WCUs (or RCUs) provisioned for all of our tables, in an account and a region.

### WCU/RCU of GSI

Mind you, we also want to count the WCUs/RCUs of the Global Secondary Indexes - and these are different metrics! Or, at least, the metrics are stored in a different category in the Cloudwatch web console.

![Write capacity per GSI, Cloudwatch metrics](/images/posts/aws/dynamodb-reservations/04-ddb-write-capacity-per-gsi-cloudwatch-metrics-CENSORED.png)

### So, in total...

To get the total, you have to take into account this metric for the tables and for the Global Secondary Indexes! In the Cloudwatch console, you have to search in two categories. By graphing it all :

![Total write capacity, Cloudwatch metrics](/images/posts/aws/dynamodb-reservations/05-ddb-write-capacity-all-cloudwatch-metrics-CENSORED.png)

Of course, this is to be looked at for WCUs, but also for RCUs, following exactly the same principle. And, again, we're working on multiple accounts and regions.


## In theory: how much to book for maximum savings?

Once we know how much we're actually reserving, we can move on to reservations. But the calculation would be far too easy if our usage was flat! In reality, thanks to auto-scaling, our provisioned capacity follows our usual traffic wave... And, two things:

* if we reserve more than we provision, we waste money.
* if we book less than we provision, we don't save as much as we could.

### Reserve at the bottom of the wave

A first idea is to reserve the "lowest" value we provision throughout the day: what we provision at the bottom of the traffic wave, at night.

In this case, we are not wasting money (we always provision 100% or more of our reservation), but we are probably minimizing our savings, since we are provisioning higher than the reservation, throughout the day...

### Booking at the top of the wave

A second idea, in contrast, is to book the "highest" value we provision throughout the day. This way we will never pay the full rate for our WCU/RCU.

But, in this case, we will be wasting a lot of money, since all day long we will be provisioning less than our reservation. This is a bad idea.

### Reserve "in the middle" by doing the right calculations

That leaves the real solution: calculate a happy medium and book:

* Less than "the highest value", to minimize waste.
* And more than "the lowest value", to optimize savings.


## In practice: let's calculate how much to reserve!

Manipulating metrics in Cloudwatch, for visualization, may be acceptable, although we rarely do it since we use other stacks for our metrics. And aggregating metrics from multiple accounts should be feasible (we haven't tried it). But for calculations, it is not enough.

### Exporting metrics

As a first step, we exported the metrics visualized above, to be able to manipulate them in another tool - in a spreadsheet, for example. To export these metrics from Cloudwatch, we can query its API. We need to do this for all accounts and for each table. Complicated to do this manually.

To simplify the task, we started working with a script (available at k8s-sandbox/scripts/dynamodb) that exports this data to a CSV file. Specifically, this script exports one data point per hour: the number of WCUs or RCUs actually provisioned during that hour.
By running this script for a representative week, we have enough data to calculate the ideal reservations...

**Representative week?**
Of course, we have to be careful to choose the week we focus on.  If we work with data from a week with a huge unexplained peak, or trough, of traffic, the results of our calculation will be adapted to that week, but not so much to the rest of the year!

### A Google Spreadsheet calculation

By importing this data into a Google Spreadsheet, we get two columns: a date+time and a number of WCUs. And for each one-hour range during a week:

![Date and usage](/images/posts/aws/dynamodb-reservations/spreadsheet-01-date-and-conso.png)

INFO: I only reproduce here twelve rows corresponding to twelve hours, but consider that there are actually 168 rows in my spreadsheet: one row per hour, 24 hours per day, for 7 days. Also, the values used for this article are all simulated, so as not to share sensitive information, but they scrupulously respect the shape of our traffic and consumption wave.

The next step is to integrate the cost of these WCUs. Easy, we multiply the number of WCUs by the cost of a WCU in Paris, i.e. $0,000772. And the sum of the cost of each line gives us the total cost, without reservation:

![Costs, without any reservation](/images/posts/aws/dynamodb-reservations/spreadsheet-02-cost-without-reservation.png)

### The calculations, on an assumption

Now, let's assume, for the example, that we book 25,000 WCUs:

 * The upfront, each hour, is therefore $5.07991.
 * And, each hour, we also have to pay $3,82500 for this capacity, since the upfront is only partial.

In addition:

 * On some hours, those where we consume less than 25,000 WCU, we will not pay anything extra.
 * On the other hand, in other hours, when we consume more than 25,000 WCU, we will have to pay a supplement, at the full provisioned rate.

By adding these data, we obtain a different hourly cost, often lower than the one determined above. And, therefore, we get a lower total cost as well:

![Costs, with reservations](/images/posts/aws/dynamodb-reservations/spreadsheet-03-cout-including-reservations.png)

With this hypothesis of 25,000 WCU reservation, over these twelve hours, we would pay 135 dollars instead of 229 dollars without reservation. We will then realize 40.96% savings!

### The calculations, until we find the right value

Of course, during the hours when we consume less than 25,000 WCU, we are wasting capacity: we are paying for it, without using it.

![Wasted reservations](/images/posts/aws/dynamodb-reservations/spreadsheet-04-waste.png)

The goal of the game is to find the right number of WCUs to reserve: we want to reduce the total cost as much as possible, maximizing the percentage of savings.

To do so, we try different values for the number of WCUs reserved, until we find the one that maximizes the percentage of savings:

![Maximizing savings percentages (table)](/images/posts/aws/dynamodb-reservations/spreadsheet-05-maximize-percentage-savings-table.png)

Or the same thing as a graph:

![Maximizing savings percentages (graph)](/images/posts/aws/dynamodb-reservations/spreadsheet-05-maximize-percentage-savings-graphic.png)

Here, over these twelve hours, the optimal would be to reserve 23,000 WCU.
In reality, we perform exactly the same calculation, we follow exactly this logic, on 168 lines of data, corresponding to a representative week.

### Make the calculations easier?

In the first year, we quickly wrote a script to collect the data from Cloudwatch and export it in CSV.

We still haven't, after three or four years now, written a program that would perform the calculations based on this data to come up with the right value for the number of WCUs or RCUs to reserve. Indeed, copying and pasting the data from the CSV to a spreadsheet only takes a few tens of seconds, we reuse the same one year after year, and its visual aspect is appreciable...

Also, since our bookings last one year, we only do these calculations twice a year: we only make two bookings per year, so we don't spend too much time on it, while refining more often than once each year. Each time, the process takes us about two hours at a time, or one day per year in total... And the most time-consuming part is talking to our colleagues who are heavy DynamoDB users, and asking them "aren't you planning to reduce the consumption of your project over the coming year?".


## Finally, let's book!

We calculated how many WCUs and how many RCUs to book to achieve the best possible savings, under the conditions of the representative week we based our calculations on.

### A commitment: be careful...

A reservation commits us to pay for a year, whether or not we use the capacity we commit to. So it's always a good idea to take a moment to validate with our colleagues that they are not planning to use less DynamoDB in the near future. Of course, the answer is often partly "it depends", since consumption depends on new projects as well as on the traffic of our platforms, but if we can already anticipate the next planned optimizations, it's always a good thing.

In November 2022, we can only open DynamoDB reservations for one year if we work in the AWS Paris region. Other regions (us-east-1 for example) allow us to book for three years and make more substantial savings. On the other hand, would we be willing to commit to three years and lose a major advantage of The Cloud, its flexibility?

### Which account to book on?

[The documentation](https://aws.amazon.com/dynamodb/pricing/provisioned/) says (emphasis mine):

If you have multiple accounts linked with consolidated billing, reserved capacity units purchased either at the payer account level or linked account level are shared with all accounts connected to the payer account. Reserved capacity is applied first to the account that purchased it and then any unused capacity is applied to other linked accounts.

We have configured our AWS accounts to have a single payer account. We have chosen to make all our reservations in this account and they are applied to the child accounts without discrimination. This for DynamoDB but also for RDS, EC2, Elasticache...

### Reserve

To reserve, we go through the AWS DynamoDB Web console, positioning ourselves in the pay account and in the region where these reservations will be used.

It is on this screen that you can see how many WCUs and RCUs we have already reserved. Since we make several reservations during the year, the reservations already in progress are to be subtracted from the values calculated above!

![Reservations history](/images/posts/aws/dynamodb-reservations/ddb-reservations-history-CENSORED.png)

To create a new reservation, click on "Purchase reserved capacity" and fill in the form ;-)

**TODO A screenshot of the reservation creation screen, with an amount that corresponds to what we have pseudo-calculated above?**


## After booking, view the costs

Once the reservations are made, in AWS Cost Explorer, the upfront cost is clearly visible. It is charged at once on the day we opened the reservation:

![Cost Explorer, after reserving](/images/posts/aws/dynamodb-reservations/cost-explorer-after-reservation-01-CENSORED.png)

To have a "daily" view of WCU/RCU costs (reserved + provisioned in addition to reservations), remember to fill in "Show costs as: Amortized costs" to smooth the monthly price of reservations over all days of the month:

![Amortized view](/images/posts/aws/dynamodb-reservations/cost-explorer-after-reservation-02-amortized-CENSORED.png)

NOTE: Since reservations, which cover the bulk of our DynamoDB costs, are made on our payer account, the bulk of our DynamoDB costs go back to this account... And not to the tenant/environment accounts. Good luck tracking and allocating costs to projects and teams 💪


## Conclusion

We work a lot with DynamoDB, for several dozen microservices and face several types of infrastructure costs: on-demand reads/writes, provisioned reads/writes, storage, backups. In exchange for a loss of flexibility and through reservations that commit us for a year, AWS allows us to reduce the cost of provisioned reads/writes.

Determining how much to reserve, in the face of a constantly changing load, is not easy. We need to have a certain vision on the evolution of usage, over a year, and must accept to lose flexibility. And we need to find "the right values" to reserve for read and write capacity.

With three or four years of hindsight, by making reservations twice a year and by following the method detailed in this article, we realize savings of about 30% to 35% on our read and write capacity in provisioned mode. On our scale, this saving represents several tens of thousands of dollars per year, and we are therefore very profitable for the few hours we spend every six months!
