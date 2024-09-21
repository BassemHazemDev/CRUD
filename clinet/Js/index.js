let productList = []
let currentId
let productName = $("#productName")
let productPrice = $("#productPrice")
let productDesc = $("#productDesc")
let searchInput = $("#searchInput")
let mainBtn = $("#mainBtn")
let updateBtn = $("#updateBtn")
let PNP = $("#PNP")
let PPP = $("#PPP")
let PDP = $("#PDP")
let tableData = $("#tableData")

function wlcomeAlert() {
    alert(`Welcome to the Product Management System 

        Please follow this constrains while adding product:

        - Product name: Start with upper-case min(3) max(10)
        - Product price: 5 digits number
        - Product description: 200 characters max
        `)
}
function fetchData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/",
        dataType: "json",
        success: function(res) {
            productList = res.data
            display(productList)
        }
    })
}

wlcomeAlert()
fetchData()

function display(productList) {
    let cartona = ``
    for (let i = 0; i < productList.length; i++) {
        cartona += `
         <tr>
            <td class="bg-dark text-white">${productList[i].id}</td>
            <td class="bg-dark text-white">${productList[i].name}</td>
            <td class="bg-dark text-white">${productList[i].price}</td>
            <td class="bg-dark text-white">${productList[i].description}</td>
            <td class="bg-dark text-white">
            <button class="btn btn-danger" onclick="deleteProduct(${productList[i].id})">delete</button>
            <button class="btn btn-warning" onclick="updateProduct(${productList[i].id})">Update</button>
            </td>
        </tr>`
    }
    tableData.html(cartona)
}

function addProduct() {
    alertRemove()
    if (validateProductName() && validateProductPrice() && validateProductDesc()) {
        let product = {
            name: productName.val(),
            price: productPrice.val(),
            description: productDesc.val()
        }
        fetchAPI('POST', 'products', product)
        clearInput()
    } else {
        if (!validateProductName()) PNP.removeClass("d-none");
        else if (!validateProductPrice()) PPP.removeClass("d-none");
        else if (!validateProductDesc()) PDP.removeClass("d-none");
    }
}

function alertRemove() {
    PNP.addClass("d-none");
    PPP.addClass("d-none");
    PDP.addClass("d-none")
}

function fetchAPI(method, endPoint, data) {
    $.ajax({
        type: method,
        url: `http://localhost:3000/${endPoint}`,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(res) {
            fetchData()
        }
    })
}

function searchProduct() {
    let item = searchInput.val().toLowerCase();
    let filteredProducts = productList.filter(product => {
        return (
            product.name.toLowerCase().includes(item) ||
            product.description.toLowerCase().includes(item) ||
            product.price.toString().includes(item)
        );
    });
    display(filteredProducts);
}

function deleteProduct(id) {
    fetchAPI('DELETE', 'products', { id })
}

function updateProduct(id) {
    currentId = id
    let current = productList.filter(ele => ele.id == id)[0]
    productName.val(current.name)
    productPrice.val(current.price)
    productDesc.val(current.description)
    mainBtn.addClass('d-none')
    updateBtn.removeClass('d-none')
}

function callUpdate() {
    let product = {
        name: productName.val(),
        price: productPrice.val(),
        description: productDesc.val(),
        id: currentId
    }
    fetchAPI('PUT', 'products', product)
    mainBtn.removeClass('d-none')
    updateBtn.addClass('d-none')
    clearInput()
}

function clearInput() {
    productName.val("")
    productPrice.val("")
    productDesc.val("")
}

function validateProductName() {
    var regex = /^[A-Z][a-z]{2,10}$/;
    if (regex.test(productName.val())) {
        return true;
    } else {
        return false;
    }
}

function validateProductPrice() {
    var regex = /^(([1-9][0-9][0-9][0-9][0-9])|100000)$/;
    if (regex.test(productPrice.val())) {
        return true;
    } else {
        return false;
    }
}

function validateProductDesc() {
    var regex = /.{0,200}/;
    if (regex.test(productDesc.val())) {
        return true;
    } else {
        return false;
    }
}
