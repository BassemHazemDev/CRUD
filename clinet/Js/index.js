var productList = []
var currentId

function wlcomeAlert() {
    alert(`Welcome to the Product Management System 

        Please follow this constrains while adding product:

        - Prouduct name: Start with upper-case min(3) max(10)
        - Prouduct price: 4 digits number
        - Prouduct description: 200 characters max
        `)
}

wlcomeAlert()

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
    $("#tableData").html(cartona)
}

function addProduct() {
    alertRemove()
    if (validateProductName() && validateProductPrice() && validateProductDesc()) {
        let product = {
            name: $("#prouductName").val(),
            price: $("#prouductPrice").val(),
            description: $("#prouductDesc").val()
        }
        fetchAPI('POST', 'products', product)
        clearInput()
    } else {
        if (!validateProductName()) $("#PNP").removeClass("d-none");
        else if (!validateProductPrice()) $("#PPP").removeClass("d-none");
        else if (!validateProductDesc()) $("#PDP").removeClass("d-none");
    }
}

function alertRemove() {
    $("#PNP").addClass("d-none");
    $("#PPP").addClass("d-none");
    $("#PDP").addClass("d-none")
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
    let item = $("#searchInput").val().toLowerCase();
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
    $("#prouductName").val(current.name)
    $("#prouductPrice").val(current.price)
    $("#prouductDesc").val(current.description)
    $("#mainBtn").addClass('d-none')
    $("#updateBtn").removeClass('d-none')
}

function callUpdate() {
    let product = {
        name: $("#prouductName").val(),
        price: $("#prouductPrice").val(),
        description: $("#prouductDesc").val(),
        id: currentId
    }
    fetchAPI('PUT', 'products', product)
    $("#mainBtn").removeClass('d-none')
    $("#updateBtn").addClass('d-none')
    clearInput()
}

function clearInput() {
    $("#prouductName").val("")
    $("#prouductPrice").val("")
    $("#prouductDesc").val("")
}

function validateProductName() {
    var regex = /^[A-Z][a-z]{2,10}$/;
    if (regex.test($("#prouductName").val())) {
        return true;
    } else {
        return false;
    }
}

function validateProductPrice() {
    var regex = /^(([1-9][0-9][0-9][0-9])|10000)$/;
    if (regex.test($("#prouductPrice").val())) {
        return true;
    } else {
        return false;
    }
}

function validateProductDesc() {
    var regex = /.{0,200}/;
    if (regex.test($("#prouductDesc").val())) {
        return true;
    } else {
        return false;
    }
}
