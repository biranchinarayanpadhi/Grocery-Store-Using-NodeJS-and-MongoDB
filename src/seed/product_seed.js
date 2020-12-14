require("../db/db_connection")
const mongoose=require("mongoose")
const product=require("../models/product_model").product

/**
 * Category: personalcare
 */
const products=[
    new product({
        imagePath: "/images/personalcare/burstbees.jpg",
        title: "Burt's Bees Natural Moisturizing Lip Balm",
        price: 9.57,
        category:"personalcare",
        product_description: "LIP CARE: Bursting with all natural flavors, refresh and nourish your lips with Burt's Bees Moisturizing Lip Balm in four naturally nourishing flavors: Pink Grapefruit, Mango, Coconut & Pear, and Pomegranate."
    }),
    new product({
        imagePath: "/images/personalcare/cerave_cream.jpg",
        title: "CeraVe Moisturizing Cream ",
        price: 16.57,
        category:"personalcare",
        product_description: "[ HYALURONIC ACID MOISTURIZER ] With niacinamide, ceramides and MVE technology for 24 hour hydration. Rich, velvety texture that leaves skin feeling smooth, it is absorbed quickly for softened skin without greasy, sticky, feel"
    }),

    new product({
        imagePath: "/images/personalcare/cerave_lotion.jpg",
        title: "CeraVe Moisturizing Cream ",
        price: 17.78,
        category:"personalcare",
        product_description: "[ DAILY MOISTURIZING LOTION ] Smooth, light-weight texture that is absorbed quickly, leaving skin feeling smooth and hydrated, never greasy."
    }),

    new product({
        imagePath: "/images/personalcare/cetaphil_skin_cleanser.jpg",
        title: "Cetaphil Gentle Skin Cleanser ",
        price: 11.98,
        category:"personalcare",
        product_description: "CETAPHIL GENTLE SKIN CLEANSER: For daily use to gently clean, hydrate and soothe sensitive skin."
    }),

    new product({
        imagePath: "/images/personalcare/dove_deep_moisture.jpg",
        title: "Dove Body Wash  ",
        price: 8.23,
        category:"personalcare",
        product_description: "MILD AND PH-BALANCED: Dove body wash includes Moisture Renew Blend—a combination of skin-natural nourishers and plant-based moisturizers that absorb deeply into the top layers of skin."
    }),
 
    new product({
        imagePath: "/images/personalcare/dove_soap.jpg",
        title: "Dove Beauty Bar  ",
        price: 15.28,
        category:"personalcare",
        product_description: "GENTLE ON SENSITIVE SKIN: Effectively wash away bacteria and nourish your skin with Dove Sensitive Skin Beauty Bar. With its hypoallergenic formula, it gently cleanses for softer skin."
    }),

    new product({
        imagePath: "/images/personalcare/makeup_remover.jpg",
        title: "Neutrogena Makeup Remover Wipes",
        price: 8.45,
        category:"personalcare",
        product_description: "Twin pack of 25 count soft, pre-moistened Neutrogena Makeup Remover Cleansing Face Wipes to remove makeup and effectively cleanse skin in one easy step."
    }),

    new product({
        imagePath: "/images/personalcare/miracle_patch.jpg",
        title: "Rael Acne Pimple Healing Patch ",
        price: 15.99,
        category:"personalcare",
        product_description: "MADE WITH HIGH-GRADE HYDROCOLLOID: Adhere directly to the skin and extract all the pus and impurities straight from the source."
    }),

    new product({
        imagePath: "/images/personalcare/neutrogena_water_gel.jpg",
        title: "Neutrogena Hydro Boost Water Gel ",
        price: 15.33,
        category:"personalcare",
        product_description: "1.7-fluid ounce jar of Neutrogena Hydro Boost hydrating water-gel face moisturizer with hyaluronic acid to hydrate dry skin."
    }),

    new product({
        imagePath: "/images/personalcare/pronamel.jpg",
        title: "Sensodyne Pronamel Gentle Teeth Whitening ",
        price: 19.33,
        category:"personalcare",
        product_description: "Three 4 oz tubes of Alpine Breeze flavored Sensodyne Pronamel Gentle Teeth Whitening Enamel Toothpaste for Sensitive Teeth, to Reharden and Strengthen Enamel."
    }),

    new product({
        imagePath: "/images/personalcare/tree_hut.jpg",
        title: "Tree Hut Shea Sugar Scrub ",
        price: 5.33,
        category:"personalcare",
        product_description: "100% PURE NATURAL SHEA BUTTER - Premium deep moisturizer that wonderfully softens and smooths dry cracked skin."
    }),
  
    new product({
        imagePath: "/images/personalcare/truskin_serum.jpg",
        title: "TruSkin Vitamin C Serum for Face  ",
        price: 20.33,
        category:"personalcare",
        product_description: "Advanced Antioxidant Serum - An indispensable nutrient for collagen production, vitamin C synergistically blends with Botanical Hyaluronic Acid and Vitamin E in this advanced formula designed to target the most common signs of aging including brightness, firmness, fine lines, wrinkles, dark spots & sun spots."
    }),

    /**
     * Category: fruits
     */

    new product({
        imagePath: "/images/fruits/avocados.jpeg",
        title: "Medium Hass Avocados",
        price: 2.47,
        price_description: "4-6 Count Bag",
        product_description: "Medium Hass Avocados aren't just great-tasting fresh produce items, but they are a nutrient-dense food enjoyed around the world. ",
        category:"fruits"

    }),
    new product({
        imagePath: "/images/fruits/bananas.jpeg",
        title: "Bananas",
        price: 0.19,
        category:"fruits",
        price_description: "0.19 each or 47.0/lb",
        product_description: "Each banana is a versatile fruit that's packed with potassium and dietary fiber to help maintain a balanced and nutritional diet."
    }),

    new product({
        imagePath: "/images/fruits/black_plums.jpeg",
        title: "Black Plums",
        category:"fruits",
        price: 0.19,
        price_description: "0.47 each or $1.58/lb",
        product_description: "It provides fiber and essential vitamins and minerals. Black plums are no exception. They contain vitamin A and other vitamins and minerals."
    }),

    new product({
        imagePath: "/images/fruits/blackberries.jpeg",
        title: "Fresh Blackberries, 6 oz",
        category:"fruits",
        price: 2.28,
        price_description: "38.0/oz",
        product_description: "Use them make a sweet, crunchy blackberry cobbler, bake them into delicious blackberry scones, or pan roast chicken thighs with blackberries and thyme, or create a mouthwatering blackberry jam for biscuits and toast."
    }),

    new product({
        imagePath: "/images/fruits/cantaloupe.jpeg",
        title: "Cantaloupe",
        category:"fruits",
        price: 1.88,
        price_description: "each $1.88",
        product_description: "Treat yourself to the refreshing flavor of a fresh Cantaloupe. Enjoy this tasty melon on its own as a healthy snack or incorporate it into a variety of delicious recipes. "
    }),

    new product({
        imagePath: "/images/fruits/clementines.jpeg",
        title: "Clementines, 3lb bag",
        category:"fruits",
        price: 3.44,
        price_description: "$1.15/lb",
        product_description: "Mandarins are the coveted leader of the citrus category—high in Vitamin C, and an immunity boosting superfood. "
    }),

    new product({
        imagePath: "/images/fruits/fresh_strawberries.jpeg",
        title: "Fresh Strawberries, 1 lb",
        category:"fruits",
        price: 2.88,
        price_description: "18.0/oz",
        product_description: "The sweet, juicy flavor of Fresh Strawberries make them a refreshing and delicious treat. Enjoy them for breakfast, lunch, dinner, or dessert. "
    }),

    new product({
        imagePath: "/images/fruits/fuji_apples.jpeg",
        title: "Fuji Apples, each",
        category:"fruits",
        price: 0.74,
        price_description: "$ 1.24/lb",
        product_description: "Treat your family to the healthy taste of Fuji Apples. Low in calories, these crisp and crunchy apples can be a satisfying afternoon snack, or you can use them in a variety of recipes. "
    }),

    new product({
        imagePath: "/images/fruits/green_seedless_grapes.jpeg",
        title: "Green Seedless Grapes, 2 lb",
        category:"fruits",
        price: 2.63,
        price_description: "$ 1.17/lb",
        product_description: "Green Seedless Grapes are the perfect sweet snack that your whole family will enjoy. The grapes are crisp and sweet and make an excellent addition to your breakfast, lunch, dinner or snack.  "
    }),

    new product({
        imagePath: "/images/fruits/kiwis.jpeg",
        title: "Kiwi, 1 Each",
        category:"fruits",
        price: 0.38,
        price_description: "$0.38/piece",
        product_description: "They are packed with Vitamin C, fiber and antioxidants. They’re also fat-free and have a low glycemic index."
    }),

    new product({
        imagePath: "/images/fruits/lemon_juice.jpeg",
        title: "Concord Foods Lemon Juice, 4.5 oz",
        category:"fruits",
        price: 0.88,
        price_description: "19.6 cents/LB",
        product_description: "Concord Foods Lemon Juice will add zest and flavor to your favorite recipes. Use this lemon juice in sweet treats like lemon thumbprint cookies, lemon snowball cookies, or cheesecake lemon bars. You can also use it to add flavor to savory foods like lemon chicken or lemon spinach dip."
    }),

    new product({
        imagePath: "/images/fruits/lemons.jpeg",
        title: "Lemons, each",
        category:"fruits",
        price: 0.48,
        price_description: "$0.48 per piece",
        product_description: "Stock up on several of these juicy Lemons to enjoy with each day while meal planning. Squeeze a few to make delicious homemade lemonade and provide a healthy dose of vitamin C to your diet."
    }),

    new product({
        imagePath: "/images/fruits/mango_spears.jpeg",
        title: "Freshness Guaranteed Mango Spears 16 oz",
        category:"fruits",
        price: 4.68,
        price_description: "29.3 cents/OZ",
        product_description: "Snack on your favorite tropical fruit the quick and convenient way with this pack of Mango Spears. This package contains 16 oz of fresh mangoes that have been pre-sliced for your instant enjoyment."
    }),

    new product({
        imagePath: "/images/fruits/pineapple_chunks.jpeg",
        title: "Freshness Guaranteed Pineapple Chunks, 16 oz",
        category:"fruits",
        price: 3.88,
        price_description: "24.8 cents/OZ",
        product_description: "These pre-cut chunks are great for breakfast, lunch, dessert, or when you want a snack. Pineapple is a good source of vitamin C, vitamin A and vitamin B6 making them an excellent healthy treat."
    }),

    new product({
        imagePath: "/images/fruits/pineapple.jpeg",
        title: "Pineapple",
        category:"fruits",
        price: 1.88,
        price_description: "24.8 cents/OZ",
        product_description: "Pineapple is a good source of vitamin C, vitamin A and vitamin B6 making them an excellent healthy treat."
    }),

    new product({
        imagePath: "/images/fruits/plantains.jpeg",
        title: "Plantains",
        price: 0.50,
        category:"fruits",
        price_description: "0.50 per piece",
        product_description: "Bring the taste of the islands to any meal with our Fresh Plantains. Plantains are sweet like a banana, but without the banana flavor. They can be eaten raw but are generally used in cooking and are delicious when fried or caramelized."
    }),

    new product({
        imagePath: "/images/fruits/raspberries.jpeg",
        title: "Fresh Raspberries, 6 oz",
        price: 2.18,
        category:"fruits",
        price_description: "36.3/oz",
        product_description: "Enjoy them for breakfast, lunch, dinner, or dessert. Use them as topping for decadent chocolate cake, bake them in mouthwatering scones, or create a tangy sauce and serve it over a grilled salmon fillet, or puree them for a sweet jam."
    }),

    new product({
        imagePath: "/images/fruits/seedless_grapes.jpeg",
        title: "Fresh Red Seedless Grapes, per lb",
        price: 2.99,
        category:"fruits",
        price_description: "$1.33/lb",
        product_description: "Red Seedless Grapes are the perfect sweet snack that your whole family will enjoy. The grapes are crisp and sweet and make an excellent addition to your breakfast, lunch, dinner or snack."
    }),

    new product({
        imagePath: "/images/fruits/watermelon.jpeg",
        title: "Personal Watermelon, each",
        price: 3.48,
        category:"fruits",
        price_description: "$3.48 per piece",
        product_description: "Mini Watermelon, 1 Each.May contain occasional seeds"
    }),

    new product({
        imagePath: "/images/fruits/yellow_nectarines.jpeg",
        title: "Yellow Nectarines, each",
        price: 1.48,
        category:"fruits",
        price_description: "$1.48/lb",
        product_description: "Fresh Yello Nectarines"
    }),

    /**
     * Category: vegetables
     */

    new product({
        imagePath: "/images/vegetables/asparaguch_bunch.jpeg",
        title: "Asparagus, Bunch",
        price: 2.48,
        price_description: "each 2.48/LB",
        category:"vegetables",
        product_description: "This asparagus is loaded with nutrients and has a great fresh taste. This versatile vegetable can be prepared in a myriad of different ways."
    }),
    new product({
        imagePath: "/images/vegetables/baby_cut_carrots.jpeg",
        title: "Bolthouse Farms Peeled Baby Cut Carrots, 1 lb Bag",
        price: 0.98,
        category:"vegetables",
        price_description: "98.0cents/LB",
        product_description: "Bolthouse Farms baby carrots have a crisp texture. These Bolthouse Farms baby carrots don't have any preservatives. Enjoy them at any time of the day."
    }),
    new product({
        imagePath: "/images/vegetables/baby_yellow_potato.jpeg",
        title: "Baby Yellow Potatoes, 1.5 lb Bag",
        price: 3.47,
        category:"vegetables",
        price_description: "14.5cents/OZ",
        product_description: "Melissa's Baby Yellow Potatoes are hand selected for excellent quality. Firm, well-shaped, and smooth, these potatoes can be cooked in almost any way imaginable. They have a wonderful, buttery texture and flavor when baked, roasted, boiled, steamed, sauteed, or mashed."
    }),
    new product({
        imagePath: "/images/vegetables/broccoli.jpeg",
        title: "Broccoli Crowns",
        price: 1.11,
        category:"vegetables",
        price_description: "each 1.48/lb",
        product_description: "Broccoli crowns are the premium cut of broccoli, trimmed just under the broccoli head. Healthy & Delicious!"
    }),
    new product({
        imagePath: "/images/vegetables/cauliflower.jpeg",
        title: "Cauliflower",
        price: 1.98,
        category:"vegetables",
        price_description: "each $1.98",
        product_description: "Cauliflower (1 each) is an outstanding addition to a menu. Often used as a carb substitute, it can also make a tasty starter or main entree item."
    }),
    new product({
        imagePath: "/images/vegetables/cucumber.jpeg",
        title: "Cucumber",
        price: 0.50,
        category:"vegetables",
        price_description: "each $0.50",
        product_description: " Packed with nutritional benefits such as being naturally low in calories, carbohydrates, sodium, fat, and cholesterol, cucumbers also provide potassium, fiber, and vitamin C and clock in at a cool 16 calories per cup."
    }),
    new product({
        imagePath: "/images/vegetables/eggplant.jpeg",
        title: "Eggplant",
        category:"vegetables",
        price: 1.23,
        price_description: "each 98.0/lb",
        product_description: "Eggplants are incredibly versatile and can be used to make a myriad of different recipes. Try them coated in breadcrumbs and fried or a comforting side, or for a healthier option you can stuff them and roast them in the oven."
    }),
    new product({
        imagePath: "/images/vegetables/fresh_celery.jpeg",
        title: "Fresh Celery",
        category:"vegetables",
        price: 0.88,
        price_description: "each 0.88",
        product_description: " Celery is a low-calorie vegetable that consists mostly of water but is packed full of antioxidants and fiber."
    }),
    new product({
        imagePath: "/images/vegetables/fresh_corn_cub.jpeg",
        title: "Fresh Corn on the Cob",
        category:"vegetables",
        price: 0.38,
        price_description: "0.38/piece",
        product_description: "There's nothing like freshly picked corn straight from the fields, cooked until the kernels are tender and bursting with sweet juice! This summer staple is perfect for casual dinners, BBQs, picnics, and camping trips."
    }),
    new product({
        imagePath: "/images/vegetables/fresh_ginger_root.jpeg",
        title: "Fresh Ginger Root",
        category:"vegetables",
        price: 1.98,
        price_description: "$1.98/lb",
        product_description: "Fresh Ginger Root has a light brown, textured skin and white to yellow flesh. Its peppery, pungent, zesty flavor is a great way to bring acidity and just a touch of sweetness to juices, teas, stir-fries, and more."
    }),
    new product({
        imagePath: "/images/vegetables/garlic.jpeg",
        title: "Garlic",
        price: 3.48,
        category:"vegetables",
        price_description: "$3.48/lb",
        product_description: "Garlic's signature flavors become caramelized and sweeter when cooked, making it a perfect accompaniment to many dishes such as pasta, shrimp, chicken, stews, and more."
    }),
    new product({
        imagePath: "/images/vegetables/green_beans.jpeg",
        title: "Green Beans",
        price: 1.68,
        category:"vegetables",
        price_description: "$1.68/lb",
        product_description: "These beans are an excellent source of vitamin A and vitamin C. Serve as is or add your favorite spices for additional flavor."
    }),
    new product({
        imagePath: "/images/vegetables/green_bell_pepper.jpeg",
        title: "Green Bell Pepper",
        price: 0.58,
        category:"vegetables",
        price_description: "$0.58 per piece",
        product_description: "This vegetable contains essential vitamins such as A and C, and minerals including calcium and magnesium. Green bell pepper, also known as green capsicum, has a crisp flavor that enhances a variety of recipes."
    }),
    new product({
        imagePath: "/images/vegetables/green_cabbage.png",
        title: "Green Cabbage",
        price: 1.74,
        category:"vegetables",
        price_description: "$58.0 cent/LB",
        product_description: "Green cabbage is low in calories and high in fiber and antioxidants making it a great part of any healthy diet. Best of all, this cabbage can be used a myriad of different recipes and cuisines."
    }),
    new product({
        imagePath: "/images/vegetables/green_onion_bunch.jpeg",
        title: "Green Onion, bunch",
        price: 0.50,
        category:"vegetables",
        price_description: "$ 0.50 /bunch",
        product_description: "Green Onions are a versatile addition to your kitchen pantry. They have a fresh from garden taste that makes them perfect for a variety of mouthwatering recipes."
    }),

    new product({
        imagePath: "/images/vegetables/iceberg_lettuce.jpeg",
        title: "Iceberg Lettuce",
        price: 1.53,
        category:"vegetables",
        price_description: "$ 1.53 each",
        product_description: "This lettuce is loaded with nutrients, has a mild sweetness, and is highly crisp for a perfect bite every time. You can use it to create your very own personalized salad tossed with your favorite vegetables, protein, croutons, nuts and dressing."
    }),

    new product({
        imagePath: "/images/vegetables/marketside_chicken_ceasar_salad_bowl.jpeg",
        title: "Marketside Chicken Caesar Salad Bowl 6.25 oz",
        price: 2.98,
        category:"vegetables",
        price_description: "47.7/OZ",
        product_description: "Marketside Chicken Caesar Salad Bowl offers you a complete and delicious meal in a nifty, ready to go, sealed bowl. Complete with crisp romaine lettuce, white meat chicken, parmesan style cheese and Caesar dressing, this healthy salad is sure to fill your craving for something fresh."
    }),

    new product({
        imagePath: "/images/vegetables/marketside_organic_baby_spinach.jpeg",
        title: "Marketside Organic Baby Spinach, 5 oz",
        price: 2.56,
        category:"vegetables",
        price_description: "51.2cents/OZ",
        product_description: "Marketside Organic Baby Spinach has a smooth, tender texture and great fresh taste that is loaded with nutrients. This spinach is packed fresh, washed and ready to eat for your convenience."
    }),

    new product({
        imagePath: "/images/vegetables/marketside_southwest_chooped_salad.jpeg",
        title: "Marketside Southwest Chopped Salad Kit, 10.3 oz",
        price: 2.98,
        category:"vegetables",
        price_description: "23.1/oz",
        product_description: "Marketside Southwest Chopped Salad Kit comes loaded with a refreshing mix of green cabbage, green leaf lettuce, kale, red cabbage, carrots, green onions, tortilla strips, cheddar cheese and chipotle dressing."
    }),

    new product({
        imagePath: "/images/vegetables/marketside_sugar_snap_peas.jpeg",
        title: "Marketside Sugar Snap Peas, 8oz",
        price: 2.58,
        category:"vegetables",
        price_description: "32.3/oz",
        product_description: "Marketside Sugar Snap Peas 8oz."
    }),

    new product({
        imagePath: "/images/vegetables/mixed_bell_pepper.jpeg",
        title: "Mixed Bell Peppers (Selection May Vary), 3 Count",
        price: 3.28,
        category:"vegetables",
        price_description: "3.28 /3 piece",
        product_description: " These Bell Peppers are a type of sweet pepper with many health benefits and a high amount of Vitamins A and C. Best of all this versatile pepper can be used both fresh and cooked in a myriad of recipes."
    }),

    new product({
        imagePath: "/images/vegetables/red_onion.jpeg",
        title: "Red Onions",
        price: 0.78,
        category:"vegetables",
        price_description: "98.0cents/LB",
        product_description: "These onions are perfect for adding to your favorite recipes. Add them to your favorite pasta sauces; use them to top pizza; enhance the flavors of your soups, stews, and gumbo, incorporate them into meatloaf; or make delicious omelets or hearty casseroles."
    }),


    new product({
        imagePath: "/images/vegetables/roma_tomato.jpeg",
        title: "Roma Tomatoes",
        price: 0.98,
        category:"vegetables",
        price_description: "98.0/lb",
        product_description: "Roma tomatoes are an ideal ingredient for whipping up a variety of wonderful dishes. You can use them to create a zesty tomato sauce for stirring into a homemade pasta dish, crush them up to make a delightful Roma tomato bruschetta, or simply enjoy them on their own as a nutritious snack or as a party platter option for dipping in your favorite vegetable dipping sauce."
    }),

    new product({
        imagePath: "/images/vegetables/russet_potato.jpeg",
        title: "Simply Perfect Russet Potatoes, 5lb bag",
        price: 1.97,
        category:"vegetables",
        price_description: "39.4/lb",
        product_description: "Use russet potatoes to create a variety of cooked and baked dishes- from creamy, flavorful mashed potatoes, to fluffy, filling baked potatoes topped with cheese, bacon, and sour cream, or cheesy, succulent au gratin potatoes."
    }),

    new product({
        imagePath: "/images/vegetables/serrano_peppers.jpeg",
        title: "Serrano Peppers, approx. 8-12 per 0.25 lb",
        price: 0.27,
        category:"vegetables",
        price_description: "$1.4/lb",
        product_description: "Naturally low in calories, fat, and cholesterol, this vegetable is a great source of vitamins C, B6, and A, as well as iron and magnesium. Serrano peppers have a bright and biting flavor that enhances a variety of recipes."
    }),

    new product({
        imagePath: "/images/vegetables/spinach.jpeg",
        title: "Marketside Fresh Spinach, 10 oz",
        price: 1.37,
        category:"vegetables",
        price_description: "$13 cents/OZ",
        product_description: "Use it to create your very own personalized salad tossed with your favorite vegetables, protein, nuts and dressing. Use it as a topping on sandwiches and pizzas, or simply enjoy it as a healthy side."
    }),

    new product({
        imagePath: "/images/vegetables/sweet_potatoes.jpeg",
        title: "Sweet Potatoes",
        price: 0.54,
        category:"vegetables",
        price_description: "67.0/lb",
        product_description: "These versatile vegetables can be used to make savory sides or sweet treats. Try them roasted or baked for a tasty addition to any dish. You could also use them to make seasoned sweet potato fries or a flavorful hummus dip for your next party."
    }),


    new product({
        imagePath: "/images/vegetables/tomatoes.jpeg",
        title: "Tomatoes on the Vine, avg 1.4 lb cluster",
        price: 1.48,
        category:"vegetables",
        price_description: "each 1.48/lb",
        product_description: "Tomatoes are truly a ruler of the kitchen, and our Tomatoes on the Vine double down the flavor, taste, and color you've come to count on. Each cluster has four to five tomatoes with high sugar content, bright red color and medium sizing."
    }),

    new product({
        imagePath: "/images/vegetables/white_mushroom.jpeg",
        title: "Fresh White Mushrooms, 8 oz",
        price: 1.38,
        category:"vegetables",
        price_description: "17.3/oz",
        product_description: "This versatile ingredient is perfect for a variety of dishes, whether its for breakfast, lunch, or dinner. Mince some up and put them in your omelet with peppers and ham for a filling breakfast."
    }),

    new product({
        imagePath: "/images/vegetables/whole_carrot.jpeg",
        title: "Whole Carrots, 1lb bag",
        price: 0.82,
        category:"vegetables",
        price_description: "82.0 cents/LB",
        product_description: " This 1 lb. Bag of Whole Carrots can make a versatile addition to various meals. They have a crisp crunch and a bold taste. These California carrots are easy to cut into pieces for adding to a stew, pot roast or meat pie."
    }),

    new product({
        imagePath: "/images/vegetables/yellow_onion.jpeg",
        title: "Yellow Onions 3 lb Bag",
        price: 1.94,
        category:"vegetables",
        price_description: "64.7cents/LB",
        product_description: "They can be added to all of your favorite foods including hamburgers, stir-fries, soups, and pizza and used to make onion rings and blooming onions as well."
    }),


    new product({
        imagePath: "/images/vegetables/yellow_squash.jpeg",
        title: "Yellow Squash, 1 Each",
        price: 1.94,
        category:"vegetables",
        price_description: "$1.38/lb",
        product_description: "These versatile vegetables can be used to make savory sides or sweet treats. Try them dipped in batter and fried for a comforting side or, for a healthier option, you can make a filling squash and chicken chowder, or roast them in the oven stuffed with ground turkey."
    }),


    new product({
        imagePath: "/images/vegetables/zucchini.jpeg",
        title: "Zucchini, 1 Each",
        price: 0.76,
        category:"vegetables",
        price_description: "$1.38/lb",
        product_description: "This Zucchini, Each provides a healthy dose of vitamins to add to your diet. Ideal for many types of cuisines, it can be enjoyed year-round in many recipes. It can be used as a simple side dish, sauteed in oil, herbs and spices."
    })
]

for (var i=0;i<products.length;i+=1){
    products[i].save()
}

