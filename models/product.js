class Product {
    id = 0;
    name = "";
    alias = "";
    price = 0;
    description = "";
    size = [];
    shortDescription = '';
    quantity = 0;
    deleted = false;
    categories = [];
    relatedProducts = [];
    feature = false;
    image = ""
     
    getCategories(array) {
        return JSON.parse(array)
    }

    getRelatedProducts(array) {
        return JSON.parse(array)
    }

}

class User {
    email= "";
    name= "";
    phone= "";
    password= "";
    gender= false;
   
}

export {Product, User}