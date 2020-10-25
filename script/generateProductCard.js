import { getData } from './getData.js'
import { changeEnding, addMod } from './utils.js'

export const generateProductPage = () => {
  const productArea = document.querySelector('.product__area')
  const up = document.querySelector('.up')
  const down = document.querySelector('.down')

  const generateCards = (data) => {
    productArea.textContent = ''
    data &&
      data.forEach((item) => {
        const {
          productId: id,
          title,
          code,
          priceRetail,
          priceRetailAlt,
          priceGold,
          priceGoldAlt,
          primaryImageUrl: img,
          unit,
          unitRatio,
          unitAlt,
          unitRatioAlt,
          unitFull,
        } = item

        productArea.insertAdjacentHTML(
          'afterbegin',
          `<div id="products_section">
            <div class="products_page pg_0">
                <div class="product product_horizontal">
                <span class="product_code">Код: 147268</span>
                <div class="product_status_tooltip_container">
                    <span class="product_status">Наличие</span>
                </div>
                <div class="product_photo">
                    <a href="#" class="url--link product__link">
                        <img src=${addMod(img)} />
                    </a>
                </div>
                <div class="product_description">
                    <a href="#" class="product__link">
                        ${title}
                    </a>
                </div>
                <div class="product_tags hidden-sm">
                    <p>Могут понадобиться:</p>
                    <a href="#" class="url--link">подложка,</a>
                    <a href="#" class="url--link">плинтус натуральный,</a>
                    <a href="#" class="url--link">рулетка,</a>
                    <a href="#" class="url--link">набор для укладки ламината,</a>
                    <a href="#" class="url--link">ножовка по ламинату,</a>
                    <a href="#" class="url--link">гель для стыков ламината Clic Protect.</a>
                </div>
                <div class="product_units">
                    <div class="unit--wrapper">
                        <div class="unit--select unit--active">
                            <p class="ng-binding">За ${changeEnding(unitFull, 'у')}</p>
                        </div>
                        <div class="unit--select">
                            <p class="ng-binding">За ${unitAlt}</p>
                        </div>
                    </div>
                </div>
                <p class="product_price_club_card">
                    <span class="product_price_club_card_text">По карте<br />клуба</span>
                    <span class="goldPrice">${priceGold.toFixed(2)}</span>
                    <span class="rouble__i black__i">
                    <svg
                        version="1.0"
                        id="rouble__b"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        y="0"
                        width="30px"
                        height="22px"
                        viewBox="0 0 50 50"
                        enable-background="new 0 0 50 50"
                        xml:space="preserve"
                    >
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_black"></use>
                    </svg>
                    </span>
                </p>
                <p class="product_price_default">
                    <span class="retailPrice">${priceRetail.toFixed(2)}</span>
                    <span class="rouble__i black__i">
                    <svg
                        version="1.0"
                        id="rouble__g"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        y="0"
                        width="30px"
                        height="22px"
                        viewBox="0 0 50 50"
                        enable-background="new 0 0 50 50"
                        xml:space="preserve"
                    >
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_gray"></use>
                    </svg>
                    </span>
                </p>
                <div class="product_price_points">
                    <p class="ng-binding">Можно купить за 231,75 балла</p>
                </div>
                <div class="list--unit-padd"></div>
                <div class="list--unit-desc">
                    <div class="unit--info">
                    <div class="unit--desc-i"></div>
                    <div class="unit--desc-t">
                        <p>
                        <span class="ng-binding">Продается ${changeEnding(unitFull, 'ами')}:</span>
                        <span class="unit--infoInn">${unitRatio + ' ' + unit} = ${unitRatioAlt + ' ' + unitAlt}</span>
                        </p>
                    </div>
                    </div>
                </div>
                <div class="product__wrapper">
                    <div class="product_count_wrapper">
                    <div class="stepper">
                        <input class="product__count stepper-input" type="text" value=${minValue} data-count/></input>
                        <input type="button" class="stepper-arrow up" data-up></input>
                        <input type="button" class="stepper-arrow down" data-down></input>
                    </div>
                    </div>
                    <span class="btn btn_cart" data-url="/cart/" data-product-id=${id}>
                    <svg class="ic ic_cart">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>
                    </svg>
                    <span class="ng-binding">В корзину</span>
                    </span>
                </div>
                </div>
            </div>
        </div>`
        )
        const tab = document.querySelectorAll('.unit--select')
        const retailPrice = document.querySelector('.retailPrice')
        const goldPrice = document.querySelector('.goldPrice')

        // переключение стоимости товара
        const changePrice = (event) => {
          let target = event.target.closest('.unit--select')
          if (event.target.innerText == `За ${unitAlt}` && !target.classList.contains('unit--active')) {
            retailPrice.innerText = priceRetailAlt.toFixed(2)
            goldPrice.innerText = priceGoldAlt.toFixed(2)
            target.classList.add('unit--active')
            target.previousElementSibling.classList.remove('unit--active')
          }
          if (
            event.target.innerText == `За ${changeEnding(unitFull, 'у')}` &&
            !target.classList.contains('unit--active')
          ) {
            retailPrice.innerText = priceRetail.toFixed(2)
            goldPrice.innerText = priceGold.toFixed(2)
            target.classList.add('unit--active')
            target.nextElementSibling.classList.remove('unit--active')
          }
        }
        tab.forEach((e) => e.addEventListener('click', changePrice))
      })
  }
  getData.get(generateCards)

  const minValue = 1
  const maxValue = 50

  const counter = (event) => {
    let form = event.target.closest('.stepper')
    if (event.target.dataset.up == '' && form.children[0].value < maxValue) {
      form.children[0].value++
    }
    if (event.target.dataset.down != undefined && form.children[0].value > minValue) {
      form.children[0].value--
    }
  }

  const validateInput = (event) => {
    let count = event.target.dataset.count
    if (count != undefined && event.target.value < minValue) {
      event.target.value = minValue
    }
    if (count != undefined && event.target.value > maxValue) {
      event.target.value = maxValue
    }
  }

  productArea.addEventListener('click', counter)
  productArea.addEventListener('change', validateInput)
}
