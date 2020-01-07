//Slider Home
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

         left.classList.remove("active");
         if(this.translate_x >= maxTranslate) right.classList.add("active");
      })

      left.addEventListener("click", ev => {
         if(this.translate_x > 0)
            this.translate_x -= 100;

         //Translate images
         for(let img of images){
            img.style.transform = `translateX(-${this.translate_x}%)`;
         }

         right.classList.remove("active");
         if(this.translate_x == 0) left.classList.add("active");
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

//Nav Animation Scroll
var navAnimation = {
   nav : () => document.querySelector('nav'),
   html : () => document.querySelector('html'),
   section : () => document.querySelector('section'),
   init : function() {
      window.addEventListener('scroll',()=> {
         var style = this.nav().style;
         if(this.html().scrollTop >= this.nav().previousElementSibling.getBoundingClientRect().height){
            style.position = "fixed";
            style.margin = "0";
            style.top="0";
            style.zIndex = "100";
            this.section().style.marginTop = style.height;
         } else{
            style.position = "relative";
         }
      });
   }
}

//form interactive comment 
var comment = {
   formCreateComment : () => document.querySelector('#create-comment'),
   open : function() {
      this.formCreateComment().classList.remove('animate');
   },
   close : function() {
      this.formCreateComment().classList.add('animate');
   }
}

//Blog
var blog = {
   modalBlogContent : () => document.querySelector(".publication-blog-expand"),
   closeModalBlog : () => document.querySelector("#close-publication-blog"),
   imagesCards : () => document.querySelectorAll(".handler-image-publication-blog"),
   buttonCard : () => document.querySelectorAll('.handler-click-publication-blog'),
   formComment : () => comment,
   previewPublished : function() {
      let handlerButton = this.buttonCard();
      let handlerImage = this.imagesCards();
      let modal = this.modalBlogContent();

      [...handlerButton].forEach(( button , index ) => {
         button.addEventListener('click', () => {
            let imageModal = modal.querySelector(".image img");
            modal.classList.add("animate");
            imageModal.src = handlerImage[index].src;
            document.body.style.overflow = "hidden";
         });
      });
   },
   closePublication : function(){
      let modal = this.modalBlogContent();
      let close = this.closeModalBlog();

      close.addEventListener("click", ev => {
         modal.classList.remove("animate");
         document.body.style.overflow = "auto";
      })
   },
   openAndCloseComment : function() {
      var f = this.formComment();
      function click(el, callEvent ) {
         document.getElementById(el).addEventListener('click',callEvent);
      }
      click('active-modal-comment',ev => f.open());
      click('cancel-comment',ev => f.close());
   },
   loadContentPublications : async function(){
      let divExpand = document.querySelector(".section-blog .preview-blog-main");
      let divMinus = document.querySelector(".section-blog .preview-blog-main .image-minus");
      let divContent = document.querySelector(".section-blog .section-blog-published");
      
      const pathRequest = "../js/simulator.json";
      const request = await fetch(pathRequest);
      const response = await request.json();
      
      if(response.length > 0){
         response.forEach((v,i) => {
            if(i == 0){
               let template = `<img class="image-main handler-image-publication-blog" src="${v.path_image}" />
                  <h4 class="title handler-click-publication-blog">${v.title_publication}</h4>`;
               const div = document.createElement("div");
               div.classList.add("image-expand");
               div.setAttribute("data-aos","zoom-in");
               div.innerHTML = template;

               divExpand.prepend(div);
            }else if(i < 4){
               let template = `<div class="image" data-aos="zoom-in">
                  <img class="image-main handler-image-publication-blog" src="${v.path_image}" />
                  <h4 class="title handler-click-publication-blog">${v.title_publication}</h4>
               </div>`;
               divMinus.innerHTML += template;
            }else{
               let template = `<div class="published-card" data-aos="zoom-in">
                  <div class="container-image">
                     <img class="image-published handler-image-publication-blog" src="${v.path_image}" alt="url image" />
                  </div>
                  <div class="container-detail-published">
                     <strong class="dark title-published">${v.title_publication}</strong>
                     <p class="text-published">${v.text_publication}</p>
                     <button class="btn-read-more handler-click-publication-blog">Leer más</button>
                  </div>
               </div>`;
               divContent.innerHTML += template;
            }
         })    

         this.previewPublished();    
         this.openAndCloseComment();
         this.closePublication();
      }else{
         let sectionBlog = document.querySelector(".section-blog");
         sectionBlog.innerHTML = `<div class="not-found">
            <p class="message">No ahi publicaciones disponibles</p>
         </div>`;
      }
   },
   init : function() {
      this.loadContentPublications();
   }
}

//Admin Panel
var publication = {
   btnAddPublication : () => document.getElementById('add-publication'),
   formButtonClose : () => document.getElementById("btn-cancel-publication"),
   formPublication : () => document.getElementById('publication'),
   toggleForm : function() {
       var f = this.formPublication();
       let add = f.querySelector(".add-publication");
       var style = "toggle";
       this.btnAddPublication().addEventListener('click', ev => {
            f.classList.remove(style);
            add.classList.remove(style);
       });
       this.formButtonClose().addEventListener("click", ev => {
           f.classList.add(style);
           add.classList.add(style);
       })
   },
   createPublication : function(){
      //Code fetch
   },
   init : function() {  
      this.toggleForm();
   }
}


//NavBar Init
let loc = window.location.href.split("/");
if(loc[loc.length - 1] != "admin.html") 
   navAnimation.init();