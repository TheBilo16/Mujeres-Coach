//Slider
var slider = {
   idBucle : null,
   time : 2,
   image_count : 0,
   translate_x : 0,
   element : () => document.querySelector(".content-slider .slider"),
   images : function(){
      return this.element().querySelectorAll(".images img");
   },
   circles : function(){
      return this.element().querySelectorAll(".icons .circle");
   },
   init_slider : function(){
      let images = this.images();
      let circles = this.circles();
      
      this.idBucle = setInterval(() => {
         
         //Conditions
         if(this.image_count < images.length - 1){
            this.image_count += 1;
            this.translate_x += 100;
         }else{
            this.translate_x = 0;
            this.image_count = 0;
         }

         //Circles
         for(let c of circles) c.classList.remove("active");
         circles[this.image_count].classList.add("active");

         //Images
         for(let img of images) img.style.transform = `translateX(-${this.translate_x}%)`;

      },this.time * 1000)
   }
}

//Images View
var viewImages = {
   translate_x : 0,
   divHide : () => document.querySelector("#content-images-hide"),
   contentHide : () => document.querySelector("#content-images-slider"),
   imagesHome : () => document.querySelectorAll(".content-images .content .img"),
   listImagesHide : function(){
      return this.contentHide().querySelectorAll(".image-expand");
   },
   buttons : id => document.querySelector(`.view-images-expand #${id}`),
   __init__ : function(){
      let template = "";
      for(let img of this.imagesHome()){
         template += `<img src="${img.src}" alt="image-hide" class="image-expand">`; 
      }
      this.contentHide().innerHTML = template;
      this.slide();
      this.clickImage();
      this.close();
   },
   slide : function(){
      let images = this.listImagesHide();
      let left = this.buttons("btn-left");
      let right = this.buttons("btn-right");

      right.addEventListener("click", ev => {
         let maxTranslate = 100 * (images.length - 1);      

         if(this.translate_x < maxTranslate)
            this.translate_x += 100;

         //Translate images
         for(let img of images){
            img.style.transform = `translateX(-${this.translate_x}%)`;
         }
      })

      left.addEventListener("click", ev => {
         if(this.translate_x > 0)
            this.translate_x -= 100;

         //Translate images
         for(let img of images){
            img.style.transform = `translateX(-${this.translate_x}%)`;
         }
      })

   },
   clickImage : function(){
      let images = document.querySelectorAll(".content-images .content .icon");
      [...images].forEach((img,i) => {
         img.addEventListener("click", ev => {
            this.translate_x = 100 * i;
            for(let imgh of this.listImagesHide()){
               imgh.style.transform = `translateX(-${this.translate_x}%)`;
            }
            this.divHide().classList.add("animate");
         });
      });
   },
   close : function(){
      let close = this.buttons("btn-close");
      close.addEventListener("click", ev => {
         this.divHide().classList.remove("animate");
      });
   }
}

var floatingContent = {
   
}