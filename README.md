# JavaScript Classes & Custom Error Handling

### OOP Basics: Classes, Constructors, Inheritance, super()

---

## Table of Contents

1. [What is OOP?](#1-what-is-oop)
2. [What is a Class?](#2-what-is-a-class)
3. [Constructor Function](#3-constructor-function)
4. [The 'new' Keyword](#4-the-new-keyword)
5. [The 'this' Keyword](#5-the-this-keyword)
6. [Inheritance (extends)](#6-inheritance-extends)
7. [The super() Function](#7-the-super-function)
8. [Parent and Child Classes](#8-parent-and-child-classes)
9. [Error Class](#9-error-class)
10. [Custom Error Class (AppError)](#10-custom-error-class-apperror)
11. [Your Complete Code Explained](#11-your-complete-code-explained)

---

## 1. What is OOP?

### OOP = Object-Oriented Programming

**Simple Definition:**
OOP is a way to organize code by grouping related data and functions together into "objects."

**Think of it like this:**

```
Real world: A car has properties (color, speed) and actions (start, stop)
OOP:        An object has properties and methods that work together
```

---

### Why Use OOP?

```
✅ Organize code better
✅ Reuse code easily
✅ Create multiple similar objects
✅ Easier to maintain
✅ Model real-world things
```

---

### Example: Without OOP

```javascript
// Creating user 1
let user1Name = "Alice";
let user1Age = 25;
let user1Email = "alice@example.com";

// Creating user 2
let user2Name = "Bob";
let user2Age = 30;
let user2Email = "bob@example.com";

// Messy! Hard to manage!
```

---

### Example: With OOP

```javascript
// Create a blueprint (class)
class User {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
}

// Create objects easily
let user1 = new User("Alice", 25, "alice@example.com");
let user2 = new User("Bob", 30, "bob@example.com");

// Clean and organized!
```

---

## 2. What is a Class?

### Definition

**A class is a blueprint/template for creating objects.**

Think of it like:

- **Class** = Cookie cutter (template)
- **Object** = Actual cookies (created from template)

---

### Class Syntax

```javascript
class ClassName {
  // Properties and methods go here
}
```

---

### Simple Example

```javascript
// Define a class (blueprint)
class Car {
  // Properties
  color = "red";
  speed = 0;

  // Methods (functions)
  start() {
    console.log("Car started");
  }

  stop() {
    console.log("Car stopped");
  }
}

// Create objects from the class
let myCar = new Car();
let yourCar = new Car();

myCar.start(); // "Car started"
yourCar.stop(); // "Car stopped"
```

---

### Class vs Object

```
Class:
────────────────────────────
Blueprint for creating cars
Defines what properties a car has
Defines what actions a car can do

Object:
────────────────────────────
Actual car created from blueprint
Has specific values for properties
Can perform the defined actions
```

---

## 3. Constructor Function

### What is a Constructor?

**A constructor is a special function that runs automatically when you create a new object.**

**Purpose:**

- Initialize object properties
- Set up initial values
- Run setup code

---

### Syntax

```javascript
class ClassName {
  constructor(parameters) {
    // Setup code here
    // Runs when 'new ClassName()' is called
  }
}
```

---

### Simple Example

```javascript
class User {
  constructor(name, age) {
    console.log("Constructor called!");
    this.name = name;
    this.age = age;
  }
}

let user1 = new User("Alice", 25);
// Console: "Constructor called!"
// user1 = { name: "Alice", age: 25 }
```

---

### How Constructor Works

```
Step 1: You write: new User("Alice", 25)
        ↓
Step 2: JavaScript creates empty object: {}
        ↓
Step 3: Constructor runs automatically
        ↓
Step 4: Constructor sets properties:
        this.name = "Alice"
        this.age = 25
        ↓
Step 5: Object is ready:
        { name: "Alice", age: 25 }
```

---

### Constructor Without Parameters

```javascript
class Counter {
  constructor() {
    console.log("Counter created!");
    this.count = 0;
  }
}

let c = new Counter();
// Console: "Counter created!"
// c = { count: 0 }
```

---

### Constructor With Parameters

```javascript
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.inStock = true; // Default value
  }
}

let laptop = new Product("Laptop", 50000);
// laptop = { name: "Laptop", price: 50000, inStock: true }
```

---

### Multiple Objects from Same Class

```javascript
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

let book1 = new Book("Harry Potter", "J.K. Rowling");
let book2 = new Book("Lord of the Rings", "Tolkien");
let book3 = new Book("1984", "Orwell");

// Three different objects, same blueprint
```

---

## 4. The 'new' Keyword

### What Does 'new' Do?

**The 'new' keyword creates a new object from a class.**

---

### Syntax

```javascript
let objectName = new ClassName(arguments);
```

---

### What Happens When You Use 'new'

```javascript
let user = new User("Alice", 25);

// Behind the scenes:
// 1. Creates empty object: {}
// 2. Sets 'this' to point to that object
// 3. Runs constructor function
// 4. Returns the object
```

---

### Visual Flow

```
Code: let user = new User("Alice", 25);

Step 1: new keyword triggered
        ↓
Step 2: Empty object created
        {}
        ↓
Step 3: Constructor runs
        this.name = "Alice"
        this.age = 25
        ↓
Step 4: Object populated
        { name: "Alice", age: 25 }
        ↓
Step 5: Object returned and assigned to 'user'
```

---

### Example

```javascript
class Car {
  constructor(brand, color) {
    this.brand = brand;
    this.color = color;
  }
}

// Using 'new' to create objects
let car1 = new Car("Toyota", "Red");
let car2 = new Car("Honda", "Blue");
let car3 = new Car("Ford", "Black");

console.log(car1); // { brand: "Toyota", color: "Red" }
console.log(car2); // { brand: "Honda", color: "Blue" }
console.log(car3); // { brand: "Ford", color: "Black" }
```

---

### Without 'new' (Wrong!)

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}

let user = User("Alice"); // ❌ Error! Must use 'new'
let user = new User("Alice"); // ✅ Correct
```

---

## 5. The 'this' Keyword

### What is 'this'?

**'this' refers to the current object being created.**

---

### Simple Explanation

```
When you create a new object:
let user = new User("Alice", 25);

Inside the constructor:
'this' = the new object being created
```

---

### Example

```javascript
class User {
  constructor(name, age) {
    this.name = name; // 'this' = current object
    this.age = age;
  }
}

let user1 = new User("Alice", 25);
// Inside constructor: 'this' refers to user1 object

let user2 = new User("Bob", 30);
// Inside constructor: 'this' refers to user2 object
```

---

### Visual: How 'this' Works

```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

// Creating user1:
let user1 = new User("Alice", 25);

// Step 1: Empty object created
{}

// Step 2: 'this' points to that object
this = {}

// Step 3: Properties added via 'this'
this.name = "Alice"  →  { name: "Alice" }
this.age = 25        →  { name: "Alice", age: 25 }

// Result:
user1 = { name: "Alice", age: 25 }
```

---

### 'this' in Different Objects

```javascript
class Product {
  constructor(name, price) {
    console.log("this =", this);
    this.name = name;
    this.price = price;
  }
}

let p1 = new Product("Laptop", 50000);
// Console: this = {}
// Console: this = { name: "Laptop", price: 50000 }

let p2 = new Product("Phone", 20000);
// Console: this = {}
// Console: this = { name: "Phone", price: 20000 }

// 'this' is different for each object!
```

---

## 6. Inheritance (extends)

### What is Inheritance?

**Inheritance allows one class to inherit properties and methods from another class.**

**Think of it like:**

- Parent gives traits to child
- Child gets all parent's features
- Child can add its own features too

---

### Syntax

```javascript
class ParentClass {
  // Parent properties and methods
}

class ChildClass extends ParentClass {
  // Child gets everything from Parent
  // Plus child's own properties and methods
}
```

---

### Simple Example

```javascript
// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(this.name + " is eating");
  }
}

// Child class inherits from Animal
class Dog extends Animal {
  bark() {
    console.log(this.name + " says Woof!");
  }
}

let dog = new Dog("Buddy");
dog.eat(); // "Buddy is eating" (from Animal)
dog.bark(); // "Buddy says Woof!" (from Dog)
```

---

### Visual: Inheritance

```
Parent Class: Animal
┌─────────────────────────┐
│ Properties:             │
│ - name                  │
│                         │
│ Methods:                │
│ - eat()                 │
└─────────────────────────┘
            ↓ extends
Child Class: Dog
┌─────────────────────────┐
│ Inherited:              │
│ - name (from Animal)    │
│ - eat() (from Animal)   │
│                         │
│ Own:                    │
│ - bark()                │
└─────────────────────────┘
```

---

### Real-World Example

```javascript
// Parent: Vehicle
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }

  start() {
    console.log(this.brand + " started");
  }
}

// Child: Car extends Vehicle
class Car extends Vehicle {
  constructor(brand, doors) {
    super(brand); // Call parent constructor
    this.doors = doors;
  }

  honk() {
    console.log("Beep beep!");
  }
}

let myCar = new Car("Toyota", 4);
myCar.start(); // "Toyota started" (from Vehicle)
myCar.honk(); // "Beep beep!" (from Car)
console.log(myCar.doors); // 4 (from Car)
console.log(myCar.brand); // "Toyota" (from Vehicle)
```

---

## 7. The super() Function

### What is super()?

**super() calls the constructor of the parent class.**

**Rule:** When using `extends`, you MUST call `super()` before using `this`.

---

### Syntax

```javascript
class ChildClass extends ParentClass {
  constructor(childParams, parentParams) {
    super(parentParams); // Call parent constructor FIRST
    this.childProperty = value;
  }
}
```

---

### Why super()?

```
Problem: Child needs parent's initialization
Solution: Call super() to run parent's constructor
```

---

### Example Without Parameters

```javascript
class Animal {
  constructor() {
    console.log("Animal created");
    this.alive = true;
  }
}

class Dog extends Animal {
  constructor() {
    super(); // Calls Animal constructor
    console.log("Dog created");
    this.legs = 4;
  }
}

let dog = new Dog();
// Console: "Animal created"
// Console: "Dog created"
// dog = { alive: true, legs: 4 }
```

---

### Example With Parameters

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name); // Pass name to Person constructor
    this.grade = grade;
  }
}

let student = new Student("Alice", "A");
// student = { name: "Alice", grade: "A" }
```

---

### super() Must Be First

```javascript
class Parent {
  constructor(x) {
    this.x = x;
  }
}

class Child extends Parent {
  constructor(x, y) {
    // ❌ WRONG: Cannot use 'this' before super()
    // this.y = y;
    // super(x);

    // ✅ CORRECT: super() first
    super(x);
    this.y = y;
  }
}
```

---

### Visual: super() Flow

```javascript
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super(brand); // Calls Vehicle constructor
    this.model = model;
  }
}

let car = new Car("Toyota", "Camry");

// Execution flow:
// 1. Car constructor starts
// 2. super("Toyota") calls Vehicle constructor
//    → Vehicle sets: this.brand = "Toyota"
// 3. Back to Car constructor
//    → Car sets: this.model = "Camry"
// 4. Result: { brand: "Toyota", model: "Camry" }
```

---

## 8. Parent and Child Classes

### Terminology

```
Parent Class  = Super Class = Base Class
Child Class   = Derived Class = Sub Class
```

---

### Relationship

```
Parent gives → Child receives
Parent has   → Child inherits
```

---

### Example

```javascript
//! Parent class (Super class, Base class)
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(this.name + " is eating");
  }
}

//! Child class (Derived class, Sub class)
class Cat extends Animal {
  meow() {
    console.log(this.name + " says Meow!");
  }
}

let cat = new Cat("Whiskers");
cat.eat(); // From Animal (parent)
cat.meow(); // From Cat (child)
```

---

### What Child Gets from Parent

```
✅ All properties
✅ All methods
✅ Can add own properties
✅ Can add own methods
✅ Can override parent methods
```

---

### Multiple Levels of Inheritance

```javascript
// Grandparent
class LivingThing {
  constructor() {
    this.alive = true;
  }
}

// Parent
class Animal extends LivingThing {
  constructor(name) {
    super();
    this.name = name;
  }
}

// Child
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}

let dog = new Dog("Buddy", "Golden Retriever");
// dog = {
//   alive: true,        // from LivingThing
//   name: "Buddy",      // from Animal
//   breed: "Golden..."  // from Dog
// }
```

---

## 9. Error Class

### What is the Error Class?

**Error is a built-in JavaScript class for representing errors.**

---

### Basic Error

```javascript
// Create an error
let error = new Error("Something went wrong");

console.log(error.message); // "Something went wrong"
console.log(error.name); // "Error"
console.log(error.stack); // Stack trace
```

---

### Throwing Errors

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  let result = divide(10, 0);
} catch (error) {
  console.log(error.message); // "Cannot divide by zero"
}
```

---

### Error Properties

```javascript
let error = new Error("Custom error message");

error.message; // "Custom error message"
error.name; // "Error"
error.stack; // Stack trace (where error occurred)
```

---

### Built-in Error Types

```javascript
new Error("Generic error");
new TypeError("Wrong type");
new ReferenceError("Variable not found");
new SyntaxError("Syntax mistake");
new RangeError("Number out of range");
```

---

## 10. Custom Error Class (AppError)

### Why Create Custom Error?

**Built-in Error doesn't have HTTP status codes. We need custom errors for APIs.**

---

### AppError Class

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(); // Call Error constructor
    this.message = message;
    this.statusCode = statusCode;
  }
}
```

---

### What This Does

```
Extends Error:
- AppError inherits from Error class
- Gets all Error features (stack trace, etc.)

Adds statusCode:
- HTTP status code (404, 500, etc.)
- Not available in regular Error
```

---

### Usage Examples

```javascript
// Create custom errors
let e1 = new AppError("Invalid Credentials", 401);
let e2 = new AppError("Not Found", 404);
let e3 = new AppError("Internal Server Error", 500);

console.log(e1.message); // "Invalid Credentials"
console.log(e1.statusCode); // 401

console.log(e2.message); // "Not Found"
console.log(e2.statusCode); // 404
```

---

### Using in Express

```javascript
// Controller
app.post("/login", (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    // Create custom error
    let error = new AppError("Email and password required", 400);
    return next(error); // Pass to error handler
  }

  // Check credentials
  if (password !== "correct") {
    let error = new AppError("Invalid credentials", 401);
    return next(error);
  }

  res.send("Login successful");
});

// Error handler middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
});
```

---

## 11. Your Complete Code Explained

### Your Code

```javascript
class AppError extends Error {
  //! this is a special function which runs every time a object is created (new)
  constructor(message, statusCode) {
    super(); // first statement should be super()
    console.log("called");
    //? this will assign all the variables
    this.message = message;
    this.statusCode = statusCode;
  }
}

// let e1 = new AppError("Invalid Credentials", 404);
// let e2 = new AppError("Internal Server Error", 500);

//! Error is my parent class or super class
//! AppError is my derived class or child class

export default AppError;
```

---

### Line-by-Line Breakdown

**Line 1:**

```javascript
class AppError extends Error {
```

- Declare class named `AppError`
- `extends Error` means AppError inherits from Error class
- AppError is child, Error is parent

---

**Line 2-3:**

```javascript
constructor(message, statusCode) {
```

- Constructor function (runs when `new AppError()` is called)
- Takes 2 parameters: `message` and `statusCode`

---

**Line 4:**

```javascript
super();
```

- Calls Error (parent) constructor
- **Must be first** before using `this`
- Initializes parent class

---

**Line 5:**

```javascript
console.log("called");
```

- Runs every time new AppError is created
- Helpful for debugging

---

**Line 6-7:**

```javascript
this.message = message;
this.statusCode = statusCode;
```

- Assign message to this error object
- Assign statusCode to this error object
- `this` = the current AppError object being created

---

### Complete Flow Example

```javascript
let e1 = new AppError("Invalid Credentials", 404);

// Step-by-step execution:

// 1. 'new' keyword creates empty object
{}

// 2. Constructor starts
constructor("Invalid Credentials", 404) {

// 3. super() calls Error constructor
super();  // Initializes parent Error class

// 4. console.log runs
console.log("called");  // Console: "called"

// 5. Assign message
this.message = "Invalid Credentials"

// 6. Assign statusCode
this.statusCode = 404

// 7. Constructor ends
}

// 8. Final object:
e1 = {
    message: "Invalid Credentials",
    statusCode: 404,
    stack: "Error stack trace...",  // from Error parent
    name: "Error"                   // from Error parent
}
```

---

### Multiple Instances

```javascript
let e1 = new AppError("Invalid Credentials", 401);
// Console: "called"
// e1 = { message: "Invalid Credentials", statusCode: 401 }

let e2 = new AppError("Not Found", 404);
// Console: "called"
// e2 = { message: "Not Found", statusCode: 404 }

let e3 = new AppError("Server Error", 500);
// Console: "called"
// e3 = { message: "Server Error", statusCode: 500 }
```

---

### Why This is Useful

```
Standard Error:
────────────────────────────────────────
new Error("Something wrong")
  ↓
{ message: "Something wrong" }
❌ No status code for HTTP responses


Custom AppError:
────────────────────────────────────────
new AppError("Not found", 404)
  ↓
{ message: "Not found", statusCode: 404 }
✅ Has status code for API responses
```

---

### Real API Usage

```javascript
// routes/authRoutes.js
import AppError from "./AppError.js";

app.post("/register", async (req, res, next) => {
  try {
    let { email, password } = req.body;

    // Validation
    if (!email) {
      throw new AppError("Email is required", 400);
    }

    // Check if user exists
    let userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError("User already exists", 409);
    }

    // Create user
    let user = await User.create({ email, password });
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// Error handler middleware
app.use((err, req, res, next) => {
  // If it's AppError, use its statusCode
  let statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    error: err,
  });
});
```

---

## Summary

### Key Concepts

**Class:**

- Blueprint for creating objects
- Defines properties and methods

**Constructor:**

- Special function that runs when `new` is used
- Initializes object properties

**new Keyword:**

- Creates new object from class
- Runs constructor automatically

**this Keyword:**

- Refers to current object
- Used to assign properties

**Inheritance (extends):**

- Child class inherits from parent
- Gets all parent properties and methods

**super():**

- Calls parent constructor
- Must be first in child constructor

**AppError:**

- Custom error class for APIs
- Adds statusCode to standard Error
- Useful for HTTP error responses

---

### Quick Reference

```javascript
// Basic class
class User {
  constructor(name) {
    this.name = name;
  }
}
let user = new User("Alice");

// Inheritance
class Admin extends User {
  constructor(name, role) {
    super(name); // Call parent
    this.role = role;
  }
}
let admin = new Admin("Bob", "SuperAdmin");

// Custom error
class AppError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
let error = new AppError("Not found", 404);
```
