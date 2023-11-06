
document.addEventListener('DOMContentLoaded', () => {
    const rightContainer = document.querySelector('.rightContainer');


    //ADD EVENT LISTENER TO PRODUCT DESIGN 
    const productManager = document.querySelector('#productDesign');
    productManager.addEventListener('click', () => {



        fetch('DesignProduct.html')
            .then(response => response.text())
            .then(html => {
                // Use the loaded HTML content
                rightContainer.innerHTML = html;


                const selectCategory = document.getElementById('selectCategoryDropdown');
                const subcategory = document.getElementById('selectSubCategoryDropdown');
                const Brand = document.getElementById('selectBrandDropdown');
                const size = document.getElementById('selectSizeDropdown');


                //fetching categories in drop down

                fetch('http://localhost:5000/api/getAllCategories') // Assuming this is the correct URL
                    .then(response => response.json())
                    .then(categories => {
                        categories.forEach(category => {
                            var option = document.createElement('option');
                            option.value = category._id;
                            option.text = category.categoryName;
                            selectCategory.appendChild(option);
                        });
                    })
                    .catch(error => console.error('Error:', error));

                //fetching subcategories in drop down

                fetch('http://localhost:5000/api/getAllSubCategories') // Assuming this is the correct URL
                    .then(response => response.json())
                    .then(categories => {
                        categories.forEach(category => {
                            var option = document.createElement('option');
                            option.value = category._id;
                            option.text = category.SubcategoryName;
                            subcategory.appendChild(option);
                        });
                    })
                    .catch(error => console.error('Error:', error));

                //fetching brands in drop down

                fetch('http://localhost:5000/api/getAllBrands')
                    .then(response => response.json())
                    .then(categories => {
                        categories.forEach(category => {
                            var option = document.createElement('option');
                            option.value = category._id;
                            option.text = category.brandName;
                            Brand.appendChild(option);
                        });
                    })
                    .catch(error => console.error('Error:', error));

                //fetching allsizes in drop down

                fetch('http://localhost:5000/api/getAllSizes')
                    .then(response => response.json())
                    .then(categories => {
                        categories.forEach(category => {
                            var option = document.createElement('option');
                            option.value = category._id;
                            option.text = category.size;
                            size.appendChild(option);
                        });
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));

        //Add size button onclick
        document.addEventListener('click', () => {

            if (event.target.id === 'addSizeToListBtn') {

                const selectElement = document.getElementById('selectSizeDropdown')
                const selectedIndex = selectElement.selectedIndex;
                const selectedOption = selectElement.options[selectedIndex];
                const selectedText = selectedOption.text;

                const sizeBox = document.querySelector('.addedSizes');
                const list = sizeBox.querySelector('#sizeList');
                const textElement = document.createElement('li');
                textElement.innerText = selectedText;
                textElement.style.backgroundColor = '#d7d7d7';
                list.style.color = '#00000';
                list.appendChild(textElement);



            }

        })



        //set button color 
        document.querySelector('#ProductDesignBtn').style.background = '#ffff';
        document.querySelector('#productDesign').style.color = "#151515";
        //setting other as normal
        document.querySelector('#AttributesBtn').style.background = '#232D3D';
        document.querySelector('#AttributesManager').style.color = '#ffff';




    });

    // Attributes manager onclick
    const AttributesManager = document.querySelector('#AttributesManager');
    AttributesManager.addEventListener('click', () => {
        rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="brand">Brands</h4><h4 id="sizes">Sizes</h4></div>';

        document.querySelector('#AttributesBtn').style.background = '#ffff';
        document.querySelector('#AttributesManager').style.color = '#151515';

        //set other normal
        document.querySelector('#ProductDesignBtn').style.background = '#232D3D';
        document.querySelector('#productDesign').style.color = "#ffff";
        document.querySelector('#pushProduct').style.background = '#232D3D';
        document.querySelector('#pushProduct').style.color = "#ffff";


    });




    // CategoryAddBtn OnClickListener
    document.addEventListener('click', async (event) => {


        //pencilBtn onClick
        if (event.target.classList == 'pencilImg') {



            var editableContent = this.closest('.editable-content');
            var editInput = editableContent.querySelector('.edit-input');
            var saveButton = editableContent.querySelector('.save-button');

            editableContent.classList.toggle('editing');

            if (editableContent.classList.contains('editing')) {
                editInput.style.display = 'block';
                saveButton.style.display = 'block';
                editInput.value = editableContent.querySelector('h3').textContent;
            } else {
                var editedText = editInput.value;
                editableContent.querySelector('h3').textContent = editedText;
                editInput.style.display = 'none';
                saveButton.style.display = 'none';
            }
        }


        //psuhProductToStore
        if (event.target.id == 'addProductToStoreBtn') {

            const productId = document.querySelector('.productIdHere').getAttribute('_id');
            const productName = document.getElementById('fProductName').innerText;
            const description = document.getElementById('fProductDescription').innerText;
            const discount = document.getElementById('fDiscount').innerHTML;
            const subcategory = document.getElementById('fProductSubcategory').innerText;
            const category = document.getElementById('fProductCategory').innerText;
            const shortDescription = document.getElementById('fProductShortDescription').innerText
            const designNo = document.getElementById('fDesignNo').innerText;
            const price = document.getElementById('fSalePrice').innerText;


            const data2 = {
                categoryName: category,
                subcategoryName: subcategory,
                shortProductDescription: shortDescription,
                Description: description,
                designNumber: designNo,
                productPrice: price,
                productDiscount: discount
            };

            //sending to database

            fetch('http://localhost:5000/api/addToStore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data2)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Data sent successfully:', data);
                    alert("added to store");


                })
                .catch(error => {
                    console.error('Error sending data');
                });

            //erasing fields here
            productName.innerHTML = "";
            description.innerHTML = "";
            discount.innerHTML = "";
            subcategory.innerHTML = "";
            category.innerHTML = "";
            shortDescription.innerHTML = "";
            designNo.innerHTML = "";
            price.innerHTML = "";

            //delete the product from build product database
            const productIdToDelete = productId; // Replace with the actual product ID you want to delete

            fetch('http://localhost:5000/api/deleteProduct', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: productIdToDelete }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data.message); // Output the response from the server
                })
                .catch(error => {
                    console.error('Error:', error);
                });




            alert("Product Added to store Successfully !" + productId)






        }

        //AddProduct To store button on click function 
        if (event.target.id === 'pushProduct') {

            //     document.querySelector('#pushProductBtn').style.background = "#ffff";
            //     document.querySelector('#pushProduct').style.color = '#000000';

            //     //set other normal

            // document.querySelector('#ProductDesignBtn').style.background = '#232D3D';
            // document.querySelector('#productDesign').style.color = "#ffff";

            // document.querySelector('#AttributesManagerBtn').style.background = '#232D3D';
            // document.querySelector('#AttributesManager').style.color = "#ffff";






            fetch('addProductToStore.html')
                .then(response => response.text())
                .then(html => {
                    // Use the loaded HTML content
                    rightContainer.innerHTML = html;

                    ;
                })
                .catch(error => console.error('Error:', error));


            //fetch the products data from database.

            // Function to fetch products from the API
            async function fetchProducts() {
                const response = await fetch('http://localhost:5000/api/products'); // Assuming the API endpoint is at '/api/products'
                const data = await response.json();
                return data;
            }

            // Function to add a product card to the addProductLeft div
            function addProductCard(product) {
                const addProductLeft = document.getElementById('addProductList');

                const card = document.createElement('div');
                card.className = 'product-card';
                card.id = product._id;
                card.style.width = "200px";
                const image = document.createElement('img');
                image.className = 'product-image';
                image.style.height = "200px";
                image.src = product.image;
                image.alt = 'Product Image';

                const content = document.createElement('div');
                content.className = 'product-content';

                const productName = document.createElement('h5');
                productName.className = 'product-name';
                productName.textContent = product.name;

                const shortDescription = document.createElement('p');
                shortDescription.className = 'product-description';
                shortDescription.textContent = product.shortDescription;

                content.appendChild(productName);
                content.appendChild(shortDescription);

                card.appendChild(image);
                card.appendChild(content);

                // Add an onclick event handler
                card.onclick = function () {
                    productHandleClick(product._id);
                };



                addProductLeft.appendChild(card);
            }


            function productHandleClick(productId) {



                //getting right product conatiner ref
                productRight = document.querySelector('.productRight');


                fetch('displayBuildProduct.html')
                    .then(response => response.text())
                    .then(html => {
                        // Use the loaded HTML content
                        productRight.innerHTML = html;

                        ;
                    })
                    .catch(error => console.error('Error:', error));

                // alert(productId);


                document.querySelector('.productIdHere').setAttribute('_id', productId);



                //fetching the product data from database
                // Fetch a specific product by _id
                fetch('http://localhost:5000/api/productById', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id: productId })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json(); // Parse the response JSON
                    })
                    .then(data => {
                        const productNameElement = document.getElementById('fProductName');
                        const descriptionElement = document.getElementById('fProductDescription');
                        const discountElement = document.getElementById('fDiscount');
                        const shortDescriptionElement = document.getElementById('fProductShortDescription');
                        const designNoElement = document.getElementById('fDesignNo');
                        const priceElement = document.getElementById('fSalePrice');

                        // Assigning values from response to the elements
                        productNameElement.innerText = data.name;
                        descriptionElement.innerText = data.description;
                        discountElement.innerHTML = data.discount;
                        shortDescriptionElement.innerText = data.shortDescription;
                        designNoElement.innerText = data.designNumber;
                        priceElement.innerText = data.price;

                        console.log('Fetched product:', data);
                    })
                    .catch(error => {
                        console.error('Error fetching product:', error);
                    });






            }


            // Fetch products and add them to the addProductLeft div
            fetchProducts()
                .then(products => {
                    products.forEach(product => {
                        addProductCard(product);
                    });
                })
                .catch(error => console.error('Error fetching products:', error));



            //change the color of Button 


        }

        //create product button Event listener
        if (event.target.id === 'createProduct') {



            //getting product data
            const categoryText = document.getElementById('selectCategoryDropdown').options[document.getElementById('selectCategoryDropdown').selectedIndex].text;
            const subcategoryText = document.getElementById('selectSubCategoryDropdown').options[document.getElementById('selectSubCategoryDropdown').selectedIndex].text;
            const BrandText = document.getElementById('selectBrandDropdown').options[document.getElementById('selectBrandDropdown').selectedIndex].text;
            //const Text = document.getElementById('selectCategoryDropdown').options[document.getElementById('selectCategoryDropdown').selectedIndex].text;
            // alert(categoryText+subcategoryText+BrandText);
            const sizeList = document.getElementById('sizeList').getElementsByTagName('li');

            const sizeArray = [];

            for (var i = 0; i < sizeList.length; i++) {

                sizeArray.push(sizeList[i].textContent);

            }

            const shortDescription = document.getElementById('shortDescription').value
            const description = document.getElementById('Description').value
            const price = document.getElementById('productPrice').value
            const discount = document.getElementById('productDiscount').value
            const designerNo = document.getElementById('productDesignNumber').value

            //send Image to server an get link 






            // Code for uploading Image
            const inputProductImage = document.getElementById('inputProductImage');
            const files = inputProductImage.files;
            const file = files[0];

            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const pathLink = await response.text(); // Assuming the server sends the file path as plain text
                console.log('Path Link:', pathLink);

                const data3 = {
                    // name: document.getElementById()
                    categoryName: categoryText,
                    subcategoryName: subcategoryText,
                    shortProductDescription: shortDescription,
                    Description: description,
                    designNumber: designerNo,
                    productPrice: price,
                    productDiscount: discount,
                    image: pathLink
                };



                fetch('http://localhost:5000/api/buildProduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data3)
                })
                    .then(response => response.json())
                    .then(data => {




                    })
                    .catch(error => {
                        console.error('Error sending data');
                    });



                // Now you can use 'pathLink' to store in your database or do other operations
            } catch (error) {
                console.error('Error uploading file:', error);
            }













            shortDescription.text = "";
            description.text = "";
            price.text = "";
            discount.text = "";
            designerNo.text = "";
            discount.text = "";



            alert("Product Created !")











        }


        if (event.target.id === 'categoryAddBtn') {
            const input = document.querySelector('#AttributeInput');
            const url = 'http://localhost:5000/api/createCategory';
            const data = {
                name: input.value,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    document.getElementById('AttributeInput').value = "";
                    const apiUrl = 'http://localhost:5000/api/getAllCategories';
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="brand">Brands</h4><h4>Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new category</h4> <input id ="AttributeInput" type="text"></div><div><button id="addBtn">Add</button>  </div></div><h3>Available Categories</h3><div class="existingCategories"></div>';
                            const existingCategories = document.querySelector('.existingCategories');
                            data.forEach(category => {
                                const categoryItem = document.createElement('div');
                                categoryItem.classList.add('categoryItem');
                                const categoryName = document.createElement('h4');
                                categoryName.innerText = category.categoryName;
                                const deleteIcon = document.createElement('img');
                                deleteIcon.src = 'dustbin.png';
                                deleteIcon.alt = 'Delete';
                                deleteIcon.setAttribute('id', category._id);
                                deleteIcon.classList.add('dustbinIcon'); // Add dustbinIcon class
                                deleteIcon.setAttribute('data-id', category._id); // Set data-id attribute
                                categoryItem.appendChild(categoryName);
                                categoryItem.appendChild(deleteIcon);
                                existingCategories.appendChild(categoryItem);
                            });
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }






    });

    //subcategoryAddBtn onclicklistner

    document.addEventListener('click', () => {

        if (event.target.id === 'subcategoryAddBtn') {
            const input = document.querySelector('#AttributeInput');
            const url = 'http://localhost:5000/api/createSubcategory';
            const data = {
                name: input.value,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    document.getElementById('AttributeInput').value = "";
                    const apiUrl = 'http://localhost:5000/api/getAllsubcategories';
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="Brands">Brands</h4><h4>Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new subcategory</h4> <input id ="AttributeInput" type="text"></div><div><button id="subcategoryAddBtn">Add</button>  </div></div><h3>Available subcategories</h3><div class="existingCategories"></div>';
                            const existingCategories = document.querySelector('.existingCategories');
                            data.forEach(category => {
                                const categoryItem = document.createElement('div');
                                categoryItem.classList.add('categoryItem');
                                const categoryName = document.createElement('h4');
                                categoryName.innerText = category.SubcategoryName;
                                const deleteIcon = document.createElement('img');
                                deleteIcon.src = 'dustbin.png';
                                deleteIcon.alt = 'Delete';
                                deleteIcon.setAttribute('id', category._id);
                                deleteIcon.classList.add('subcategoryDustbinIcon'); // Add dustbinIcon class
                                deleteIcon.setAttribute('data-id', category._id); // Set data-id attribute
                                categoryItem.appendChild(categoryName);
                                categoryItem.appendChild(deleteIcon);
                                existingCategories.appendChild(categoryItem);


                            });
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }


    })

    // BrandAddBtn onclick Listener

    document.addEventListener('click', () => {

        if (event.target.id === 'addBrandBtn') {
            const input = document.querySelector('#AttributeInput');
            const url = 'http://localhost:5000/api/createBrand';
            const data = {
                name: input.value,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    document.getElementById('AttributeInput').value = "";
                    const apiUrl = 'http://localhost:5000/api/getAllBrands';
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="brand">Brands</h4><h4>Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new Brand</h4> <input id ="AttributeInput" type="text"></div><div><button id="addBrandBtn">Add</button>  </div></div><h3>Available Brands</h3><div class="existingCategories"></div>';
                            const existingCategories = document.querySelector('.existingCategories');
                            data.forEach(category => {
                                const categoryItem = document.createElement('div');
                                categoryItem.classList.add('categoryItem');
                                const categoryName = document.createElement('h4');
                                categoryName.innerText = category.brandName;
                                const deleteIcon = document.createElement('img');
                                deleteIcon.src = 'dustbin.png';
                                deleteIcon.alt = 'Delete';
                                deleteIcon.setAttribute('id', category._id);
                                deleteIcon.classList.add('brandDustbinIcon'); // Add dustbinIcon class
                                deleteIcon.setAttribute('data-id', category._id); // Set data-id attribute
                                categoryItem.appendChild(categoryName);
                                categoryItem.appendChild(deleteIcon);
                                existingCategories.appendChild(categoryItem);


                            });
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }


    });

    //add Size Button On click

    document.addEventListener('click', () => {

        if (event.target.id === 'addSizeBtn') {
            const input = document.querySelector('#AttributeInput');
            const url = 'http://localhost:5000/api/createSize';
            const data = {
                name: input.value,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    document.getElementById('AttributeInput').value = "";
                    const apiUrl = 'http://localhost:5000/api/getAllSizes';
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="brand">Brands</h4><h4 id="sizes">Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new size</h4> <input id ="AttributeInput" type="text"></div><div><button id="addSizeBtn">Add</button>  </div></div><h3>Available sizes</h3><div class="existingCategories"></div>';
                            const existingCategories = document.querySelector('.existingCategories');
                            data.forEach(category => {
                                const categoryItem = document.createElement('div');
                                categoryItem.classList.add('categoryItem');
                                const categoryName = document.createElement('h4');
                                categoryName.innerText = category.size;
                                const deleteIcon = document.createElement('img');
                                deleteIcon.src = 'dustbin.png';
                                deleteIcon.alt = 'Delete';
                                deleteIcon.setAttribute('id', category._id);
                                deleteIcon.classList.add('sizeDustbinIcon'); // Add dustbinIcon class
                                deleteIcon.setAttribute('data-id', category._id); // Set data-id attribute
                                categoryItem.appendChild(categoryName);
                                categoryItem.appendChild(deleteIcon);
                                existingCategories.appendChild(categoryItem);


                            });
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    })

    //CategoryDustbinIcon On Click Listener
    document.addEventListener('click', (event) => {
        if (event.target.matches('.CategoryDustbinIcon')) {
            const url = 'http://localhost:5000/api/deleteCategory';
            const categoryId = event.target.getAttribute('id');
            console.log(categoryId);// Use data-id attribute

            const data = {
                _id: categoryId,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    fetch(url, options)
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            document.getElementById('AttributeInput').value = "";
                            const apiUrl = 'http://localhost:5000/api/getAllCategories';
                            fetch(apiUrl)
                                .then(response => response.json())
                                .then(data => {
                                    rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="Brands">Brands</h4><h4>Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new category</h4> <input id ="AttributeInput" type="text"></div><div><button id="categoryAddBtn">Add</button>  </div></div><h3>Available Categories</h3><div class="existingCategories"></div>';
                                    const existingCategories = document.querySelector('.existingCategories');
                                    data.forEach(category => {
                                        const categoryItem = document.createElement('div');
                                        categoryItem.classList.add('categoryItem');
                                        const categoryName = document.createElement('h4');
                                        categoryName.innerText = category.categoryName;
                                        const deleteIcon = document.createElement('img');
                                        deleteIcon.src = 'dustbin.png';
                                        deleteIcon.alt = 'Delete';
                                        deleteIcon.classList.add('dustbinIcon'); // Add dustbinIcon class
                                        deleteIcon.setAttribute('data-id', category._id); // Set data-id attribute
                                        categoryItem.appendChild(categoryName);
                                        categoryItem.appendChild(deleteIcon);
                                        existingCategories.appendChild(categoryItem);
                                    });
                                })
                                .catch(error => {
                                    console.error('Error fetching data:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }


    });

    //subCategoryDustbinIcon On Click Listener
    document.addEventListener('click', (event) => {
        if (event.target.matches('.subcategoryDustbinIcon')) {
            const url = 'http://localhost:5000/api/deleteSubcategory';
            const categoryId = event.target.getAttribute('id');
            console.log(categoryId);// Use data-id attribute

            const data = {
                _id: categoryId,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    fetch(url, options)
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            document.getElementById('AttributeInput').value = "";
                            const apiUrl = 'http://localhost:5000/api/getAllSubcategories';
                            fetch(apiUrl)
                                .then(response => response.json())
                                .then(data => {
                                    rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="Brands">Brands</h4><h4>Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new subcategory</h4> <input id ="AttributeInput" type="text"></div><div><button id="subcategoryAddBtn">Add</button>  </div></div><h3>Available subcategories</h3><div class="existingCategories"></div>';
                                    const existingCategories = document.querySelector('.existingCategories');
                                    data.forEach(category => {
                                        const categoryItem = document.createElement('div');
                                        categoryItem.classList.add('categoryItem');
                                        const categoryName = document.createElement('h4');
                                        categoryName.innerText = category.categoryName;
                                        const deleteIcon = document.createElement('img');
                                        deleteIcon.src = 'dustbin.png';
                                        deleteIcon.alt = 'Delete';
                                        deleteIcon.classList.add('subcategoryDustbinIcon'); // Add dustbinIcon class
                                        deleteIcon.setAttribute('data-id', category._id); // Set data-id attribute
                                        categoryItem.appendChild(categoryName);
                                        categoryItem.appendChild(deleteIcon);
                                        existingCategories.appendChild(categoryItem);
                                    });
                                })
                                .catch(error => {
                                    console.error('Error fetching data:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }


    });

    //brandDustbin On Click Listener
    document.addEventListener('click', (event) => {
        if (event.target.matches('.brandDustbinIcon')) {
            const url = 'http://localhost:5000/api/deleteBrand';
            const categoryId = event.target.getAttribute('id');
            console.log(categoryId);// Use data-id attribute

            const data = {
                _id: categoryId,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    fetch(url, options)
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            document.getElementById('AttributeInput').value = "";
                            const apiUrl = 'http://localhost:5000/api/getAllBrands';
                            fetch(apiUrl)
                                .then(response => response.json())
                                .then(data => {
                                    rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="Brands">Brands</h4><h4>Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new Brand</h4> <input id ="AttributeInput" type="text"></div><div><button id="addBrandBtn">Add</button>  </div></div><h3>Available Brands</h3><div class="existingCategories"></div>';
                                    const existingCategories = document.querySelector('.existingCategories');
                                    data.forEach(category => {
                                        const categoryItem = document.createElement('div');
                                        categoryItem.classList.add('categoryItem');
                                        const categoryName = document.createElement('h4');
                                        categoryName.innerText = category.brandName;
                                        const deleteIcon = document.createElement('img');
                                        deleteIcon.src = 'dustbin.png';
                                        deleteIcon.alt = 'Delete';
                                        deleteIcon.classList.add('brandDustbinIcon'); // Add dustbinIcon class
                                        deleteIcon.setAttribute('data-id', category._id); // Set data-id attribute
                                        categoryItem.appendChild(categoryName);
                                        categoryItem.appendChild(deleteIcon);
                                        existingCategories.appendChild(categoryItem);
                                    });
                                })
                                .catch(error => {
                                    console.error('Error fetching data:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }


    });


    //size Dustbin onclick
    document.addEventListener('click', (event) => {
        if (event.target.matches('.sizeDustbinIcon')) {
            const url = 'http://localhost:5000/api/deleteSize';
            const categoryId = event.target.getAttribute('id');
            console.log(categoryId);// Use data-id attribute

            const data = {
                _id: categoryId,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    fetch(url, options)
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            document.getElementById('AttributeInput').value = "";
                            const apiUrl = 'http://localhost:5000/api/getAllSizes';
                            fetch(apiUrl)
                                .then(response => response.json())
                                .then(data => {
                                    rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="brand">Brands</h4><h4 id="sizes">Sizes</h4></div><div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new size</h4> <input id ="AttributeInput" type="text"></div><div><button id="addSizeBtn">Add</button>  </div></div><h3>Available Sizes</h3><div class="existingCategories"></div>';
                                    const existingCategories = document.querySelector('.existingCategories');
                                    data.forEach(category => {
                                        const categoryItem = document.createElement('div');
                                        categoryItem.classList.add('categoryItem');
                                        const categoryName = document.createElement('h4');
                                        categoryName.innerText = category.size;
                                        const deleteIcon = document.createElement('img');
                                        deleteIcon.src = 'dustbin.png';
                                        deleteIcon.alt = 'Delete';
                                        deleteIcon.classList.add('sizeDustbinIcon'); // Add dustbinIcon class
                                        deleteIcon.setAttribute('data-id', category._id); // Set data-id attribute
                                        categoryItem.appendChild(categoryName);
                                        categoryItem.appendChild(deleteIcon);
                                        existingCategories.appendChild(categoryItem);
                                    });
                                })
                                .catch(error => {
                                    console.error('Error fetching data:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }


    });


    // Category Onclick Listener
    document.addEventListener('click', (event) => {
        if (event.target.id === 'category') {
            const rightContainer = document.querySelector('.rightContainer');
            const apiUrl = 'http://localhost:5000/api/getAllCategories';



            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="brand">Brands</h4><h4>Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new category</h4> <input id ="AttributeInput" type="text"></div><div><button id="categoryAddBtn">Add</button>  </div></div><h3>Available Categories</h3><div class="existingCategories"></div>';
                    const existingCategories = document.querySelector('.existingCategories');
                    data.forEach(category => {
                        const categoryItem = document.createElement('div');
                        categoryItem.classList.add('categoryItem');
                        const categoryName = document.createElement('h4');
                        categoryName.innerText = category.categoryName;
                        categoryName.setAttribute('id', category._id);
                        const deleteIcon = document.createElement('img');
                        deleteIcon.src = 'dustbin.png';
                        deleteIcon.alt = 'Delete';
                        deleteIcon.classList.add('CategoryDustbinIcon'); // Add dustbinIcon class
                        deleteIcon.setAttribute('id', category._id); // Set data-id attribute
                        categoryItem.appendChild(categoryName);
                        categoryItem.appendChild(deleteIcon);
                        existingCategories.appendChild(categoryItem);
                    });

                    const leftContainer = document.querySelector('.AttributesLeft');
                    const selectBtn = leftContainer.querySelector('h4');
                    selectBtn.style.background = '#232D3D';
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    });
});

//subcategory On clickListners
document.addEventListener('click', (event) => {
    if (event.target.id === 'subcategory') {
        const rightContainer = document.querySelector('.rightContainer');
        const apiUrl = 'http://localhost:5000/api/getAllSubCategories';



        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="brand">Brands</h4><h4>Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new Subcategory</h4> <input id ="AttributeInput" type="text"></div><div><button id="subcategoryAddBtn">Add</button>  </div></div><h3>Available Subcategories</h3><div class="existingCategories"></div>';
                const existingCategories = document.querySelector('.existingCategories');
                data.forEach(category => {
                    const categoryItem = document.createElement('div');
                    categoryItem.classList.add('categoryItem');
                    const categoryName = document.createElement('h4');
                    categoryName.innerText = category.SubcategoryName;
                    categoryName.setAttribute('id', category._id);
                    const deleteIcon = document.createElement('img');
                    deleteIcon.src = 'dustbin.png';
                    deleteIcon.alt = 'Delete';
                    deleteIcon.classList.add('subcategoryDustbinIcon'); // Add dustbinIcon class
                    deleteIcon.setAttribute('id', category._id); // Set data-id attribute
                    categoryItem.appendChild(categoryName);
                    categoryItem.appendChild(deleteIcon);
                    existingCategories.appendChild(categoryItem);
                });

                //button color change
                const leftContainer = document.querySelector('.AttributesLeft');
                const selectBtn = leftContainer.querySelector('#subcategory');
                selectBtn.style.background = '#232D3D';
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});

// Add an event listener for the Brand button
document.addEventListener('click', (event) => {
    if (event.target.id === 'brand') {
        const rightContainer = document.querySelector('.rightContainer');
        const apiUrl = 'http://localhost:5000/api/getAllBrands';


        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="brand">Brands</h4><h4>Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new Brand</h4> <input id ="AttributeInput" type="text"></div><div><button id="addBrandBtn">Add</button></div></div><h3>Available Brand</h3><div class="existingCategories"></div>';
                const existingCategories = document.querySelector('.existingCategories');
                data.forEach(category => {
                    const categoryItem = document.createElement('div');
                    categoryItem.classList.add('categoryItem');
                    const categoryName = document.createElement('h4');
                    categoryName.innerText = category.brandName;
                    categoryName.setAttribute('id', category._id);
                    const deleteIcon = document.createElement('img');
                    deleteIcon.src = 'dustbin.png';
                    deleteIcon.alt = 'Delete';
                    deleteIcon.classList.add('brandDustbinIcon'); // Add dustbinIcon class
                    deleteIcon.setAttribute('id', category._id); // Set data-id attribute
                    categoryItem.appendChild(categoryName);
                    categoryItem.appendChild(deleteIcon);
                    existingCategories.appendChild(categoryItem);
                });

                //button color change
                const leftContainer = document.querySelector('.AttributesLeft');
                const selectBtn = leftContainer.querySelector('#brand');
                selectBtn.style.background = '#232D3D';

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


    }
});

//subcategory On clickListners
document.addEventListener('click', (event) => {
    if (event.target.id === 'subcategory') {
        const rightContainer = document.querySelector('.rightContainer');
        const apiUrl = 'http://localhost:5000/api/getAllSubCategories';



        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="brand">Brands</h4><h4>Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new Subcategory</h4> <input id ="AttributeInput" type="text"></div><div><button id="subcategoryAddBtn">Add</button>  </div></div><h3>Available Subcategories</h3><div class="existingCategories"></div>';
                const existingCategories = document.querySelector('.existingCategories');
                data.forEach(category => {
                    const categoryItem = document.createElement('div');
                    categoryItem.classList.add('categoryItem');
                    const categoryName = document.createElement('h4');
                    categoryName.innerText = category.SubcategoryName;
                    categoryName.setAttribute('id', category._id);
                    const deleteIcon = document.createElement('img');
                    deleteIcon.src = 'dustbin.png';
                    deleteIcon.alt = 'Delete';
                    deleteIcon.classList.add('subcategoryDustbinIcon'); // Add dustbinIcon class
                    deleteIcon.setAttribute('id', category._id); // Set data-id attribute
                    categoryItem.appendChild(categoryName);
                    categoryItem.appendChild(deleteIcon);
                    existingCategories.appendChild(categoryItem);
                });

                //button color change
                const leftContainer = document.querySelector('.AttributesLeft');
                const selectBtn = leftContainer.querySelector('#subcategory');
                selectBtn.style.background = '#232D3D';
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});

document.addEventListener('click', async (event) => {
    if (event.target.id === 'buildProduct') {
        // Code for uploading Image
        const inputProductImage = document.getElementById('inputProductImage');
        const files = inputProductImage.files;
        const file = files[0];

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const pathLink = await response.text(); // Assuming the server sends the file path as plain text
            console.log('Path Link:', pathLink);
            alert(pathLink);

            // Now you can use 'pathLink' to store in your database or do other operations
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
});

document.addEventListener('change', async (event) => {
    if (event.target.id === 'inputProductImage') {
        var files = event.target.files;
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader(); // Create a new FileReader
            reader.onload = function () {
                var img = document.createElement('img'); // Create a new <img> element
                img.src = reader.result; // Set the source of the image
                img.style.width = '60px'; // Set a maximum width for display
                img.style.margin = '15px'; // Add some spacing
                const imageContainer = document.getElementById('uploadedImageBox');

                imageContainer.appendChild(img); // Append the image to the container
            }
            reader.readAsDataURL(files[i]); // Read the file as a data URL
        }
    }
});


// On click listener on size 
document.addEventListener('click', () => {



    if (event.target.id === 'sizes') {

        const rightContainer = document.querySelector('.rightContainer');
        const apiUrl = 'http://localhost:5000/api/getAllSizes';

        //button color change
        const leftContainer = document.querySelector('.AttributesLeft');
        const selectBtn = leftContainer.querySelector('#sizes');
        selectBtn.style.background = '#232D3D';


        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                rightContainer.innerHTML = '<div class="AttributesLeft"><h4 id="category">Categories</h4><h4 id="subcategory">Subcategories</h4><h4 id="brand">Brands</h4><h4 id="sizes">Sizes</h4></div>   <div class="AttributesRight"><div class="addNewCategory"><div> <h4>Add new size</h4> <input id ="AttributeInput" type="text"></div><div><button id="addSizeBtn">Add</button></div></div><h3>Available sizes</h3><div class="existingCategories"></div>';
                const existingCategories = document.querySelector('.existingCategories');
                data.forEach(category => {
                    const categoryItem = document.createElement('div');
                    categoryItem.classList.add('categoryItem');
                    const categoryName = document.createElement('h4');
                    categoryName.innerText = category.size;
                    categoryName.setAttribute('id', category._id);
                    const deleteIcon = document.createElement('img');
                    deleteIcon.src = 'dustbin.png';
                    deleteIcon.alt = 'Delete';
                    deleteIcon.classList.add('sizeDustbinIcon'); // Add dustbinIcon class
                    deleteIcon.setAttribute('id', category._id); // Set data-id attribute
                    categoryItem.appendChild(categoryName);
                    categoryItem.appendChild(deleteIcon);
                    existingCategories.appendChild(categoryItem);
                });



            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});



