let ProductData;
let CartData;
let api_path = 'wa8mjhhtzndutpqx4hnhb71dc1l2'
const productWrapUl = document.querySelector('.productWrap')
const productSelect = document.querySelector('.productSelect')
const productWrap = document.querySelector('.productWrap')
const shoppingCartTable = document.querySelector('.shoppingCart-table')
let getProduct = () => {
  return new Promise((resolve, reject) => {
    resolve(

      axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`)

    )
    reject(
      console.log(res)
    )
  })
}
let getCart = () => {
  return new Promise((resolve, reject) => {
    resolve(
      axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`)
    )
    reject(
      console.log(res)
    )
  })

}
let postAddCart = (id) => {
  return new Promise((resolve, reject) => {
    resolve(

      axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`, {
        "data": {
          "productId": id,
          "quantity": 1
        }
      })
    )
    reject(
      console.log(res)
    )
  })

}
let postDeletCart = (id) => {
  return new Promise((resolve, reject) => {
    resolve(

      axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/${id}`)
    )
    reject(
      console.log(res)
    )
  })

}
let postDeletAllCart = () => {
  return new Promise((resolve, reject) => {
    resolve(

      axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`)
    )
    reject(
      console.log(res)
    )
  })
}
let renderProductInnerhtml = (ProductAry, category) => {
  let str = ''

  ProductAry = ProductAry.data.products.filter((item) => {
    if (category === "全部") {
      return ProductAry
    }
    return item.category === category
  })
  ProductAry.forEach((item) => {
    str += `<li class="productCard"  >
      <h4 class="productType">新品</h4>
      <img
        src=${item.images}
        alt="">
        <a href="" class="addCardBtn" data-id=${item.id}>加入購物車</a>
        <h3>${item.title}</h3>
        <del class="originPrice">NT$${item.origin_price}</del>
        <p class="nowPrice">NT$12,000</p>
    </li>`
  })
  productWrapUl.innerHTML = str
  return ProductAry
}
let renderCartInnerhtml = (cartdata) => {
  let str = '';
  cartdata.data.carts.forEach((item) => {
    str += `<tr>
          <td>
            <div class="cardItem-title">
              <img src=${item.product.images} alt="">
              <p>${item.product.title}</p>
            </div>
          </td>
          <td>NT$${item.product.origin_price}</td>
          <td>1</td>
          <td>NT$${item.product.price}</td>
          <td class="discardBtn">
            <a href="#" class="material-icons" data-id=${item.id}>
              clear
            </a>
          </td>
        </tr>`
  })
  let totalstr = `<tr>
          <th width="40%">品項</th>
          <th width="15%">單價</th>
          <th width="15%">數量</th>
          <th width="15%">金額</th>
          <th width="15%"></th>
        </tr>${str}<tr>
          <td>
            <a href="#" class="discardAllBtn">刪除所有品項</a>
          </td>
          <td></td>
          <td></td>
          <td>
            <p>總金額</p>
          </td>
          <td>NT$${cartdata.data.finalTotal}</td>
        </tr>`
  shoppingCartTable.innerHTML = totalstr;
  return cartdata
}
async function renderProuduct(category) {
  try {
    ProductData = await getProduct();
    ProductData = await renderProductInnerhtml(ProductData, category);
  } catch (error) {
    console.log(error)
  }

}

async function renderCart() {
  try {
    CartData = await getCart();
    console.log(CartData)
    await renderCartInnerhtml(CartData)
  } catch (error) {
    console.log(error)
  }



}

productSelect.addEventListener('change', function () {
  renderProuduct(productSelect.value);
});
productWrap.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.className == 'addCardBtn') {
    let productNum = e.target.dataset.id

    postAddCart(productNum)
    renderCart()

  }
})

shoppingCartTable.addEventListener('click', (e) => {
  e.preventDefault()
  let productId = e.target.dataset.id
  if (e.target.className == 'material-icons') {
    postDeletCart(productId)
    renderCart();
    return
  }
  if (e.target.className === 'discardAllBtn') {
    let res = postDeletAllCart()
    renderCart()
  }
})



renderProuduct(productSelect.value);
renderCart();