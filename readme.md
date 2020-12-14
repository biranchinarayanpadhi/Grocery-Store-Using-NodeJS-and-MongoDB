<h3>Welcome to Green Mart Groceries!</h3>  

This website has been designed to make purchase of groceries convenient for the customers with a user-friendly user interface. Currently the online store offers products from fruits, vegetables and personal care categories only.

Although this website has not implemented the digital payment functionalities yet, but it does offer
other features which, we hope, the users will surely enjoy. Some of the major functionalities of
this website are provided below.  

<h4>1. APPLICATION FUNCTIOANILITIES:</h4>  

• Users can browse the store, add items to the cart and checkout as either Guest Users or as
Registered Users by creating a user account  
• Email and password fields are validated during user sign-in/signup process to ensure
criteria are met .  
• User passwords are kept secured by storing only the password hashes into the database.    
• Users can view the detailed description of a product by clicking on the product title.    
• This website supports pagination and each page displays up to 15 products at a time.    
• Users have the option to search and filter products.    
o This website supports both partial and full search.    
o Users can filter products by categories and/or by price range  
• Users can add/remove items from their cart.    
• Users can fill out their shipping details on the checkout page  
• Once an order is placed, the order gets stored in the database and the users can retrieve
their order history from the website.    
• Admin users have the additional privileges to add new products to the store by providing  
details such as title, price, product description, price description and uploading product
images.    
• Admin users is also provided with Search Functionality to search products and have the
option to edit, delete(soft delete) and update products.  


<h4>2. DATABASE DESIGN</h4>  
In this Project, there are 3 Data Models that we use to store Data in MongoDB. Those models are:  
        1.User Model: For Storing the User Details(If the User has signed up with GreenMart!).
        2.Product Model: For storing Product Data with all it’s attributes.
        3.Order Model: For storing the Order details including some attributes of User and the Products
        ordered.Below are the attributes for each of the respective Models mentioned above:

        Product Model (All the attributes are mandatory except Price Description):  

                1.ImagePath: It is assigned with the image path( as a String) of the product
                2.Title : It stores the title of the product to be displayed in the Web Page as a String.
                3.Price: It Stores the Price of the Product as a Number(includes Float as well).
                4.Price Description : It stores the description of the Price in details as a String
                5. Product Description : It is assigned with the description of the products as a String.
                6. Category : It defines the category in which the product type falls into as a String..
                7. is_Deleted : This attribute is a Boolean type used to check if the product should be
                displayed in the webpage or not.

        Order Model(All the attribute are Mandatory and defined as required in model):
                1. orderId: It stores an Unique Id for each Order being placed in the Green Mart as a String
                2. user_email: It contains the User Email address which is the same as used for loggin in.
                3. user_name: It is assigned with User Name as a String.
                4. Products: It is an Array of Product details , and each product details is stored as Jon
                        Object inside this array with following attributes.
                                a. Title
                                b. Quantity
                                c. Category
                                d. imagePath
                                e. total_product_price
                5. User_address: It contains Shipping Address provided by the user during checkout as a
                        String.
                6. User_zipcode: It is assigned with zipcode provided by the User during checkout.
                7. User_country : Defines the Country provided by User during checkout
                8. User_state : Defines the state provided by the User during checkout
                9. Total_price: It stores the total price summing each of the total_product_price.
                10. Payment_status: Stores Boolean to confirm the payment Status.
                11. Date: It stores the date when the Order was placed.
                12. Time: It stores the time when the Order was placed.

        User Model(All the attributes are mandatory and defined as required in the model):
                1. User_email: Email which is used to Sign in .
                2. Password: It is stored as the hash value in the DB.
                3. Is_admin: It is used to verify if an user logged in is Admin or not. If it is Admin user ,
                        the extra feature of adding/updating/deleting product is included in the NavBar.

<h4>3. LANGUAGES/FRAMEWORK USED</h4>  
        Node.js, Express.js, JavaScript/jQuery, Handlebars, Bootstrap and MongoDB are used. Object
        modeling is done using Mongoose. In order to persist session data, express-session module is used.