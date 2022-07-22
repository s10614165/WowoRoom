let ProductData;
let api_path = 'wa8mjhhtzndutpqx4hnhb71dc1l2'
const productWrapUl = document.querySelector('.productWrap')
const productSelect = document.querySelector('.productSelect')
// console.log(productSelect)
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

let renderProductInnerhtml = (ProductAry, category) => {
  let str = ''
  let data = [];
  console.log(category);
  ProductAry.data.products.filter((item) => {
    if ()
  })
  ProductAry.data.products.forEach(item => {
    // str += `<li class="productCard">
    //   <h4 class="productType">新品</h4>
    //   <img
    //     src=${item.images}
    //     alt="">
    //     <a href="#" class="addCardBtn">加入購物車</a>
    //     <h3>${item.title}</h3>
    //     <del class="originPrice">NT$${item.origin_price}</del>
    //     <p class="nowPrice">NT$12,000</p>
    // </li>`
  })
  productWrapUl.innerHTML = str
}
async function renderProuduct(category) {
  ProductData = await getProduct();
  renderProductInnerhtml(ProductData, category);

}


renderProuduct(productSelect.value);




productSelect.addEventListener('change', function () {
  renderProuduct(productSelect.value);
});