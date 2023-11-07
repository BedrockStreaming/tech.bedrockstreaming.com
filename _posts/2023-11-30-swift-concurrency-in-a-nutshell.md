---
layout: post
title: Swift Concurrency in a Nutshell
description: This article offers an overview of Swift's Concurrency, detailing its main features and principles.
author: d_petrilli 
tags: [swift, apple, xcode]
color: rgb(251,87,66) # this is Bedrock color here
---
As modern apps grow in complexity and features, the need for multitasking to enhance the user experience becomes evident. Whether processing large datasets or querying multiple systems over the network, concurrency is essential.

This article presents a concise, yet comprehensive overview of Swift's Concurrency, highlighting its key features and core concepts. Swift's approach to concurrency provides several benefits:

- Simplified code that's easier to reason about and maintain
- A noticeable reduction in bugs and performance issues
- Ensured app responsiveness

Before delving into Swift's concurrency paradigms,  let's familiarize ourselves with foundational terminology.

#### Concurrency

Concurrency is about structuring your code so that tasks can be executed independently. It provides mechanisms for synchronization, communication, and coordination between units of work to avoid race conditions and ensure proper execution. However, concurrency doesn't imply parallel execution; the actual mode of execution is determined separately.

Designing your code effectively for concurrency makes adding parallelism nearly free.

#### Parallelism

Parallelism is the simultaneous execution of tasks across multiple processing units, guaranteeing genuine concurrent progression of operations. It's a specific form of concurrency where tasks are actually executed at the same time.

#### Structured Concurrency

Traditionally, developers had to manually manage `threads`, `locks`, and `callbacks`, leading to code that is difficult to manage and error prone. Even with a lot of discipline, it was really hard to get right as the cognitive load was so high.

**Structured concurrency** is a programming paradigm providing a higher level of abstraction, allowing you to manage concurrency in a structured and organized way. It simplifies the task management and their dependencies, making it easier to write correct and efficient concurrent code.

## Swift Concurrency

One prime objective of Swift is safety, by removing **undefined behaviors** such as `null pointer`, array `out-of-bounds`, and `integer overflows`. Until recently, multithreading remained a weak spot in Swift's safety features. Developers had to rely on [Grand Central Dispatch](https://developer.apple.com/documentation/DISPATCH), which wasn't inherently designed to help with concurrency-related pitfalls like [thread explosion](https://tclementdev.com/posts/what_went_wrong_with_the_libdispatch.html).

**Swift Concurrency** fills this gap, enhancing the language's overall safety by integrating the **Task** abstraction from Structured Concurrency, the **async/await** pattern and **Actors** for data isolation.

### Task

With Swift Concurrency, Tasks become the primary unit of work and offer three core functionalities:

- Carry scheduling information such as priority
- Act as handles for task management
- Hold user-defined and task-local data

These attributes make tasks the cornerstone that guides the execution model in running, prioritizing, and suspending or canceling jobs. **Every asynchronous function operates within a task**. Tasks also serve as the entry point for synchronous functions to execute asynchronous code.

#### Child Tasks

A child task is a task spawned by another task, known as the parent task. Child tasks inherit some properties from their parent, such as priority levels, but are their own individual units of work that can be scheduled independently. One important characteristic of child tasks is their lifetime is tied to their parent task; if the parent task is cancelled, all its child tasks are also cancelled. This ensures a structured way to manage and reason about concurrent tasks in your code. However, cancellations do not propagate upward, requiring parent tasks to manually check the status of their child tasks.

Child Tasks are created using **Task Groups** as we will see later.

### async / await

The `async`/`await` pattern simplifies asynchronous code development, allowing a sequential-like structure, akin to traditional synchronous functions.

Use the `async` keyword to mark functions that perform asynchronous work.

```swift
func performRemoteOperation(_ url: URL) async throws -> ResultType
```

The `await` keyword indicates potential **suspension points** in your code, which are necessary for running `async` functions. These markers also offer developers insight into the behavior and control flow of asynchronous operations. At these suspension points, the system can pause the current task to await the completion of an asynchronous operation.

```swift
func processRemoteData() async throws -> Resource {
  let data = try await performRemoteOperation() // waiting for performRemoteOperation() to complete
  let resource = await process(data)
  return resource
}
```

#### Error propagation

As you may have noticed in the previous examples, Swift's concurrency model seamlessly integrates with the language's native **error-handling mechanism**. This brings several advantages over the old completion-based concurrency:

- **Clarity:** Errors are propagated in a way that is consistent with how they are handled in synchronous Swift code. This means you don't have to learn a new error-handling paradigm when moving to concurrent code.
- **Safety:** Because errors can be propagated and caught, you can handle exceptional conditions gracefully, making your concurrent code more robust.
- **Maintainability:** With explicit error types and propagation, debugging and maintaining concurrent code becomes easier. You can clearly understand what types of errors your asynchronous functions can throw and handle them appropriately.

### Actors

Swift's **Structured Concurrency** is designed to address data races in concurrency for functions and closures. However, working concurrently usually involve dealing with **shared mutable state**, requiring tedious manual synchronization. 

To address this, Swift introduces **Actors**, a new **reference type** designed to encapsulate states within a specific concurrency domain, ensuring **data isolation** and **thread-safe** operations. Actors not only enhances safety and efficiency but also align with Swift's established patterns and features. 

To create an Actor, just use the keyword `actor`.

```swift
actor MessageThread {
    let playerTag: String
    var messages: [String]

     init(playerTag: String, previousMessages: [String]) {
        self.playerTag = playerTag
        self.messages = previousMessages
    }
}
```

Actors are similar to `class`, the main difference is that they protect their mutable data from data races by implementing **Actor Isolation**.

#### Actor Isolation

Actor Isolation enforces that any mutable properties managed by an actor can only be modified using `self`.

```swift
extension MessageThread {
    func send(_ message: String, to other: MessageThread) {}
        messages.append(message)
        other.messages.append(message) ... // error: trying to access another actor mutable property
        print(other.playerTag) // works fine as read only
    }
}
```

In the example above, the compiler complains when trying to modify the mutable property of another actor (cross-actor reference). However, accessing read-only properties poses no issue.

To address this, you can introduce another function allowing the other `MessageThread` actor to modify its own state.

```swift
extension MessageThread {
    func send(_ message: String, to other: MessageThread) async {
        messages.append(message)
        await other.receive(message)
    }
    
    func receive(_ message: String) {
        messages.append(message)
    } 
}
```

With these modifications:

1. The `send` function is now `async`, because of the `await` suspension point required to call the `receive` function in the other actor's asynchronous context.
2. While the `receive` function isn't explicitly marked as `async` (since it doesn't have suspension points and operates synchronously), actor isolation in Swift ensures functions behave as implicitly `async` when invoked from outside their own actor's context.

**Actors** ensure safe execution by maintaining their own dedicated serial **executor** internally. Messages sent to an actor are termed **partial tasks**. While processing these tasks, the order of their execution is not strictly guaranteed, as priorities of partial tasks influence the sequence in which they are tackled.

Lastly, you can do a cross-actor reference on a mutable property with an asynchronous call as long as it's read only.

```swift
func getMessages(thread: MessageThread) async {
  print(await thread.messages) // works
}
```

#### Sendable

Finally, to make Actors truly isolated we need to prevent cross-actor references from inadvertently sharing mutable state. The `Sendable` protocol was introduced to ensure that types shared across actor boundaries don't introduce data races. This protocol doesn't provide or dictate specific code behavior, but is leveraged by the compiler to ensure the safety of the concurrent code.

Here are types that can conform to `Sendable` (some implicitely do):

- Value types
- Actors
- `final` classes with immutable and sendable properties (and without superclass).
- Functions and closures when using the `@Sendable` attribute.

For a detailed explanation, please refer to the official [Apple documentation](https://developer.apple.com/documentation/swift/sendable).

#### Global Actor

Global actors are Actors providing a way to extend actor isolation to **global and static variables**, safeguarding them from concurrent access issues. Global actor can be referenced from anywhere in the program. A common global actor is the **MainActor** which allows you to execute your code on the main thread.

## In Practice

Theory covered, let's dive into practical use-cases.

### Call Async Functions Sequentially

While calling functions sequentially is straightforward in synchronous code, achieving the same in asynchronous code used to be cumbersome, often leading to the [Pyramid of doom](https://github.com/apple/swift-evolution/blob/main/proposals/0296-async-await.md#problem-1-pyramid-of-doom). Swift's concurrency model radically simplifies this by using the `async/await` paradigm. 

```swift
func fetchInfo() async throws -> UserInfo {...}
func fetchImg() async -> ProfileImage {...}
func fetchAct() async -> UserActivity {...}
func saveDB(_ info: UserInfo, _ img: ProfileImage, _ act: UserActivity) async throws {...}

func backupUserProfile() async throws {
    let info = try await fetchInfo()
    let img = await fetchImg()
    let act = await fetchAct()
    try await saveDB(info, img, act)
}
```

The use of `await` ensures each async function completes before the next starts. This sequential execution offers the readability of synchronous code while retaining the benefits of asynchronicity.

### Call Async Functions in Parallel

When async functions are independent, running them in parallel can save time.  `async let` allows you to achieve this with minimal code changes. Consider the previous example, modified to execute tasks concurrently:

```swift
func backupUserProfile() async throws {
    async let info = try fetchInfo()
    async let img = fetchImg()
    async let act = fetchAct()
    try await saveDB(info, img, act) // Await the results of async let tasks
}
```

`async let` spawns child tasks, sets placeholders on the variables, and allows the code to continue running until it needs the results, which are obtained using `await` at the end of the function.

### Call Async Functions from a Synchronous Function

`Task` serves as a bridge between synchronous and asynchronous code, enabling you to use async-await without requiring the entire function chain to be asynchronous. 

```swift
func onSavePressed() {
  Task {
    do {
      try await backupUserProfile()
    } catch {
      print("Error backing up profile: \(error.localizedDescription)")
    }
  }
}
```

An alternative is [Task.detached](https://developer.apple.com/documentation/swift/task/detached(priority:operation:)-8a4p6). This creates a new top-level task and decouples it from its originating context, allowing it to operate on a different Actor and with a different priority. A typical scenario involves initiating a task from the main thread to execute it on a different thread.

#### Terminology: Unstructured Concurrency

Creating a standalone `Task` is known as an **Unstructured Task**, as it lacks both a parent task and child tasks.

Unstructured Tasks are useful for:

- Calling a task from a non-async context
- Tasks that must persist beyond a specific scope


Note: Swift's use of the terms **Structured** and **Unstructured Concurrency** relates only to the hierarchy of Tasks and should not be confused with the broader concept of [Structured Concurrency](#structured-concurrency) described in the introduction.

Quoting the [swift documentation](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/#Tasks-and-Task-Groups). 

> **Structured concurrency**: Tasks arranged in a hierarchy. Each task in a task group has the same parent task, and each task can have child tasks. Although you take on some of the responsibility for correctness, the explicit parent-child relationships between tasks let Swift handle some behaviors like propagating cancellation for you, and lets Swift detect some errors at compile time.
>
> **Unstructured concurrency**: Unlike tasks that are part of a task group, an *unstructured task* doesn’t have a parent task. You have complete flexibility to manage unstructured tasks in whatever way your program needs, but you’re also completely responsible for their correctness.

### Parallel Processing with Task Groups

While `async let` may suffice for handling a limited number of tasks, Task Groups are recommended when a structured approach to parallelism is desired. Here's an example that employs Task Groups along with an accumulator to safely process an array of data in parallel.

```swift
let processedData = await withTaskGroup(of: Data.self, returning: [Data].self) { taskGroup in 	
    // Create a new Task within the Task Group for each item   
    for item in items {
        taskGroup.addTask(priority: .background) { // Create a new Task within the Task Group
            await process(item)
        }
    }

    var allData: [Data] = []
    // Asynchronously collect the task results as they complete
    for await result in taskGroup {
        allData.append(result)
    }

    return allData
}
```

This code initializes a Task Group and spawns a child task for each item with `.background` priority. Then an [AsyncSequence](https://developer.apple.com/documentation/swift/asyncsequence) `for await` loop asynchronously collects and stores the task results in the `allData` accumulator as they complete.

#### Cooperative Cancellation

To enable cancellation within Task Groups, tasks must be built for **Cooperative Cancellation**, which means the task periodically checks whether it should terminate early. Two methods can be used to check if a task has been cancelled:

1. `try Task.checkCancellation()` throws an error if the current Task is cancelled..

2. `if Task.isCancelled { break }` returns true if the Task is cancelled. Note that this approach might produce partial outputs, which should be documented.

```swift
 taskGroup.addTask(priority: .background) {
   if Task.isCancelled { return nil } // Return empty or default Data
   await process(item)
 }
```

### Reference and Cancel a Task

Until now, we've only used tasks for running isolated asynchronous operations. However, there are scenarios where maintaining a task reference for potential cancellation is beneficial, as shown in the following static sales dashboard example.

```swift
class SalesDataViewController: UIViewController {
    private var processingTask: Task<Void, Never>?

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        guard processingTask == nil else { return }

        processingTask = Task {
            do {
                let rawData = try await fetchSales()
              	let chartData = await process(rawData)
                await showChartData(chartData)
            } catch {
                handleError(error)
            }

            processingTask = nil
        }
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        processingTask?.cancel()
				processingTask = nil
    }
}
```

In this `SalesDataViewController` class, we create and keep a reference to a new Task for fetching and processing sales data. If the user exits the view before the task completes, the task is canceled, preventing task accumulation during repeated view transitions.

### Convert completion based API to async functions with Continuation

Sometimes you encounter legacy APIs not designed to work with Swift's Concurrency model, often the case with Objective-C-based APIs. Swift offers a solution via [Continuation](https://developer.apple.com/documentation/swift/checkedcontinuation).

Continuation wraps old-style block-based code and adapts it for use in an async function. This enables you to return values or throw errors within that function. Here's how to apply this with HealthKit as an example:

```swift
import HealthKit

func getWorkouts() async throws -> [HKWorkout] {
  return try await withCheckedThrowingContinuation { continuation in
    let query = HKSampleQuery(
      sampleType: HKObjectType.workoutType(),
      predicate: nil,
      limit: HKObjectQueryNoLimit,
      sortDescriptors: nil) { query, results, error in

      if let error = error {
        continuation.resume(throwing: HealthError.myError)
      } else {
        guard let results = results as? [HKWorkout] else {
          continuation.resume(throwing: HealthError.wrongType)
          return
        }
        continuation.resume(returning: results)
      }
    }
    HKHealthStore().execute(query)
  }
}
```

### Executing Async Code on Main Thread with MainActor

You can use the `MainActor` to execute code on the main thread via three ways:

#### Annotate your code with `@MainActor`

Apply the `@MainActor` attribute to properties, functions and classes.

```swift
class MyClass {
  @MainActor var image: Data // Update occurs on the main thread
  
  @MainActor func updateUI() async {
    // this is now called on the main thread
  }
}

// class properties and functions are now run on the MainActor
@MainActor class MyClass {
  var image: Data
  
  func updateUI() async { }
}
```

#### Use `@MainActor` in Task closures

Incorporate `@MainActor` within a `Task` to switch its execution context to the main thread.

```swift 
Task { @MainActor in 
	// Code runs on the main thread
}
```

#### Use `MainActor.run`

Use `MainActor.run` within any `Task` or asynchronous function to force main-thread execution.

```swift
Task {
  let data = await fetchAndProcessData()
  await MainActor.run {
    // Executed on main thread
    await updateUI(with: data)
  }
}
```


## Tips and pitfalls

### Task Cheat sheet

For quick reference, here's a table taken from [Explore structured concurrency in Swift](https://developer.apple.com/videos/play/wwdc2021/10134/) WWDC session.

|                    | Launched by      | Launchable from  | Lifetime            | Cancellation       | Inherits from origin          |
|--------------------|:----------------:|:----------------:|:-------------------:|:-------------------:|:----------------------------:|
| **async-let tasks**| `async let x`    | async functions  | scoped to statement | automatic           | priority, task-local values  |
| **Group tasks**    | `group.async`    | `withTaskGroup`  | scoped to task group| automatic           | priority, task-local values  |
| **Unstructured tasks**| `Task`        | anywhere         | unscoped            | via `Task`          | priority, task-local values, actor|
| **Detached tasks** | `Task.detached`  | anywhere         | unscoped            | via `Task`          | nothing                      |

### Async Protocol Conformance

When defining a protocol with async functions, you can [conform to the protocol](https://github.com/apple/swift-evolution/blob/main/proposals/0296-async-await.md#protocol-conformance) by implementing a synchronous function too.

```swift
protocol MyProtocol {
  func processData() async
}

struct TypeA: MyProtocol {
  func processData() async
}

struct TypeB: MyProtocol {
  func processData() // also valid
}
```

### Reentrancy

In Swift concurrency, [Reentrancy](https://en.wikipedia.org/wiki/Reentrancy_(computing)) refers to the situation where a suspended block of code resumes execution at a later time. Upon resumption, the mutable state of your code is not guaranteed to remain the same as it was before suspension, posing potential risks of unintended side effects.

#### Task Suspension and Unowned References

In Swift's concurrency model, a `Task` strongly retains any reference to `self`, potentially extending the object's lifecycle unexpectedly, especially if tasks remain active after their parent objects have been deallocated. To mitigate this, developers often employ `weak self`. However, introducing a suspension point using `await` within a `Task` can reintroduce issues associated with `unowned` references.

```swift
class MyClass {
  unowned var dataStorage: DataStorage!
  
  func refreshData()  {
    Task { [weak self] in 
      guard let self else { return } // temporarily retains self
      
      let newData = loadDataFromDisk()
      self.dataStorage = newData // Safe
    }
  }
}
```

In this example, the code behaves as expected because it executes atomically. If `self` is available, it is temporarily retained, and `newData` is updated synchronously.

However, introducing a suspension point can lead to issues similar to those encountered when neglecting to check for a weak `self`.

```swift
class MyClass {
  unowned var dataStorage: DataStorage!
  
  func refreshData() {
    Task { [weak self] in 
    	guard let self else { return } // temporarily retains self
      
      let newData = await downloadData() // suspension point
      self.dataStorage = newData // random crash
    }
  }
}
```

Here, if the task suspends during the `await`, nothing prevents `dataStorage`'s owner from being deallocated. When the task resumes, attempting to access the `unowned` property can result in a fatal error since `dataStorage` is no longer in memory.

#### Actor Reentrancy

Actor Reentrancy is a complex behavior that occurs when an actor method makes an asynchronous call, and while waiting for that call to complete, the actor processes other tasks. This can lead to unexpected states within the actor due to interleaved execution of its methods.

```swift
actor Counter {
    var value = 0
  
    func increment() {
        value += 1
    }
  
    func process() async {
        increment()
     		print(value) // 1
        await doLonProcessing() // suspension point
        print(value) // Unpredictable output (1?)
    }
}
```

In this example, while `process()` is awaiting the completion of `doLongProcessing()`, there's an opportunity for another task to call `increment()`. This undermines the expectation that an actor's state remains consistent within a given method. So, the second `print(value)` may output an unpredictable result, illustrating the challenge of managing mutable state in an actor with reentrant behavior.

### Unintentional Task Inheritance

In Swift's concurrency model, child tasks inherit the properties of their parent tasks by default, including priority levels and task-local values. Lack of awareness about this behavior can lead to unexpected outcomes, particularly when generating Tasks through SwiftUI modifiers, as demonstrated below.

```swift
struct MyView: View {
  var body: some View {
    ...
  }
  .task {
    await fetchData()
  }
  
  func fetchData() async {
    Task {
      // Inherits properties (e.g., priority, executor) from the parent Task
      // The long job will execute on the main thread
      await longJob()
    }

    Task.detached(priority: .userInitiated) {
      // Unstructured Task: Does not inherit any properties from parent Task
      // The long job will execute outside the main thread
      await longJob()
    }
  }
}
```

## Conclusion

As we have seen, Swift Concurrency is a huge step forward in terms of safety and code maintainability. I hope you enjoyed reading this article and learned a few tricks. Dive in, experiment, and harness the power of Swift concurrency. Happy coding!

## Further Reading & References

- [How async/await works internally in Swift](https://swiftrocks.com/how-async-await-works-internally-in-swift)
- [The Bleeding Edge of Swift Concurrency](https://youtu.be/HqjqwW12wpw?si=zTonWzxAatpTYfKr)
- [Structured concurrency](https://github.com/apple/swift-evolution/blob/main/proposals/0304-structured-concurrency.md)
- [Async/await](https://github.com/apple/swift-evolution/blob/main/proposals/0296-async-await.md)
- [Async let](https://github.com/apple/swift-evolution/blob/main/proposals/0317-async-let.md)
- [Actors](https://github.com/apple/swift-evolution/blob/main/proposals/0306-actors.md)
- [Global Actors](https://github.com/apple/swift-evolution/blob/main/proposals/0316-global-actors.md)
- [Concurrency is not Parallelism](https://youtu.be/oV9rvDllKEg?si=kwXQULVlNNT3K6LS)
