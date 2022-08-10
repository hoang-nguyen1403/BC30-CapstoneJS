import renderProduct from './index.js'

function renderDetailProduct(detailData){
    console.log(detailData)
    let img = document.querySelector('.detail-product .left-side img')
    img.src = detailData.image
    
    document.querySelector('.detail-product .right-side .product-name').innerHTML = detailData.name
    document.querySelector('.detail-product .right-side .product-description').innerHTML = detailData.description
    document.querySelector('.detail-product .right-side .price').innerHTML = detailData.price + "$"

    let sizes = document.querySelector('.detail-product .right-side .sizes')
    for (let size of detailData.size) {
        let sizeComp = document.createElement('p')
        sizeComp.innerHTML = size
        sizes.append(sizeComp)
    }
    renderProduct(detailData.relatedProducts)
}

function getDetailProduct(productid){
    let promises = axios({
        url: 'https://shop.cyberlearn.vn/api/Product/getbyid?id='+productid,
        method: 'GET'
    });
    promises.then((result) => {
        renderDetailProduct(result.data.content)
    })
    promises.catch(function (err) {
        console.log('err', err);

    })
}

window.onload = function(){
    const urlParams = new URLSearchParams(window.location.search);
    const productid = urlParams.get('productid');
    console.log('params', productid)
    getDetailProduct(productid)

}