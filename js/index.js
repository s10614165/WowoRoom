let ProductData;
let CartData;
const api_path = 'wa8mjhhtzndutpqx4hnhb71dc1l2'
const authorization = 'wA8mJHhTzndutpqX4hnHb71Dc1L2'
const productWrapUl = document.querySelector('.productWrap')
const productSelect = document.querySelector('.productSelect')
const productWrap = document.querySelector('.productWrap')
const shoppingCartTable = document.querySelector('.shoppingCart-table')
const orderInfoForm = document.querySelector('.orderInfo-form')
const orderInfobtn = document.querySelector('.orderInfo-btn')
// 請求商品內容
const getProduct = () => {
  return new Promise((resolve, reject) => {
    resolve(

      axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`)

    )
    reject(
      console.log(res)
    )
  })
}
// 請求購物車
const getCart = () => {
  return new Promise((resolve, reject) => {
    resolve(
      axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`)
    )
    reject(
      console.log(res)
    )
  })

}
// 發送購物車內容
const postAddCart = (id) => {

  // const cartRes = await axios.post()
  // render(cartRes)

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
//  發送刪除購物車內容
const postDeletCart = (id) => {
  return new Promise((resolve, reject) => {
    resolve(

      axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/${id}`)
    )
    reject(
      console.log(res)
    )
  })

}
//發送刪除所有購物車內容
const postDeletAllCart = () => {
  return new Promise((resolve, reject) => {
    resolve(

      axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`)
    )
    reject(
      console.log(res)
    )
  })
}
// 發送顧客資料
const postOrderData = (order) => {
  return new Promise((resolve, reject) => {
    resolve(

      axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/orders`, {
        "data": {
          "user":
            order

        }
      })
    )
    reject(
      console.log(res)
    )
  })
}

// 渲染商品資料
const renderProductInnerhtml = (ProductAry, category) => {
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
// 渲染購物車資料
const renderCartInnerhtml = (cartdata) => {
  let str = '';
  cartdata.data.carts.forEach((item) => {
    str += `<tr>
          <td>
            <div class="cardItem-title">
              <img src=${item.product.images} alt="">
              <p>${item.product.title}</p>
            </div>
          </td>
          <td>NT$${item.product.price}</td>
          
          <td><input type="button" value="-" class="minQuantity" data-id=${item.id}>${item.quantity}<input type="button" value="+" class="addQuantity" data-id=${item.id}></td>

          <td>NT$${item.product.price * item.quantity}</td>
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
// 清除已送出顧客資料
const cleanOrderValue = async () => {
  for (i = 0; i < orderInfoForm.length - 1; i++) {
    orderInfoForm.elements[i].value = ''
  }
}
// 修改購物車數量
const PatchCartQuantity = (id, action, quantity) => {
  if (quantity === 1 && action === 'minQuantity') {
    alert('產品數量不可小於1')
    return
  }
  switch (action) {
    case 'addQuantity':
      return new Promise((resolve, reject) => {
        resolve(
          axios.patch(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`, {
            "data": {
              "id": id,
              "quantity": quantity + 1
            }
          })
        )
        reject(
          alert(res.response.data.message)
        )
      })
    case 'minQuantity':
      return new Promise((resolve, reject) => {
        resolve(
          axios.patch(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`, {
            "data": {
              "id": id,
              "quantity": quantity - 1
            }
          })
        )
        reject(


        )
      })
  }

}
// 渲染商品資訊
async function renderProuduct(category) {
  try {
    ProductData = await getProduct();
    ProductData = await renderProductInnerhtml(ProductData, category);
  } catch (error) {
    console.log(error)
  }

}
// 渲染購物車
async function renderCart() {
  try {
    CartData = await getCart();
    await renderCartInnerhtml(CartData)
  } catch (error) {
    console.log(error)
  }



}
//切換商品類型
productSelect.addEventListener('change', function () {
  console.log(productSelect.value)
  renderProuduct(productSelect.value);
});
//加入購物車
productWrap.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.className === 'addCardBtn') {
    let productNum = e.target.dataset.id
    await postAddCart(productNum)
    renderCart()

  }
})
//購物車相關操作（
shoppingCartTable.addEventListener('click', async (e) => {
  e.preventDefault()
  let productId = e.target.dataset.id
  if (e.target.className == 'material-icons') {
    await postDeletCart(productId)
    await renderCart();
    return
  }
  if (e.target.className === 'discardAllBtn') {
    await postDeletAllCart()
    await renderCart()
    return
  }
  if (e.target.className === 'addQuantity' || e.target.className === 'minQuantity') {
    let productId = e.target.dataset.id
    let productquantity;
    CartData.data.carts.forEach((item) => {
      if (item.id === productId) {
        productquantity = item.quantity
      }
    })
    await PatchCartQuantity(productId, e.target.className, productquantity)
    await renderCart()
    return
  }
})
orderInfobtn.addEventListener('click', async (e) => {
  let orderInfoData = []
  let user = {};
  e.preventDefault()

  for (i = 0; i < orderInfoForm.length - 1; i++) {
    orderInfoData.push(orderInfoForm.elements[i].value)
  }
  user = {
    name: `${orderInfoData[0]}`,
    tel: `${orderInfoData[1]}`,
    email: `${orderInfoData[2]}`,
    address: `${orderInfoData[3]}`,
    payment: `${orderInfoData[4]}`
  }
  await postOrderData(user);
  alert('訂單已送出')

  await renderCart();
  await cleanOrderValue()

})

// －－－－－－－－初始渲染－－－－－－－－
renderProuduct(productSelect.value);
renderCart();