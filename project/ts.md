# TypeScript

中文：https://ts.nodejs.cn/docs/handbook/intro.html

官网：https://www.typescriptlang.org/docs/handbook/intro.html



## 认识类型

### 基础类型

原始类型

```ts
number、string、boolean、bigint、symbol、null、undefined
```

特殊类型

```ts
any // 任何类型
unknown // 任何类型，未知类型，对该类型做操作都是不合法的
never // 永远不会被观察到，如异常、死循环、程序异常终止的返回值
readonly // 类型前添加表示为只读
```

数组类型

```ts
const arr = [1,2,3]
const arr:number[] = [1,2,3]
const arr:Array<number> = [1,2,3]
```

元组类型

```ts
const arr: [string, number]  = ['x', 1]
const arr = ['x', 1] as const // 只读元组，能够确定每个位置类型
```

```ts
type Arr1 = [string, number?] // 可选元组，可选参数只能放确切类型之后
type Arr2 = [string , ...number[]] // 扩展元组

const arr:Arr1 = ['x']
const arr2:Arr2 = ['x', 1, 2, 3]
```

枚举类型

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// 枚举类型必须初始化，初始化时可为常量或计算成员
// 初始化时不设定默认值，则默认从数字0开始依次递增
```

联合类型

```ts
const a: string | number = 0 // 可接受字符串和数字类型 
```



### 别名类型

```ts
// 属性分隔符：可空，可分号，可逗号
type Point = {
    x:number
    y:number
}

type T = string | number | boolean
```

别名扩展：`& ` 符号链接，可以原始类型、接口类型、别名类型...

```ts
type Animal = {
    name:string
}

type Bear = Animal & {
    honey:boolean
}
```

::: tip

- 不允许同名扩展
- 若出现相同字段，则取它们的交叉类型（共同都有的类型），否则为 `never`

:::



### 接口类型

```ts
// 属性分隔符：可空，可分号，可逗号
interface Point {
    x:number
    y:number
}
```

接口扩展：`extends` 关键字链接，多个用逗号分隔，可以是 原始类型、接口类型、别名类型...

```ts
interface Color {
    color:string
}
interface Circle {
    radius:number
}

interface CC extends Color, Circle {
  // 其它字段
}
```

::: tip

- 允许同名接口扩展，同名接口会自动合并
- 若出现相同字段，要求字段类型必须一致

:::



### 类型美化

类型扩展后，无法直接查看新类型的相关信息，可通过以下方式解决

```ts
type Prettity<T> = {
    [k in keyof T]: T[k]
}
```



### 类型断言

无法确定联合类型的具体类型时，只能访问联合类型的共有的属性和方法，为了获取更好的提示信息，可通过类型断言的方式指明变量的具体类型

```ts
varibale：number|string 

(<string> variable)  // 方式1
(variable as string) // 方式2
```

非空断言：`!`符号表示变量不是 `null、undefined`

```ts
variable: number | null | undefined

variable!.toFixed()
```





## 泛型类型

```ts
type Identity<T> = {
  val: T
  (arg: T): void
}

interface Identity<T> {
  val: T
  (arg: T): void
}
```



### 泛型类

```ts
class Box<T> {
  initValue: T

  constructor(init: T) {
    this.initValue = init
  }
}

// 类型推导
const box2 = new Box('x')
// 指定类型
const box1:Box<string> = new Box(1)
```



```ts
// 养蜂人
class Beekeeper {
  hasMask: boolean = true
}

// 动物管理员
class ZooKeeper {
  name: string = 'Mike'
}

class Animal {
  numLegs: number = 4
}

class Bee extends Animal {
  keeper: Beekeeper = new Beekeeper()
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper()
}

function createInstance<T extends Animal>(c: new () => T): T {
  return new c()
}

createInstance(Lion).keeper.name   // Mike
createInstance(Bee).keeper.hasMask // true
createInstance(Beekeeper) // ERROR，缺属性 numLegs 
```



### 泛型函数

```ts
//字符串转换数字
type Fun<I, O> = (arg: I) => O
function strToInt<I, O>(arr: Input[], fun: Fun<I, O>): O[] {
  return arr.map(fun)
}

const parse = strToInt(['1', '2', '3'], (n) => parseInt(n)) // number[] 
```



### 泛型约束

可使用extends表示自定义的约束

```ts
// error，type类型上不存在length属性
function longArr<T>(a: T, b: T) {
  return a.length >= b.length ? a : b
}

//使用限制条件，限制它必须有length属性
function longArr<T extends { length: number }>(a: T, b: T) {
  return a.length >= b.length ? a : b
}

longArr([1, 2, 3], [1, 2]) //[1,2,3]
longArr([1, 2], 'abc') // error，类型必须一致
longArr(1, 2) // error，必须具有length属性
```

泛型中使用类型参数

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, "a"); // 1
getProperty(x, "m"); // error
```







## 运算类型

### keyof

获取对象中的所有属性

```ts
function getProperty<T, K> (obj: T, key: K) {
  // 类型k无法用于索引类型T，因为类型k变量不一定存在于T类型中
  // 需要对类型进行约束 
  return obj[key]
}

const people = { name: 'xiaozhanng', age: 16 }
getProeprty(people, 'name')
getProperty(people, 'names') //报错，无法赋值给name|age


//方式1
function getProperty<T, K extends keyof T> (obj: T, key: K) {
    return obj[key]
}

//方式2
function getProperty<T, K> (obj: T, key: K) {
    return obj[key as keyof typeof people]
}
```

```ts
// 作用于对象
interface User {
  name: string
  age: number
}

type UserKey = keyof User // name|age

function test (obj: User, key: UserKey) {
  return obj[key]
}
```

```ts
// 作用于索引签名
type Mt = {
  [k: string]: boolean
}

type M = keyof Mt // number|string
```



### typeof

检测变量或对象属性的类型，无法查询其他类型（如函数调用）

```ts
let str = 'hello word'
type Str = typeof str // string

function fun(x:number,y:number) {}
type Fun = typeof fun // (x:number,y:number)=>void
```



### 索引访问

```ts
//对象索引
interface Person {
  name: string
  age: number
}

type type1 = Person['name'] // string
type type2 = Person['age' | 'name'] // string|number
type type3 = Person[keyof Person] // string|number|boolean
```



```ts
//数组索引
const MyArray = [
  { name1: 'xxx', age1: 10 },
  { name2: 'xxx', age2: 10 }
]

// 数组中所有元素的联合类型
type Person =typeof MyArray[number]
// {name1:string,age1:number}|{name2:string,age2:number} 
```



### 条件类型

```ts
interface Animal {
  woof(): void
}

inteface Dog extends Animal {
  live(): void
}

type ex1 = Dog extends Animal ? number : string //number
type ex2 = RegExp extends Animal ? number : string //string
```

```ts
interface IdLable {
  id:number
}

interface NameLable {
  name:string
} 

// function createLable(id: number): IdLable
// function createLable(name: string): NameLable

type NameOrId<T extends number|string> = T extends number ? IdLable : NameLable
function createLable<T extends number|string>(NameOrid: T): NameOrId<T> {}
```



### 条件推断

::: info 

- infer只能在extends中使用
- infer可作为一个占位符使用，用于语句true的返回分支
- infer处于逆变位置推断类型为交叉类型
- infer处于协变位置推断类型为联合类型

:::

判断数组中第一个元素代表的类型

```ts
// 不简写，R作为数组中的第一个元素，...unknown[]
type FirstString<T> = T extends [infer R, ...unknown[]] ? R extends string ? R : never : never
// 简写
type FirstString<T> = T extends [infer R extends string, ...unknown[]] ? R : never 

type A = FirstString<[string, number, boolean]> // string
type B = FirstString<['hello', number, boolean]> // 'hello'
type C = FirstString<[number, boolean]> // never
```

判断数组中值的类型

```ts
//两种写法
type getArrType<T> = T extends (infer R)[] ? R : T
type getArrType<T> = T extends Array<infer R> ? R : T

type Arr = Array<string|number>
type arrVType = getArrType<Arr> //string|number

let arr = [1,'a',true]
type arrType = typeof arr // (number|string|boolean)[]
type arrVType = getArrType<arrType> //string|number|boolean
```

获取对象中值的类型

```ts
type obj = { name: string, age: number }

// 获取所有属性的值类型
type getObjTypeA<T> = T extends { name: infer U, age: infer C } ? [U, C] : T
type A = getObjTypeA<obj> // [string,number]
let a: A = ['a', 1] // 只接受两个参数且位置不能更改

// 获取单个值类型
type getObjTypeB<T> = T extends { name: infer U } ? U : T
type B = getObjTypeB<obj> // string
let b: B = 'b'

// 获取所有属性值的联合类型，协变位置获取联合类型，仅在对象属性中存在协变位置
type getObjTypeC<T> = T extends { name: infer U, age: infer U } ? U : T
type C = getObjTypeC<obj> // string|number
let c: C = 1
```

```ts
//逆变位置获取交叉类型，仅在函数中存在逆变位置
type User = {
  a: (x: string) => void
  b: (x: number) => void
}

type PropertyType<T> = T extends { 
  a: (x: infer R) => void 
  b: (x: infer R) => void 
} ? R : T
type A = PropertyType<User> // never, string&number=>never
```



### 分布类型

```ts
type ToArray<Type> = Type extends any ? Type[] : never
type A = ToArray<string | number> // string[] | number[]


type ToArrayNon<Type> = [Type] extends [any] ? Type[] : never
type B = ToArrayNon<string | number> // (number|string)[]
```



### 映射类型

映射类型建立在索引签名的语法之上，用于声明未提前声明的属性类型

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean
}

type FeatureFlags = {
  darkMode: () => void
  newUserProfile: () => void
}
 
type FeatureOptions = OptionsFlags<FeatureFlags>

//等价于
type FeatureOptions = {
    darkMode: boolean
    newUserProfile: boolean
}
```

映射修饰符：前缀`-`，删除修饰符；前缀（默认） `+` ,添加修饰符

```ts
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
}
 
type LockedAccount = {
  readonly id: string
  readonly name: string
}
 
type UnlockedAccount = CreateMutable<LockedAccount>

//等价于
type UnlockedAccount = {
    id: string
    name: string
}
```

```ts
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}
 
type MaybeUser = {
  id: string
  name?: string
  age?: number
}
 
type User = Concrete<MaybeUser>

//等价于
type User = {
    id: string
    name: string
    age: number
}
```

映射过滤

```ts
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
}
 
interface Circle {
    kind: "circle"
    radius: number
}
 
type KindlessCircle = RemoveKindField<Circle>

//等价于
type KindlessCircle = {
    radius: number
}
```

映射联合

```ts
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void
}
 
type SquareEvent = { kind: "square", x: number, y: number }
type CircleEvent = { kind: "circle", radius: number }
 
type Config = EventConfig<SquareEvent | CircleEvent>

//等价于
type Config = {
    square: (event: SquareEvent) => void
    circle: (event: CircleEvent) => void
}
```

映射配合

```ts
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false
}
 
type DBFields = {
  id: { format: "incrementing" }
  name: { type: string pii: true }
}
 
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>

// 等价于 
type ObjectsNeedingGDPRDeletion = {
    id: false
    name: true
}
```



### 模板文字

当在插值位置使用联合时，类型是可以由每个联合成员表示的每个可能的字符串文字的集合

```ts
type EmailLocaleIDs = "welcome_email" | "email_heading"
type FooterLocaleIDs = "footer_title" | "footer_sendoff"
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`

// result 
type AllLocaleIDs = 
	"welcome_email_id" | "email_heading_id" | 
	"footer_title_id" | "footer_sendoff_id"
```

对于模板文字中的每个插值位置，联合是交叉相乘的

```ts
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`
type Lang = "en" | "ja" | "pt"
 
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`
            
// result 
type LocaleMessageIDs = 
	"en_welcome_email_id" | "en_email_heading_id" |
	"en_footer_title_id" | "en_footer_sendoff_id" | 
	"ja_welcome_email_id" | "ja_email_heading_id" | 
	"ja_footer_title_id" | "ja_footer_sendoff_id" | 
	"pt_welcome_email_id" | "pt_email_heading_id" | 
	"pt_footer_title_id" | "pt_footer_sendoff_id" 
```

类型中的字符串联合

```ts
type PropEventSource<Type> = {
    on<Key extends string & keyof Type>(
  	eventName: `${string & keyof Type}Changed`, 
    callback: (newValue: Type[key]) => void): void
}
 
declare function makeWatchedObject<Type>(obj: Type): 
Type & PropEventSource<Type>


const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
})

// newValue: string | number
// eventName: firstNameChanged | lastNameChanged | ageChanged
person.on("firstNameChanged", newValue => {})
```



## 装饰器



### 装饰作用

装饰器是通过添加标注的方式，对类型扩展的一种方式

::: info

- 只能在类中使用
- 减少冗余代码量
- 提高代码扩展性

:::

装饰顺序：属性、访问、参数、方法



### 访问装饰

运行时当作函数调用，类构造函数作为其唯一参数

```ts
function active(target: any) { // 此处值 typeof Greet
  target.active = true // 无，创建静态属性并初始化；有，修改属性值
  target.fun = (str: string) => console.log(str) // 宿主对象方法优先
}


@active
class Greeter {
  static active = false
  static fun = (num: number) => console.log(num)
  greeting: string

  constructor(message?: string) {
    this.greeting = message ?? '欢迎光临'
  }
}

Greeter.active  // true，未实例化装饰器以起作用
Greeter.fun('hello word') // error，string 无法赋值 number
```



### 属性装饰

在此之前可了解Reflect-metadata，可在对象和对象属性上定义元数据

```ts
npm install reflect-metadata --save 
import 'reflect-metadata' 
```

```ts
const o = {a:1,b:2}
Reflect.defineMetadata('key','value',o,'a') //定义元数据
Reflect.getOwnMetadata('key',o,'a')
```

```ts
import 'reflect-metadata'

const formatMetadataKey = Symbol("format")

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString)
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey)
}

class Greeter {
  @format("Hello, %s")
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    let formatString = getFormat(this, "greeting")
    return formatString.replace("%s", this.greeting)
  }
}

const greeter = new Greeter('word')
greeter.greet() // hello,word
```



### 方法装饰

应用于方法的属性描述符，可用于观察、修改或替换方法定义

::: info 运行时当作函数调用，传入下列参数

- 静态成员类构造函数或实例成员类原型
- 属性名
- 属性描述符

:::

```ts
function enumerable(value: boolean) {
  return function (
  	target: any, 
   	propertyKey: string, 
   	descriptor: PropertyDescriptor) {
    descriptor.enumerable = value
  }
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() { }
}
```



### 参数装饰

参数装饰器只是收集映射，但是未进行校验，因为参数装饰器并不能得到运行时调用方法的实参。因此校验操作需要在额外的方法装饰器中进行。

::: info 运行时当作函数调用，传入下列参数

- 对于静态成员是构造函数，对于实例成员是类原型对象
- 属性
- 参数索引

:::

```ts
import 'reflect-metadata'

const startsWithKey = 'startsWithKey'
function starstWith(prefix: string) {
	return function (
		target: any, 
		propertykey: string, 
		paramsIndex: number) {

		const startsWithConstraints = Reflect.getOwnMetadata(
			startsWithKey,
			target,
			propertykey,
		) || {} as Record<number, string>

		startsWithConstraints[paramsIndex] = prefix

		Reflect.defineMetadata(
			startsWithKey,
			startsWithConstraints,
			target,
			propertykey
		)

	}

}


function checkParam(
	target: any,
	propertykey: string,
	descriptor: PropertyDescriptor
) {
	const method = descriptor.value
	// 重写方法，对参数校验
	descriptor.value = function () {
        
        // 获取装饰器收集到的映射
		const startsWithConstraints = Reflect.getOwnMetadata(
			startsWithKey,
			target,
			propertykey
		) || {}

		Array.prototype.slice.call(arguments).forEach((arg, index) => {
			const prefix = startsWithConstraints[index]
			if (prefix && !arg.startsWith(prefix)) {
				throw new Error('error')
			}
		})

		return method.apply(this, arguments)
	}
}


class Greeter {
	greeting: string

	constructor(message?: string) {
		this.greeting = message ?? '欢迎光临'
	}

	@checkParam
	greet(@starstWith('x') name: string, age: number) { 
		console.log(name,age);
		
	}

}

const greeter = new Greeter()

greeter.greet('xxx', 20)
greeter.greet('yyy', 20) //error
```



### 复合装饰

从上到下开始调用，返回的函数从下到上调用

```ts
function first() {
  console.log("first(): factory evaluated");
  return function (
  	target: any, 
  	propertyKey: string, 
   	descriptor: PropertyDescriptor) {
    console.log("first(): called")
  }
}
 
function second() {
  console.log("second(): factory evaluated")
  return function (
  	target: any, 
   	propertyKey: string, 
   	descriptor: PropertyDescriptor) {
    console.log("second(): called")
  }
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}

/**
first(): factory evaluated
second(): factory evaluated
second(): called
first(): called
**/
```



## 工具类型

### Pick

从已有类型中选择一组属性作为新类型

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}
 
type TodoPreview = Pick<Todo, "title" | "completed">

type TodoPreview = {
      title: string
  	  completed: boolean
}
 

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
}
```



### Omit

从已有类型中选择所有属性，删除指定属性，构造类型

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
  createdAt: number
}

type TodoInfo = Omit<Todo, "completed" | "createdAt">
 
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
}
```



### Partial

构造一个所有属性设置为可选的类型

```ts
interface Article {
    title:string
    description:strnig
}

const article:Partial<Article> = {
    title: 'xxx' , //shu'xi
}
```



### Record

构造一个对象类型

```ts
interface CatInfo {//值
  age: number
  breed: string
}

//该类型变量必须包含所有键
type CatName = "miffy" | "boris" | "mordred"//键
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
}
```



### Exclude

从已有联合成员中，删除指定属性，构造类型

```ts
type T0 = Exclude<"a" | "b" | "c", "a">   
type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">
type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>
type T2 = string | number
```



### Extract

从已有联合成员中，提取指定属性，构造类型

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">
type T0 = "a"


type T1 = Extract<string | number | (() => void), Function>  
type T1 = () => void
```



### Readonly

构造一个所有属性设置为可读类型

```ts
interface Todo {
  title: string
}
 
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
}
 
todo.title = "Hello"
```



### InstanceType

以构造函数实例类型组成的类型

```ts
class C {
  x = 0
  y = 0
}
 
type T = InstanceType<typeof C> 
```

