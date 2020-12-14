var imgSrc;
var title;
var price;
var price_desc;
var product_desc;
var id;

//manipulate DOM elements on the shopping cart page
$(document).ready(function(){
    
    var precise_subTotal = 0;
    var subTotal = 0;
    var shippingFee = 5.99;
    var tax = 0;
    var grandTotal = 0;

    $("strong.item-price").each(function() {
        
        var getPrice = $(this).text();

        //add to the subTotal only if the price > 0
        if(parseFloat(getPrice) > 0){
            subTotal += parseFloat(getPrice);
            precise_subTotal = subTotal.toFixed(2);
        }
        
        //remove the product that has been deleted from the shopping cart (quantity < 1)
        var itemQty = parseInt($(this).parent().next("td").find("strong").text());
        if(itemQty < 1){
            
            //remove the specific deleted product from the shopping cart display
            $(this).parent().parent().remove();

            //if no other product exists on the shopping cart, remove all content from the shopping cart page
            if($("tr.cart-data").length == 0){
                $("#cart-info-msg").text("Cart currently empty. Add items to cart.")
                $("div.cart-summary").remove();
            }
        }
       
    });

    tax = (0.0625 * subTotal).toFixed(2);
    grandTotal = (subTotal + shippingFee + parseFloat(tax)).toFixed(2);
    
    $("#cart-summary").append(
    
        '<div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div></br>' +
            '<div class="p-4">' +
                '<ul class="list-unstyled mb-4">' +
                    '<li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>$' + precise_subTotal + '</strong></li>' +
                    '<li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and handling </strong><strong>$' + shippingFee + '</strong></li>' +
                    '<li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Tax </strong><strong>$' + tax + '</strong></li>' +
                    '<li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Grand Total </strong><strong>$' + grandTotal + '</strong></li>' +
                '</ul>'+
                '</br>' +
                '<button type="button" class="btn btn-primary proceed-checkout-btn">Proceed to Checkout</button>' +
                '</br>' + '</br>' +
                '<a class="btn btn-warning return-btn" href="/" role="button">Continue Shopping</a>' +
            '</div>' + 
        '</div>'
    );
    
    //function to display popup window upon clicking the product title
    $(".cart-product-title").click(function(){
        imgSrc = $(this).parent().prev("img").attr("src");
        title = $(this).text();
        price = $(this).siblings("p").find(".price").text();
        price_desc = $(this).siblings("p").find(".price_desc").text();
        product_desc = $(this).siblings(".product_desc").text();
        id = $(this).siblings(".id").text();
        itemQty = parseInt($(this).siblings(".itemQty").text());
        
        //remove the popup window elements if it already exists in the body
        if($("#myModal").length){
            $("#myModal").remove();
        }

        $("body").append(
            '<div class="modal fade" id="myModal" role="dialog">' +
                '<div class="modal-dialog">' +

                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" id="closeButton">&times;</button>' +
                            '<h3 class="modal-title">Product Details</h3>' +
                        '</div>' +

                        '<div class="modal-body">' +
                            '<img class="img-popup-thumbnail" src="' + imgSrc + '"/>' +
                            '<h4>' + title + '</h4>' +
                            '<p><span class="price">' + price + '</span><span class="price_desc">' + price_desc + '</span></p>' +
                            '<p class="product_desc">' + product_desc + '</p>' +
                        '</div>' +

                        '<div class="modal-footer">' +
                            '<p class="id" hidden>' + id + '</p>' +
                            '<label for="updateQty">Add/Remove Quantities</label>' +
                            '<input class="quantity" type="number" name="quantity" value="0" min="-' + itemQty + '" max="50">' +
                            '<a class="btn btn-warning add-btn-2" role="button">Update Quantity</a>' +
                            '<p class="minVal" hidden>-' + itemQty + '</p>' + 
                            '<p class="maxVal" hidden>50</p>' +
                        '</div>' +

                    '</div>' +
          
                '</div>' +

            '</div>'
        );
    });

    //event handler for "Update Quantity" button on the shopping cart page
    $("body").on("click", "a.add-btn-2", (function(){
        id = $(this).siblings(".id").text();
        var qty = $(this).siblings(".quantity").val();
        var minVal = parseInt($(this).siblings(".minVal").text());
        var maxVal = parseInt($(this).siblings(".maxVal").text());

        if((qty < minVal) || (qty > maxVal)){
            alert("Quantity cannot be more than " + maxVal + " or less than " + minVal);
        }

        else{
            var reqUrl = '/add-to-cart/' + id + '/' + qty;

            $.ajax({
                url: reqUrl,
                success: function(data) {
                    window.location.reload();
                },
                error: function() { alert("Error While Updating Cart");  }

            });
        }
        
    }));

    //event handler for "Proceed to Checkout" button
    $(".proceed-checkout-btn").on("click", function(){
        
        //array of product objects
        var productArr = [];
        
        $("div.item-details").each(function() {
            var productObj = {};

            var item_title = $(this).find(".cart-product-title").text();
            productObj["title"] = item_title;

            var itemQty = $(this).find("p.itemQty").text();
            productObj["quantity"] = itemQty;

            var imgPath = $(this).prev("img").attr("src");
            productObj["imagePath"] = imgPath;

            var category = $(this).find("p.category").text();
            productObj["category"] = category;

            //get the aggregate price of a particular item
            var price = $(this).parent().parent().next("td").find("strong.item-price").text();
            productObj["total_product_price"] = price;

            productArr.push(productObj);
        
        });

        $("input.checkout-price").val(grandTotal);
        $(".checkout-product-array").val(JSON.stringify(productArr));   //convert to string before sending to server

        $("form.checkout-form").submit();
    
    });

});