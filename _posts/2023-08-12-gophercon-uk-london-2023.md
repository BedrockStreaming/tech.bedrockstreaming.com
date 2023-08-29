---
layout: post
title: "GopherCon UK 2023 highlights"
description: My highlights of GopherCon UK 2023
author: pa_bedu
tags: [conference, london, tech, golang, go]
color: rgb(251,87,66)
thumbnail: /images/posts/gopherconuk2023/IMG_6877.jpeg
---
Hello there! I'm Pierre-Alain, a senior back-end developer at Bedrock and I had the opportunity to go to London for the GopherCon UK.

I travelled by train from Lyon to London, TGV and Eurostar. Train journey not only aligned with my commitment to minimize my carbon footprint for this trip, but is also a enjoyable travel choice. While the cost was higher than taking a plane, I would like to thank Bedrock for enabling me to take this option.

![IMG_6877.jpeg](/images/posts/gopherconuk2023/IMG_6877.jpeg)

# What is GopherCon UK ?

GopherCon UK 2023 spans three days, commencing with a workshop day on August 16th, followed by two conference days featuring multiple tracks on August 17th and 18th. The event takes place at The Brewery, at Barbican, situated in the heart of the City of London.
Over 500 attendees, including delegates, speakers, and sponsors, come together for GopherCon UK. This event is all about sharing the latest in Go programming with lots of networking. Attendees can connect with international speakers and peers.

# Workshop day (Practical GO for developers)
It was a first time for me to attend a workshop at an event like GopherCon. As a new Gopher, my exposure to writing Go code had been limited. However, I was looking forward to it.

In the following lines, I'll be sharing the insights I gained during the workshop — knowledge I'm excited to share to both you and my colleagues:
- Because of some unicode characters, you should not use `len()` on a string in case you have emojis, hieroglyph or symbol (£世界). It is better to use `tf8.RuneCountInString()`

- use `fmt.Printf(...)` for debugging
	```go
	package main

	import "fmt"

	func main() {
		s := struct {
			E int
			A string
		}{1, "string"}

		fmt.Printf("%#v, %+v, (%T)", s, s, s)
		// output : struct { E int; A string }{E:1, A:"string"},
		//          {E:1 A:string},
		//          (struct { E int; A string })
	}
	```

- ``` `http://site.name` ```  gives a raw string which can be useful when you have slashes in your string, to avoid having to escape them.

- About concurency, I liked this image which gives an idea of computer latency compared to a human.
	<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Computer Latency at a Human Scale<br><br>Source: <a href="https://twitter.com/ProwessConsult?ref_src=twsrc%5Etfw">@ProwessConsult</a> (2017) <a href="https://t.co/5Uhw5nCzUJ">https://t.co/5Uhw5nCzUJ</a> <a href="https://t.co/YlVYnm3nGH">pic.twitter.com/YlVYnm3nGH</a></p>&mdash; Josh Jordan (@jordancurve) <a href="https://twitter.com/jordancurve/status/1108475342468120576?ref_src=twsrc%5Etfw">March 20, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- a well known bug also known as the _for-loop gotcha_ where the `i` in the loop is not incrementing correctly.
```go
	for i := 0; i < 5; i++ {
		go func() {
			fmt.Printf("gr:%d\n", i)
		}()

		//fix 1
		go func(n int) {
			fmt.Printf("gr:%d\n", n)
		}(i)

		// fix 2
		i := i
		go func() {
			fmt.Printf("gr:%d\n", i)
		}()
	}
```

- Goroutine channel tricks
> - send/receive will block until opposite operation (*)
>   - buffered channel of cap n has n non-blocking sends
> - receive from a closed channel will return the zero value without blocking
>  - you can use `val,ok := <- ch` as second left variable to know if value comes from channel or not
> - send or close to a closed channel will panic
> - send or receive on a nil channel will block forever...

- `doc.go` is used to add documentation to packages, example below:

	```go
	/*
	Package nope does nothing as Go package.

	...
	*/
	package nope
	```

- `example_test.go` on a package, gives example tests to other developers

```go
package nope_test

import (
  "fmt"

  "github.com/shipt/nlp"
)

func ExampleTokenize() {
  nothing := nope.SayNothing()
  fmt.Println(nothing)

  // Output:
  // "nothing"
}
```

- you can create a `testdata` folder to store fixtures which would be avoided by compiler

- we should use `testify/require`, `testify/mock` and `testify/suites` *evil laugh*

Workshop given by Miki Tebeka, Ardan Labs was really great and gave the opportunity to compare myself to what is expected from a new Gopher, and so far I would say I'm doing OK. I am now eager to tackle more projects in Go at Bedrock. \o/

# Day one

Upon arrival, attendees were greeted with a delightful British-style Gopher plush, serving as a warm and wonderful welcome gift.

<center>
	<img src="/images/posts/gopherconuk2023/IMG_6870.jpeg" alt="Gopher plush">
</center>

Then, I enjoyed a truly good breakfast (kudos to @Formal for the exceptional coffee baristas) and engaged in conversations with the sponsor booths positioned within the venue, and even entered their raffle giveaways.

## Scaling Coffee with Goroutines (workshop tutorial)

Sadie Freeman's enlightening tutorial walks us through the process of taking advantages from goroutines to achieve scalable codebase and platform effectively.

#### The coffee shop challenge

Imagine a coffee shop aiming to do:
- a lot of coffee
- for a lot of people
- as fast as possible

For a coffee to be considered complete, three essential actions were required:
- Accept payment
- Steam milk
- Make espresso

Each of these actions takes approximately 2 seconds to execute.

To break it down:
- Serving one customer requires 2 seconds per action, totaling 6 seconds.
- Serving three customers extends the total time to 18 seconds.

#### Scaling for Speed

Initial attempts to introduce goroutines seem straightforward, by merely appending "go" before a method:

```go
 go MakeCoffee()
```

However, for three customers, this results in a staggeringly brief 49 microseconds, practically an impossible feat. The solution wasn't as straightforward as it may seem.

#### Enter the `sync.WaitGroup`
```go
sync.WaitGroup()

defer wg.Done()

wg.Wait()
 ```

Nonetheless, even with this approach, we still find ourselves waiting for each coffee to complete before initiating the next one. Consequently, serving three customers still demands 6 seconds.

Optimization beckons; each action could potentially transform into its own goroutine. Ultimately, with this approach, serving three customers takes a mere 2 seconds, finally achieving efficient customer service.

#### Scaling for Load

Enter containerization! Deployment onto Kubernetes through Docker containers ensues. The coffee shop pods are allocated finite CPU and Memory resources.

Consider a scenario where 300 customers arrive simultaneously on our webservice. This influx of customers causes the pod to become memory-intensive, ultimately leading to an Out of Memory (OOM) kill.

But what happens when the challenge escalates to 3000 customers? This needs vertical scaling: allocating more resources. However, this approach can become prohibitively expensive.

Enter the pragmatic solution of horizontal scaling - opening more pods (coffee shops). With 10 pods, each handling 300 customers, accommodating 3000 customers in about 2 seconds becomes feasible.

While this tutorial doesn't delve into the topic, an intriguing possibility would be to split responsibilities in different pod(payment, milk, espresso) for further optimization and efficiency.

## The 7 Deadly Sins for Gophers

John Gregory provided invaluable insights into the pitfalls to avoid for Gophers, whether seasoned or new. Here's a condensed overview of the key takeaways:

### Lush
The urge to rush into production without due consideration. Concurrency might entice you with the "go" keyword, but remember:
> Use goroutines judiciously, only when necessary.

### Wrath
Substituting "panic" for proper error handling:
> "Using a wall to stop a car instead of the brakes."
>
> Embrace defensive coding practices.
>
> Reserved methods should be utilized outside user runtime; employ them at startup.

### Greed
The desire to future-proof everything:
> Avoid over-engineering; simplicity often prevails.

### Sloth
Focusing on "what" rather than "why" in comments:
> Enhance error handling with contextual information. Seek semantic context.
>
> Utilize `fmt.Errorf("this did not work: %w", err)` for enhanced error messages.

### Gluttony
Unnecessary reliance on frameworks:
> Beware of vulnerabilities.
>
> Begin with simplicity.
>
> Embrace libraries with robust support.

### Envy
Forcing patterns where they aren't required:
> Interfaces aren't always necessary.
>
> Explore "Effective Go" principles.

### Pride
Assuming you possess the ultimate knowledge:
> Avoid artificially restricting API access.

John Gregory's wisdom shines a light on the potential pitfalls Gophers may encounter. Steering clear of these seven deadly sins can lead to more effective and resilient Go programming practices.

---
### Social event with food and drinks (responsibly)
I (also) enjoyed video game, table tennis, a magician and a DJ !

---

# Day two

I started this second day of conferences by having a Cup of tea (with milk) to get myself in the shoes of an English Gopher :)

## State of the Go Nation!
Cameron Balahan, Product Manager of the Go team, took us on a journey through the past, present, and future of Go. He shared insights into the language's evolution, growth, and its roadmap ahead.

### Going Back in Time
- **2007:** Go's inception within Google.
- **2009:** The pivotal moment when Go was opensourced.
- **2012:** The groundbreaking release of Go 1.0, marking its maturity.

### The Stability of Go 1.0
Balahan emphasized the continuity of Go 1.0, ensuring backward compatibility with all Go 1.* versions.

### Refinement and Progress
- **2015:** Go's strides in version 1.5:
  - Advancements in the compiler.
  - Introduction of a new garbage collector.
  - Adoption of semi-annual releases.

### The Flourishing Ecosystem of 2018
- **2018:** Go's ecosystem flourished, introducing key enhancements:
  - Go modules with caching and checksum features.
  - A focus on creating a secure platform.

### Forever Go 1.*
Balahan said Go 2 "will never happen", as keeping Go 1 program working with all Go 1.* version is their aim from the start.

### Today's Triumphs
In the present:
- Go's user base has multiplied by four since 2018.
- High levels of user satisfaction persist among the Go community.

### The Path Ahead
Looking forward:
- Addressing the loop variable issue. (mostly done in Go 1.21)
- Enhancing onboarding experiences.
- Strengthening vulnerability management.

### A Bonus for the Dev Community
In the spirit of improving security, Balahan encourages developers to integrate the new `Govulncheck` [tool](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck#hdr-Usage) into their CI pipelines. This tool developed by Go team stands as a sentinel, safeguarding against potential vulnerabilities within Go packages.

## Efficient Debugging and Logging with OpenTelemetry in Go
In the past, our debugging approach was straightforward: Log everything, locally or remotely. However, the landscape has evolved, favoring a combination of logs, traces, and metrics to illuminate the path.

A quote I really liked:

> "Logs are for your future self, left by your past self :)"

While logs remain indispensable, their role can now be enhanced.

- **Absence of Request Context** - Log entries often contain detailed information about microservices, functions, or applications, yet they can fall short in providing the broader request context.

- **Scale Demands Complexity** - To grasp an application's normal functioning, collating and analyzing numerous log entries becomes vital. This can require extensive indexing and complex tools to achieve at scale.

- **Disparity Across Teams and Services** - Uniformity in logs isn't guaranteed across teams, adding complexity when attempting to link them cohesively.

**Enter Distributed Tracing**:
A game-changer in the debugging realm, distributed tracing offers a comprehensive view of a request's lifecycle. It stands as a potent tool to combat production issues effectively. With end-to-end visibility, distributed tracing is meant to level up your debugging power!
We, Bedrock, already been using distributed tracings for a while in our PHP codebase, which allow us to rapidly debug and understand problems in production when incidents happen ;) 

## The Hacker's Guide to JWT Security
JSON Web Tokens (JWTs) come with their own set of caveats that need to be carefully considered to ensure a robust security level.

### The Pronunciation Puzzle: How to Pronounce JWT?
Before we dive into the security aspects of JWTs, let's clarify a common query: how do you pronounce JWT? According to the standards outlined in RFC 7519, JWT is pronounced as "jot". So, the next time you discuss JWTs, remember it's neither three separate letters nor "JWT Token" as some say in France..., but a concise "jot".

### The Encoding vs. Encryption Distinction
One fundamental fact about JWTs is that they are designed for encoding, not encryption. This means that the data contained within a JWT is base64url encoded, which allows easy transmission between parties, but it's not encrypted in a way that prevents unauthorized access to the actual content.

#### 1. The "none" Algorithm
In scenarios where the backend fails to verify the algorithm before checking the claims within the JWT, an attacker can exploit this weakness and craft a forged token. This issue lies not just in the hands of the RFC specifications but also in implementation.

To address this concern, it's imperative to implement rigorous checks at the backend level. Verification of the algorithm should precede the verification of claims. This approach ensures that only tokens with valid algorithms are processed, mitigating the risk of unauthorized access.

#### 2. HS256: Password/Key Cracking Vulnerability
This algorithm employs a shared secret key for both encoding and decoding, making it susceptible to password or key cracking attacks. What's particularly concerning is that even a single compromised token can lead to offline attacks, where no communication with the server is necessary while craking.

To counter this threat, regularly update and rotate the secret keys, ensuring that even if one key is compromised, the potential damage is limited.

#### 3. Man in the Middle on Internal Networks
In a man-in-the-middle attack scenario, an attacker can intercept and manipulate JWTs exchanged within an unsecured network, potentially gaining unauthorized access.

To minimise this risk, it's recommended to adopt secure communication protocols such as HTTPS. Additionally, implementing strict network segmentation and proper access controls can minimize the attack surface within internal networks.

#### 4. XSS Vulnerabilities: Safeguarding Tokens
Storing JWTs in local storage, which can be accessed by scripts, worsen this risk to counter XSS threats: consider using cookies to store JWTs. Cookies are less susceptible to XSS attacks, as their content cannot be directly accessed by Javascript scripts.

By adopting this practice, the risk of token theft through XSS is substantially reduced.

To sum up, Bedrock already adapted these principles for a while, but nevertheless it was great to remind myself to think about security and vulnerabilities around JWTs. 

## How NOT to Write a Test in Go

Amir Malka stated that adhering to these practices elevates Go testing from trivial to masterful. Effective testing enhances code reliability and development predictability. Embracing these guidelines lays the foundation for successful software projects.

### Why Testing?
- Tests uncover bugs and validate code changes.
- Tests build confidence in code correctness.
- Tests serve as living documentation, illustrating code behavior.

### Key Testing Principles
1. **Fixture Placement:** Organize test fixtures in a dedicated `testdata` directory, avoided by compiler.
2. **Structured Tests:** Embrace table-driven tests for readability and comprehensive coverage.
3. **Parallelism:** Use caution with parallel tests to avoid unintended interactions.
4. **Test Suites:** Employ `testing.M` for related tests and control setup/teardown with `TestMain`.
5. **Categorization:** Use build tags or environment variables to categorize and skip tests.
6. **Concurrency Safety:** Detect data races with the `-race` flag during testing.
7. **Effective Mocking:** Benefit from embedded interfaces for accurate mocks.
8. **Randomizing Tests:** Introduce randomness with `-shuffle` flag to uncover hidden issues.
9. **Benchmarks:** Gauge code performance with `testing.B`, setup/teardown carefully.
10. **Test Automation:** Automate tests in CI pipelines to maintain consistent quality.
11. **Code Coverage:** Use `-cover` flag to monitor and improve test coverage.

Coming from PHP, I never thought about parallelism or Benchmarks while writing tests on a daily basis. All of these testing principles will help me and hopefully my team (when they would have read this post!) to write test the "Go way".

## Conclusion
In closing, my journey through GopherCon UK 2023 has been as exciting as tiring for my first Golang Conference. I thank a lot Bedrock for affording me the opportunity to partake in this experience. Participating in this event helped me to dive deeper into the world of Go and will enhance my professional growth.

To the organizers of GopherCon UK 2023, your planning and dedication have resulted in a seamless event. Every aspect has been orchestrated to perfection. Congrats to you ! Also, thanks to the sponsors, for continuing to take part in these events during financially hard times.

As I return to my daily routine armed with the knowledge gained, I am excited to share these learnings with my colleagues and hope to contribute even more effectively to my team. GopherCon UK 2023 has not only expanded my knowledge but has also strengthened my enthusiasm for Go.

GopherCon UK 2024, hopefully, here I come (with other of my colleagues) ! Cheers!
