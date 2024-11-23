# 轮播图



## 基本布局

::: details html

```html
<div class="swiper-slider">
  <div class="swiper-item">
    <img src="./assets/wall_1.png" alt="">
  </div>

  <div class="swiper-item">
    <img src="./assets/wall_2.png" alt="">
  </div>

  <div class="swiper-item">
    <img src="./assets/wall_3.png" alt="">
  </div>

  <div class="swiper-item">
    <img src="./assets/wall_4.png" alt="">
  </div>

  <div class="swiper-item">
    <img src="./assets/wall_5.png" alt="">
  </div>

  <div class="swiper-item">
    <img src="./assets/wall_6.png" alt="">
</div>
```

:::

::: details css

```css
.swiper-container {
  width: 500px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border: 1px solid #ccc;
}

.swiper-slider {
  display: flex;
  width: 100%;
  height: 100%;
}

.swiper-item {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}

img {
  width: 100%;
  height: 100%;
}

.swiper-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  background-color: rgb(0, 0, 0, 0.5);
}

.swiper-dot {
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.swiper-active {
  background-color: red;
  transform: scale(1.2);
}

.swiper-arrow-left {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 20px solid #ccc;
  cursor: pointer;
}

.swiper-arrow-right {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 20px solid #ccc;
  cursor: pointer;
}
```

:::



## 具体实现

```ts
interface SwiperOptions {
  /** 是否自动播放 */
  autoplay?: boolean
  /** 自动播放间隔时间，默认3000ms */
  delay?: number
  /** 是否无缝滚动 */
  loop?: boolean
  /** 是否显示指示器 */
  navigation?: boolean
  /** 是否显示箭头 */
  arrow?: boolean
}

export class Swiper {
  private _container: HTMLElement
  private _slides: HTMLCollection
  private _slidesLength: number
  private _slideContainer: HTMLElement
  private _arrow_left: HTMLElement
  private _arrow_right: HTMLElement
  private _footer: HTMLElement
  private _currentIndex: number = 0
  private _intervalId: number | null = null
  private _autoplay: boolean = false
  private _delay: number = 3000
  private _loop: boolean = false
  private _navigation: boolean = false
  private _activeName: string = 'swiper-active'

  /**
   * 初始化轮播图
   * @param options 配置项
   * @param container 容器
   * @param slideContainer 轮播图容器
   * @param footer 底部指示器
   */
  constructor(options?: SwiperOptions) {
    this._container = document.querySelector('.swiper-container') as HTMLElement
    this._slideContainer = document.querySelector('.swiper-slider') as HTMLElement
    this._footer = document.querySelector('.swiper-footer') as HTMLElement
    this._arrow_left = document.querySelector('.swiper-arrow-left') as HTMLElement
    this._arrow_right = document.querySelector('.swiper-arrow-right') as HTMLElement

    this._slides = this._slideContainer?.children as HTMLCollection || []
    this._slidesLength = this._slides.length
    this._autoplay = options?.autoplay ?? false
    this._delay = options?.delay ?? 3000
    this._loop = options?.loop ?? false
    this._navigation = options?.navigation ?? false

    this.loop()
    this.initArrow()
    this.initIndicator()
    this.autoPlay()
  }

  // 无缝滚动
  loop() {
    const first = this._slideContainer.firstElementChild!.cloneNode(true) as HTMLElement
    const last = this._slideContainer.lastElementChild!.cloneNode(true) as HTMLElement
    this._slideContainer.appendChild(first)
    this._slideContainer.insertBefore(last, this._slideContainer.firstElementChild)
    last.style.position = 'absolute'
    last.style.transform = 'translateX(-100%)'
  }

  // 滚动至指定页
  play(index: number = 0) {
    this._currentIndex = index
    if (!this._loop && index === this._slidesLength - 1) clearInterval(this._intervalId as number)

    this._slideContainer.style.transition = 'all 0.5s'
    this._slideContainer.style.transform = `translateX(-${index * 100}%)`

    if (!this._navigation) return
    const active = document.querySelector('.swiper-active') as HTMLElement
    active.classList.remove(this._activeName)
    this._footer.children[index].classList.add(this._activeName)

  }

  // 上一页
  leftPrev() {
    if (this._currentIndex === 0) {
      this._slideContainer.style.transform = `translateX(-${this._slidesLength * 100}%)`
      this._slideContainer.style.transition = 'none'
      // 强制渲染
      this._slideContainer.clientHeight
      this.play(this._slidesLength - 1)
    } else {
      this.play(this._currentIndex - 1)
    }
  }

  // 下一页
  rightNext() {
    if (this._currentIndex === this._slidesLength - 1) {
      this._slideContainer.style.transform = `translateX(100%)`
      this._slideContainer.style.transition = 'none'
      this._slideContainer.clientHeight
      this.play(0)
    } else {
      this.play(this._currentIndex + 1)
    }
  }

  // 底部指示器
  initIndicator() {
    if (!this._navigation) return
    const frag = document.createDocumentFragment()
    for (let i = 0; i < this._slidesLength; i++) {
      const dot = document.createElement('div')
      dot.classList.add('swiper-dot')
      frag.appendChild(dot)
    }
    this._footer.appendChild(frag)
    this._footer.children[0].classList.add(this._activeName)
    this._container.appendChild(this._footer)
  }

  // 箭头
  initArrow() {
    this._arrow_left.addEventListener('click', this.leftPrev.bind(this))
    this._arrow_right.addEventListener('click', this.rightNext.bind(this))
    this._arrow_left.addEventListener('mouseenter', () => clearInterval(this._intervalId as number))
    this._arrow_right.addEventListener('mouseenter', () => clearInterval(this._intervalId as number))
    this._arrow_left.addEventListener('mouseleave', () => this._intervalId = setInterval(this.rightNext.bind(this), this._delay))
    this._arrow_right.addEventListener('mouseleave', () => this._intervalId = setInterval(this.rightNext.bind(this), this._delay))
  }

  // 自动播放
  autoPlay(){
    if (!this._autoplay) return
    this._intervalId = setInterval(this.rightNext.bind(this), this._delay)
  }
}
```

