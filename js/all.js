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

var floatingContent = {
   
}