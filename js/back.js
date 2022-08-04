const authorization = 'wA8mJHhTzndutpqX4hnHb71Dc1L2';
const api_path = 'wa8mjhhtzndutpqx4hnhb71dc1l2';
const orderTableWrap = document.querySelector('.orderTableWrap');
const discardAllBtn = document.querySelector('.discardAllBtn')
//發送獲得訂單請求(Axios)
const getAxiosOrder = () => {
  return new Promise((resolve, reject) => {
    resolve(
      axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
        headers: {
          'authorization': authorization
        }
      })
    )
    reject(

    )
  })
}
//獲得訂單資料
const getorder = async () => {
  let data = await getAxiosOrder();
  return data
}
//刪除訂單(Axios)
const deleteOrder = async (id) => {
  return new Promise((resolve, reject) => {
    resolve(
      axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders/${id}`, {
        headers: {
          'authorization': authorization
        }
      })
    )
    reject()
  })
}
const deleteAllOrder = async () => {
  return new Promise((resolve, reject) => {
    resolve(
      axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
        headers: {
          'authorization': authorization
        }
      })
    )
    reject()
  })
}
const putOrder = async (paid, id) => {
  return new Promise((resolve, reject) => {
    resolve(
      axios.put(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
        "data": {
          "id": id,
          "paid": paid
        }
      }, { headers: { authorization: authorization } }

      )
    )
  })
}

//渲染訂單
const renderOrder = (orederData) => {
  let str = '';
  orederData.forEach(item => {
    let productName = item.products
      .map(item => { return `<p>${item.title}</p>` })
      .reduce((total, item) => { return total + item })

    let paid = item.paid ? '已完成' : '未完成'

    // console.log(paid)

    str += `<tr>
      <td>${item.createdAt}</td>
      <td>
        <p>${item.user.name}</p>
        <p>${item.user.tel}</p>
      </td>
      <td>${item.user.address}</td>
      <td>${item.user.email}</td>
      <td>
        ${productName}
      </td>
      <td>2021/03/08</td>
      <td class="orderStatus">
        <a href="#" data-status=${item.paid} data-id=${item.id} >${paid}</a>
      </td>
      <td>
        <input type="button" class="delSingleOrder-Btn" data-id=${item.id} value="刪除">
      </td>
    </tr>`
  });
  str = ` <table class="orderPage-table">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>聯絡人</th>
            <th>聯絡地址</th>
            <th>電子郵件</th>
            <th>訂單品項</th>
            <th>訂單日期</th>
            <th>訂單狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        ${str}
      </table>`
  orderTableWrap.innerHTML = str
}
//訂單操作
orderTableWrap.addEventListener('click', async (e) => {
  if (e.target.className === 'delSingleOrder-Btn') {
    let data = await deleteOrder(e.target.dataset.id);
    alert('刪除成功！')
    data = data.data.orders
    renderOrder(data);
  }
  if (e.target.nodeName = "A") {
    e.preventDefault()
    if (e.target.dataset.status === 'false') {
      let data = await putOrder(true, e.target.dataset.id);
      alert('已處理！')
      data = data.data.orders
      renderOrder(data)
    }


  }
})
discardAllBtn.addEventListener('click', async (e) => {
  let data = await deleteAllOrder();
  alert('刪除成功！')
  data = data.data.orders
  renderOrder(data)

})
//初始化
const init = async () => {
  const data = await getorder();
  // let orderData = data.map(item => { return item.data.orders })
  let orderData = data.data.orders;
  renderOrder(orderData);

}

init()