// https://codepen.io/cconceicao/pen/PBQawy?editors=0010

var slider = document.getElementById('slider'),
  slides = document.querySelector('.slides'),
  slideItems = document.getElementsByClassName('slide')

function slide(slider, slides, slideItems) {
  var slider = slider,
    slides = slides,
    slideSize = slideItems[0].clientWidth,
    slideLength = slideItems.length,
    firstSlide = slideItems[0],
    lastSlide = slideItems[slideLength - 1],
    firstClone = firstSlide.cloneNode(true),
    lastClone = lastSlide.cloneNode(true),
    posX1 = 0,
    posX2 = 0,
    thresold = 80,
    index = 0,
    initialPos,
    shifting = true

  slides.insertBefore(lastClone, firstSlide)
  slides.appendChild(firstClone)
  slides.classList.add('loaded')

  slides.ontransitionend = assureSlidesInsideViewport

  slides.onmousedown = dragStart

  slides.ontouchstart = dragStart
  slides.ontouchmove = dragMove
  slides.ontouchend = dragEnd

  function dragStart(e) {
    initialPos = slides.offsetLeft
    e.preventDefault()

    if (e instanceof TouchEvent) {
      posX1 = e.touches[0].clientX
    } else {
      posX1 = e.clientX
      slides.onmousemove = dragMove
      slides.onmouseup = dragEnd
    }
  }

  function dragMove(e) {
    if (e instanceof TouchEvent) {
      posX2 = posX1 - e.touches[0].clientX
      posX1 = e.touches[0].clientX
    } else {
      posX2 = posX1 - e.clientX
      posX1 = e.clientX
    }

    slides.style.left = slides.offsetLeft - posX2 + 'px'
  }

  function dragEnd(e) {
    shifting = true
    slides.classList.add('shifting')

    var finalPos = slides.offsetLeft,
      canMovePrev = finalPos - initialPos > thresold,
      canMoveNext = finalPos - initialPos < -thresold

    if (canMovePrev) {
      shiftSlide(-1)
      index--
    } else if (canMoveNext) {
      shiftSlide(1)
      index++
    } else {
      slides.style.left = initialPos + 'px'
    }

    if (e instanceof MouseEvent) {
      slides.onmousemove = null
      slides.onmouseup = null
    }
  }

  function shiftSlide(plus) {
    slides.style.left = initialPos - plus * slideSize + 'px'
  }

  function assureSlidesInsideViewport() {
    debugger
    if (shifting) {
      if (index === -1) {
        index = slideLength - 1
        slides.style.left = -slideLength * slideSize + 'px'
      }

      if (index === slideLength) {
        index = 0
        slides.style.left = -slideSize + 'px'
      }
    }

    slides.classList.remove('shifting')
    shifting = false
  }
}

slide(slider, slides, slideItems)
