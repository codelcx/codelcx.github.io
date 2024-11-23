# 函数

## this

1、默认绑定：全局作用域、普通函数、定时器内中的this指向全局对象window

2、隐式绑定：调用位置是否有上下文对象，或是否被某个对象拥有包含

```js
function fun() { console.log(this.a) }

const a = 2
const obj = { a: 1, fun }

// 1、隐士绑定
obj.fun() 

// 2、隐式绑定对象丢失，使用默认绑定绑定全局对象
// fn是obj.fun的一个引用，fn()实际上是调用函数本身，是不带修饰的函数调用
const fn = obj.fun
fn()

// 3、间接引用也是默认绑定
const o = {}
(o.fun = obj.fun)()

// 4、参数传递，obj.fun实际上是函数本身
function dofun(fn) { fn() }
dofun(obj.fun)
```

3、硬绑定：使用` call、bind、apply`函数修改`this`的指向

```js
function fun() { console.log(this) }
const obj1={ a:1 }
const obj2={ b:2 }

fun.call(obj1) // 指向obj1
fun.call(obj2) // 指向obj2

// 使用该方式硬绑定后的bar无法修改this指向
const bar = function() { fun.call(obj1) }
bar()
bar.call(obj2)
```

```js
function fun(argument1, argument2) {
	let result = this.argument + argument1 + argument2 // 指向obj
	console.log(result)
}

const argument = 10
const obj = { argument: 1 }


fun.apply(obj, [2, 3]) // 6
fun(2, 3) // 15

// apply与call的区别在于，可以接收数组(或类数组)形式的参数
```

```js
function fun(x, y) { console.log(this,x + y) }  //{a: 1} 3
const obj = { a:1 }
const fn = fun.bind(obj,1,2) 

fn()
```

```js
function fun(x, y) { console.log(this.a + x + y) }

const obj1 = { a:1 }
const obj2 = { a:2 }
const fn=fun.bind(obj1,2,3)

fn()

//尝试修改参数
fn(5,5)

//尝试call修改this指向
fn.call(obj2,2,3)
fn.call(obj2,2,5)

//尝试apply修改this指向
fn.apply(obj2,[2,3])
fn.apply(obj2,[2,5])

// 以上结果全是6，
// 使用bind绑定后返回的函数无法修改this指向以及预定好的参数值，即无法用做构造函数
// 若未指定参数值则返回的函数可以修改参数值,但是this的绑定却无法修改
```

4、new：构造的新对象的this指向函数本身

```js
function fun(argument) {
  this.a= argument
  console.log(this) // 指向fun
}

const fn = new fun(2)
```

5、this忽略：`null.undefined`作为this传入`call,apply，bind`时该值会被忽略，应用默认绑定

```javascript
// 为了安全起见,不影响全局对象，不使用null而是 使用特殊对象DMZ空对象
const obj = Object.create(null)
fun.apply(obj,[2,3])
```





## 闭包

指有权访问另一个函数作用域中变量的函数。即闭包就是能够记住并访问所在作用域的函数。

::: info 闭包形成条件

1. **函数嵌套**：闭包的形成需要在一个函数内部定义另一个函数。
2. **内部函数引用外部函数的变量**：内部函数需要引用外部函数的变量。

:::

::: info 闭包作用

1. **数据封装**：闭包可以用来封装私有变量，外部无法直接访问这些变量，只能通过闭包提供的公共方法来操作这些变量。
2. **实现模块化**：闭包可以用来实现模块化，将相关的数据和函数封装在一个闭包中，形成一个模块。
3. **保持状态**：闭包可以用来保持状态，即使外部函数已经执行完毕，内部函数仍然可以访问和修改外部函数的变量。

:::

::: danger 闭包缺点

1. **内存泄漏**：闭包可能会导致内存泄漏。这是因为闭包会引用外部函数的变量，这些变量在闭包被销毁之前都不会被垃圾回收。如果闭包被长期保留，那么这些变量也会一直被保留在内存中，可能导致内存泄漏。
2. **性能问题**：闭包可能会导致性能问题。这是因为闭包会占用更多的内存和计算资源。例如，如果一个函数返回一个闭包，那么每次调用这个函数都会创建一个新的闭包实例，这可能会导致性能下降。
3. **代码难以理解**：闭包可能会导致代码难以理解和维护。因为闭包会引用外部函数的变量，这些变量可能会在闭包被调用时被修改，可能会导致代码的行为难以预测。
4. **调试困难**：闭包可能会导致调试困难。因为闭包会引用外部函数的变量，这些变量可能会在闭包被调用时被修改，这可能会导致调试器难以追踪变量的变化。

:::

## 继承

1、原型链

实现：子类原型对象指向父类实例，子类实例首先寻找子类原型对象的属性/方法，其次寻找父类原型对象的属性/方法

缺点：创建子类实例无法传参；所有子类实例均指向同一个父类实例，它们使用的是同一个原型对象，因此对某个子类实例的修改将影响所有子类实例

```js
function Animal() {
    this.name="aniaml"
    this.paly = [1,2]
}

Animal.prototype.getName = () => this.name

function Dog() {}
Dog.prototype=new Animal()

const dog1 = new Dog()
const dog2 = new Dog()

dog1.paly.push(3)
console.log(dog1.paly,dog2.paly) // [1,2,3]
```



2、构造式

实现：子类构造函数中执行父类的构造函数，并为其绑定子类的this，让父类的构造函数把成员属性和方法挂到子类的this上，这样既能避免实例之间受到原型影响又能够向父类传参

缺点：继承不到父类原型上的属性和方法

```js
function Animal(name) {
	this.name= name
}

Animal.prototype.getName=function() {
	return this.name
}

function Dog(name) {
	Animal.call(this,name)
}

const dog1=new Dog('xxx')
const dog2=new Dog('yyy')

dog1.name[0] = 'zzz'

dog1.getName() //error
console.log(dog1.name, dog2.name) //xxx,yyy
```



3、寄生式

实现：对父类原型对象作出浅拷贝，在浅拷贝的基础上扩展

缺点：对于原型继承是一样的优缺点，但是对于普通对象而言，能够在父类基础上扩展

```js
let animal = {
	name: 'animal',
	friends: [1,2,3],
	getName() {
		return this.name
	}
}

function Dog(origin) {
	let clone = Object.create(origin)

	clone.getFriends = function () {
		return this.friends
	}
    
	return clone
}

let dog = Dog(animal)
```



4、组合式

实现：结合原型链继承与构造函数继承

缺点：执行两次构造函数

```js
function Animal() {
	this.name='animal'
	this.paly = [1,2]
}

Animal.prototype.getName=function() {
	return this.name
}

function Dog(name) {
	Animal.call(this,name)
}

Dog.prototype = new Animal()

const dog1=new Dog()
const dog2=new Dog()

dog1.paly.push(3)

console.log(dog1.paly,dog2.paly) // [1,2,3], [1,2]
```



5、寄生组合式

实现：将组合式中指向父类实例改为指向父类原型

```js
function Animal() {
	this.name='animal'
	this.paly = [1,2]
}

Animal.prototype.getName=function() {
	return this.name
}

function Dog(name) {
	Animal.call(this,name)
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog
```



