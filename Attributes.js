document.addEventListener('DOMContentLoaded', () => {

 //    Attributes manager onclick
 const AttributesManager = document.querySelector('#AttributesManager');


 AttributesManager.addEventListener('click', () => {

      // Attributes manager onclick
      //
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

     

 });




});