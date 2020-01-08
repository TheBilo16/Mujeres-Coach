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
      
      const pathRequest = "index.php?url=blogRequestPublication";
      const request = await fetch(pathRequest);
      const response = await request.json();
      
      const responseJson = response;

      if(responseJson.length > 0){
         responseJson.forEach((v,i) => {
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

//Login
var login = {
   form : () => document.querySelector("#form-login"),
   actionLogin : function(){
      const form = this.form();
      form.addEventListener("submit",async ev => {
         ev.preventDefault();

         let submit = form.querySelector("input[type='submit']");
         const data = new FormData(form);
         submit.disabled = true;

         const headers = {
            method : "POST",
            body : data
         }

         const request = await fetch("index.php?url=LoginRequest",headers);
         const response = await request.text();

         if(response == "true"){
            window.location = "index.php?url=admin";
         }else if(response == "false"){
            submit.disabled = false;
            alert("Usuario o Contraseña incorrecta");
         }

      });
   },
   init : function(){
      this.actionLogin();
   }
}

//Admin Panel
var publication = {
   btnAddPublication : () => document.getElementById('add-publication'),
   formButtonClose : () => document.getElementById("btn-cancel-publication"),
   formPublication : () => document.getElementById('publication'),
   inputSearch : () => document.querySelector('.input-search'),
   logout : () => {
      const btn = document.querySelector("#logout-button");
      btn.addEventListener("click",async ev => {
         const request = await fetch("index.php?url=logout");
         const response = await request.text();
         window.location = "index.php?url=login";
      })
   },
   toggleForm : function() {
       var f = this.formPublication();
       let add = f.querySelector("#form-insert-publication");
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
      let form = this.formPublication().querySelector("#form-insert-publication");
      let picture = this.formPublication().querySelector("[name='image']");

      picture.addEventListener('change', ev => {
         var preview  = document.querySelector('.preview-image');
         var reader = new FileReader();
         reader.onload = e => {
            preview.innerHTML = `
              <img src="${e.target.result}"/>
              <p class="name-image">${ev.target.files[0].name}</p>
              `;
         };
         reader.readAsDataURL(ev.target.files[0]);
      });

      form.addEventListener("submit", async ev => {
         ev.preventDefault();

         const dataForm = new FormData(form);
         const headers = {
            method : "POST",
            body : dataForm
         };

         let inputs = form.querySelectorAll(".text-field");
         let submit = form.querySelector("input[type='submit']");
         submit.disabled = true;

         const requestData = await fetch("index.php?url=AdminCreatePublication",headers);
         const response = await requestData.text();
         
         switch(response){
            case "true":
               alert("Publicacion Subida");
               [...inputs].forEach(v => v.value = "");
               submit.disabled = false;
               break;
            case "false":
            case "ErrorUpload":
               alert("Ocurrio un error al subir la imagen...");
               submit.disabled = false;
               break;
            case "NoImage":
               alert("El archivo ingresado no es una Imagen");
               submit.disabled = false;
               break;   
         }

      })
   },
   getPublications : async function(title = null){
      const divPublications = document.querySelector("#content-publications");
      
      var pathRequest;
      if(title == null ){
         pathRequest = "index.php?url=blogRequestPublication";
      }
      else {
         pathRequest = "index.php?url=SearchByTitle&title="+title;
      }
      const request = await fetch(pathRequest);
      const response = await request.json();

      divPublications.innerHTML = "";
      if(response.length > 0){
         response.forEach(v => {
            divPublications.innerHTML += `<div class="card-published">
               <div class="container-image">
                  <img src="${v.path_image}" alt="image" />
               </div>
               <div class="container-details">
                  <div class="text">
                     <p class="dark">${v.title_publication}</p>
                     <p class="text-publication">${v.text_publication}</p>
                  </div>
               </div>
               <div class="container-options">
                  <p class="date">${v.date_create}</p>
                  <button class="delete">Eliminar</button>
               </div>
            </div>`;
         });
      }
      else {
         divPublications.innerHTML = `
         <div class="not-found">
            <p class="dark">Ups!</p>
            <p class="message">No se encontró ninguna coincidencia con ${title}...</p>
         </div>
         `;
      }
   },
   searchByTitle : function() {
      this.inputSearch().addEventListener('keyup', ev => {
         this.getPublications(this.inputSearch().value);
      });
   },
   init : function() {  
      this.logout();
      this.toggleForm();
      this.getPublications();
      this.createPublication();
      this.searchByTitle();
   }
}

//Init
window.addEventListener("load", ev => {
   let loc = window.location.href.split("/");
   let size = loc[loc.length - 1];

   if(size != "index.php?url=admin") 
      navAnimation.init();
})
