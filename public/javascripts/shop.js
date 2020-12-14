var imgSrc;
var title;
var price;
var price_desc;
var product_desc;
var id;

var categories = ["Fruits", "Vegetables", "PersonalCare"];
var filterList = '<p><b>Choose Categories: </b></p>';

var filterCategories = "";
var filterMinPrice = 0;
var filterMaxPrice = 500;

//manipulate DOM elements on the shopping page(s) (NOT the shopping cart page)
$(document).ready(function(){

    //add category list for filter popup menu
    for(var i = 0; i < categories.length; i++){
        var filterBodyStr = 
            '<div class="form-check">' +
                '<input class="form-check-input" type="checkbox" value="' + categories[i] + '">' +
                '<label for="' + categories[i] + '">' + categories[i] + '</label>' +
            '</div>';
        
        filterList += filterBodyStr;
    }
    
    //function to display popup window upon clicking the product title
    $(".product_title").click(function(){
        imgSrc = $(this).parent().prev("img").attr("src");
        title = $(this).text();
        price = $(this).siblings("p").find(".price").text();
        price_desc = $(this).siblings("p").find(".price_desc").text();
        product_desc = $(this).siblings(".product_desc").text();
        id = $(this).siblings(".id").text();
        
        //remove the popup window element if it already exists in the body
        if($("#myModal").length){
            $("#myModal").remove();
        }

        //popup window upon clicking the product title
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
                            '<input class="quantity" type="number" name="quantity" value="1" min="1" max="50">' +
                            '<a class="btn btn-warning add-btn" role="button">Add to Cart</a>' +
                        '</div>' +

                    '</div>' +
          
                '</div>' +

            '</div>'
        );
    });

    //add pagination dynamically based on the no. of pages
    var totalPages = parseInt($("#isPaginate").text());
    var currentUrl = window.location.href;
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var currentPage = parseInt(urlParams.get('page'));
    var prevPage = currentPage - 1;
    var nextPage = currentPage + 1;

    var prevBtn;
    var nextBtn;

    //check for any existing filter from the URL
    if(urlParams.has('categories')){
        filterCategories = urlParams.get('categories');
    }

    if(urlParams.has('minPrice')){
        minPrice = parseInt(urlParams.get('minPrice'));
    }

    if(urlParams.has('maxPrice')){
        maxPrice = parseInt(urlParams.get('maxPrice'));
    }

    if(currentUrl.includes("&page")){
        var splitUrl = currentUrl.split("&page");
        currentUrl = splitUrl[0];
    
    }

    //disable both "Previous" and "Next" buttons if there is only 1 page to display
    if(totalPages == 1){
        prevBtn =   '<li class="page-item disabled">' +
                        '<a class="page-link" tabindex="-1">Previous</a>' +
                    '</li>';
        
        nextBtn =   '<li class="page-item disabled">' +
                        '<a class="page-link" tabindex="-1">Next</a>' +
                    '</li>';

    }

    //disable the "Previous" button if current page is the very first page OR page no. is missing from the query string
    else if((isNaN(currentPage)) || (currentPage == 1)){
        nextPage = 2;

        prevBtn =   '<li class="page-item disabled">' +
                        '<a class="page-link" tabindex="-1">Previous</a>' +
                    '</li>';
        
        if(urlParams.has('hasParam')){

            nextBtn =   '<li class="page-item">' +
                            '<a class="page-link" href="' + currentUrl + '&page=' + nextPage + '">Next</a>' +
                        '</li>';
        }
        
        else{
            nextBtn =   '<li class="page-item">' +
                            '<a class="page-link" href="?page=' + nextPage + '">Next</a>' +
                        '</li>';
        }
       
    }

    //disable the "Next" button if current page is the very last page
    else if(currentPage == totalPages){

        if(urlParams.has('hasParam')){

            prevBtn =   '<li class="page-item">' +
                            '<a class="page-link" href="' + currentUrl + '&page=' + prevPage + '">Previous</a>' +
                        '</li>';
        }

        else{
            prevBtn =   '<li class="page-item">' +
                            '<a class="page-link" href="?page=' + prevPage + '">Previous</a>' +
                        '</li>';
        }

        nextBtn =   '<li class="page-item disabled">' +
                        '<a class="page-link" tabindex="-1">Next</a>' +
                    '</li>';
    }

    //otherwise, enable both the "Previous" and "Next" buttons
    else if((currentPage > 1) && (currentPage < totalPages)){

        if(urlParams.has('hasParam')){

            prevBtn =   '<li class="page-item">' +
                            '<a class="page-link" href="' + currentUrl + '&page=' + prevPage + '">Previous</a>' +
                        '</li>';
        
            nextBtn =   '<li class="page-item">' +
                            '<a class="page-link" href="' + currentUrl + '&page=' + nextPage + '">Next</a>' +
                        '</li>';
        }

        else{

            prevBtn =   '<li class="page-item">' +
                            '<a class="page-link" href="?page=' + prevPage + '">Previous</a>' +
                        '</li>';
        
            nextBtn =   '<li class="page-item">' +
                            '<a class="page-link" href="?page=' + nextPage + '">Next</a>' +
                        '</li>';
        }
        
    }

    $("ul.pagination").append(prevBtn);

    for(var pageNum = 1; pageNum <= totalPages; pageNum++){
        if(urlParams.has('hasParam')){

            var numberedList = '<li class="page-item"><a class="page-link" href="' + currentUrl + '&page=' + pageNum + '">' + 
                                pageNum + '</a></li>';

            $("ul.pagination").append(numberedList);
        }

        else{

            var numberedList = '<li class="page-item"><a class="page-link" href="?page=' + pageNum + '">' + pageNum + '</a></li>';
            $("ul.pagination").append(numberedList);
        }
        
    }

    $("ul.pagination").append(nextBtn);

    //get the current page no. and highlight the current pagination button
    $("li.page-item").each(function(){
        if($(this).find("a.page-link").text() == currentPage){
            //empty the current anchor style
            $(this).empty();

            //add new anchor style
            if(urlParams.has('hasParam')){

                $(this).append(
                    '<a style="background-color: gainsboro;" class="page-link" href="' + currentUrl + '&page=' + 
                    currentPage + '">' + currentPage + '</a>'
                );
            }

            else{

                $(this).append(
                    '<a style="background-color: gainsboro;" class="page-link" href="?page=' + currentPage + '">' + currentPage + '</a>'
                );
            }

        }
    });
        
    //event handler for "Add to Cart" button on the shopping page(s)
    $("body").on("click", "a.add-btn", (function(){
        id = $(this).siblings(".id").text();
        var qty = $(this).siblings(".quantity").val();
        const minVal = 1;
        const maxVal = 50;

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
                error: function() { alert("Error While Adding to Cart");  }

            });
        }

    }));

    //event handler for search bar and search submit button
    $("#searchBtn").click(function(){
        searchString = $("#searchInput").val();

        //must use 'hasParam' parameter whenever a query string needs to be constructed - otherwise may
        //return improper pagination
        if(!urlParams.has('categories')){
            window.location.href = '/search-filter/?hasParam=1&itemTitle=' + searchString + '&minPrice=' + filterMinPrice + 
                                    '&maxPrice=' + filterMaxPrice;
        }

        else{
            window.location.href = '/search-filter/?hasParam=1&itemTitle=' + searchString + '&minPrice=' + filterMinPrice + 
                                    '&maxPrice=' + filterMaxPrice + '&categories=' + filterCategories;
        }
        
    });

    //event handler for filter button
    $("#filterBtn").click(function(){
        
         //remove the popup filter window if it already exists in the body
        if($("#filterModal").length){
            $("#filterModal").remove();
        }

        //popup window for filter
        $("body").append(
            '<div class="modal fade" id="filterModal" role="dialog">' +
                '<div class="modal-dialog">' +

                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" id="closeButton">&times;</button>' +
                            '<h3 class="modal-title">Add Filters</h3>' +
                        '</div>' +

                        '<div class="modal-body">' +
                            filterList +
                            '</br></br><p><b>Price Range (USD): </b></p>' +
                            '<label class="price-range-label" for="minPrice"> Min Price</label>' +
                            '<input class="price-range" type="number" id="minPrice" name="minPrice" value="0" min="0" max="500">' +
                            '<label class="price-range-label" for="maxPrice"> Max Price</label>' +
                            '<input class="price-range" type="number" id="maxPrice" name="maxPrice" value="500" min="1" max="500">' +
                        '</div>' +

                        '<div class="modal-footer">' +
                            '<a class="btn btn-primary apply-filter-btn" role="button">Apply</a>' +
                        '</div>' +

                    '</div>' +
          
                '</div>' +

            '</div>'
        )
    });

    //event handler for "Apply" button to filter
    $("body").on("click", ".apply-filter-btn", (function() {

        var count = 0;
        
        //evaluate which checkboxes are checked
        $(".form-check-input").each(function(){
            if($(this).prop('checked')){

                count++;
                var selectedCategory = $(this).val();

                if(count == 1){
                    filterCategories = selectedCategory;
                }

                else{
                    filterCategories = filterCategories + "," + selectedCategory;
                }
            }
        });

        selMinPrice = $(".apply-filter-btn").parent().prev().find("#minPrice").val();
        selMaxPrice = $(".apply-filter-btn").parent().prev().find("#maxPrice").val();

        //don't allow user to select the min price greater than the max price
        if(selMinPrice >= selMaxPrice){
            alert("Min price must be less than the max price!");
        }

        else if(selMinPrice < 0){
            alert("Min price must be greater than or equal to 0");
        }

        else if(selMaxPrice > 500){
            alert("Max price must not exceed 500");
        }

        else{
            filterMinPrice = selMinPrice;
            filterMaxPrice = selMaxPrice;

            //must use 'hasParam' parameter whenever a query string needs to be constructed - otherwise may
            //return improper pagination
            if((filterCategories.length == 0) && (filterMinPrice > 0 || filterMaxPrice < 500)){

                window.location.href = '/search-filter/?hasParam=1&minPrice=' + filterMinPrice + '&maxPrice=' + filterMaxPrice;
            }

            else if(filterCategories.length != 0) {

                window.location.href = '/search-filter/?hasParam=1&minPrice=' + filterMinPrice + '&maxPrice=' + 
                                        filterMaxPrice + '&categories=' + filterCategories;
            
            }
            
        }
        
    }));
  
});