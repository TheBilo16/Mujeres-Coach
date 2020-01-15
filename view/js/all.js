//Slider Home
var slider = {
   idBucle : null,
   time : 4,
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
      let left = this.buttons("btn-left");
      let right = this.buttons("btn-right");

      [...images].forEach((img,i) => {
         img.addEventListener("click", ev => {
            this.translate_x = 100 * i;
            for(let imgh of this.listImagesHide()){
               imgh.style.transform = `translateX(-${this.translate_x}%)`;
            }
            this.divHide().classList.add("animate");
            if(i == 0){
               left.classList.add("active");
               right.classList.remove("active");
            }else if(i == images.length - 1){
               right.classList.add("active");
               left.classList.remove("active");
            }
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
   scrollEvent : function(){
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
   },
   responsiveMenu : function(){
      const activeMenu = document.querySelector("#nav-icon-responsive");
      const Menu = document.querySelector("#nav-content-responsive");
      const closeMenu = Menu.querySelector("#close-nav-responsive");
      activeMenu.addEventListener("click", ev => {
         Menu.classList.remove("animate");
      });
      closeMenu.addEventListener("click", ev => {
         Menu.classList.add("animate");
      });
   },
   init : function() {
      this.scrollEvent();
      this.responsiveMenu();
   }
}

//form interactive comment 
var comment = {
   formCreateComment : () => document.querySelector('#create-comment'),
   formModal : () => document.querySelector(".publication-blog-expand"),
   viewComments : () => document.querySelector(".view-comments"),
   clearInputs : function(form){
      let inputs = form.querySelectorAll(".input");
      [...inputs].forEach( (v,i)=> { if(i < 3) v.value = ""; })
   },
   open : function() {
      this.formCreateComment().classList.remove('animate');
   },
   close : function() {
      const form = this.formCreateComment();
      form.classList.add('animate');
      this.clearInputs(form.querySelector("form"));
   },
   createComment : function() {
      const form = this.formCreateComment().querySelector("form");
      form.addEventListener('submit',async ev => {
         ev.preventDefault();

         let formData = new FormData(form);
         let id = JSON.parse(decodeURIComponent(this.formModal().getAttribute('data-pbl'))).id_publication;
         formData.append("id_publication",id);
         
         let headers = { method : "POST", body : formData }
         this.clearInputs(form);

         const request = await fetch("index.php?url=CreateComment",headers)
         const response = await request.text();
         if(response == "true"){
            alert("Comentario publicado");
            this.showingComments(blog.id_publication);
            this.close();
         }else{
            alert("Error database...");
         }
      });
   },
   showingComments : async function(publication) {
      const request = await fetch(`index.php?url=AllComments&id_publication=${publication}`)
      const response = await request.json();
      let divComments = this.viewComments();

      divComments.innerHTML = "";
      if(response.length > 0){
         response.forEach((data,index)=>{
            divComments.innerHTML += `
               <div class="comment">
                  <div class="row icon">
                     <div class="container-icon">
                        <i class="fa fa-user"></i>
                     </div>
                  </div>
                  <div class="row detail-comment">
                     <div class="commenter-name">${data.username_comment}</div>
                     <span class="comment-date">${data.date_comment}</span>
                     <p class="text-comment">${data.text_comment}</p>
                  </div>
               </div>
            `;
         });
      }else{
         divComments.innerHTML = `<div class="comment-0">
            <div class="icon">
               <i class="fa fa-comment"></i>
            </div>
            <p class="message">Se el primero en comentar...</p>
         </div>`;
      }
   }
}

const loading = () => document.querySelector(".loading");
var loadingClose = false;

//Blog
var blog = {
   id_publication:0,
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
         button.addEventListener('click', async ev => {
            let imageModal = modal.querySelector(".image img");
            modal.classList.add("animate");
            imageModal.src = handlerImage[index].src;
            document.body.style.overflow = "hidden";
            
            //Codding of ID
            let parent = ev.target.closest(".published-card"); 
            let attribute = parent.getAttribute('data-pbl');
            let data = JSON.parse(decodeURIComponent(attribute));
            
            //Get Data
            const request = await fetch(`index.php?url=FindPublication&id=${data.id_publication}`);
            const response = await request.json();

            var m = this.modalBlogContent();
            m.querySelector('.title').innerHTML = response.title_publication;
            m.querySelector('.content').innerHTML = response.text_publication;
            m.setAttribute('data-pbl',attribute);
            comment.showingComments(data.id_publication);
            this.id_publication = data.id_publication;

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
      const click = function (el, callEvent ) {
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
            //La class published-card es necesaria para el recojo de datos
            let text = v.text_publication;
            let textBig = (text.length > 150 ? text.substr(0,150) : text) + "...";

            if(i == 0){
               let template = `<img class="image-main handler-image-publication-blog" src="${v.path_image}" />
                  <div class="content-text">
                     <h4 class="title handler-click-publication-blog">${v.title_publication}</h4>
                     <p class="message">${textBig}</p>
                  </div>`;
               
               const div = document.createElement("div");
               div.classList.add("image-expand","published-card");
               div.setAttribute("data-aos","zoom-in");
               div.setAttribute("data-pbl",encodeURIComponent(JSON.stringify(v)));

               div.innerHTML = template;

               divExpand.prepend(div);
            }else if(i < 4){
               textBig = textBig.length > 80 ? textBig.substr(0,80) + "..." : textBig;
               let template = `<div class="image published-card" data-aos="zoom-in" data-pbl='${encodeURIComponent(JSON.stringify(v))}'>
                  <img class="image-main handler-image-publication-blog" src="${v.path_image}" />
                  <div class="content-text">
                     <h4 class="title handler-click-publication-blog">${v.title_publication}</h4>
                     <p class="message">${textBig}</p>
                  </div>
               </div>`;
               divMinus.innerHTML += template;
            }else{
               if(!loadingClose){
                  loading().classList.add("animate");
                  loadingClose = false;
               }
               let template = `<div class="published-card" data-aos="zoom-in" data-pbl='${encodeURIComponent(JSON.stringify(v))}'>
                  <div class="container-image">
                     <img class="image-published handler-image-publication-blog" src="${v.path_image}" alt="url image" />
                  </div>
                  <div class="container-detail-published">
                     <strong class="dark title-published">${v.title_publication}</strong>
                     <p class="text-published">${textBig}</p>
                     <button class="btn-read-more handler-click-publication-blog">Leer más</button>
                  </div>
               </div>`;
               divContent.innerHTML += template;
            }
         })   
         
         if(responseJson.length < 5){
            if(!loadingClose){
               loading().classList.add("animate");
               loadingClose = false;
            }
            divContent.classList.add("not-publication");
            divContent.innerHTML = `<div class="publication-end" data-aos="zoom-in">
               <div class="icon">
                  <i class="fa fa-grin-beam-sweat"></i>
               </div>
               <p class="message">Aun no tenemos mas publicaciones disponibles...</p>
            </div>`;
         }
         
         this.previewPublished();    
         this.openAndCloseComment();
         this.closePublication();

      }else{
         let sectionBlog = document.querySelector(".section-blog");
         sectionBlog.innerHTML = `<div class="not-found">
            <p class="message">No ahi publicaciones disponibles</p>
         </div>`;
         if(!loadingClose){
            loading().classList.add("animate");
            loadingClose = false;
         }
      }
   },
   init : function() {
      this.loadContentPublications();
      this.formComment().createComment();
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
var adminPanel = {
   type: "",
   nav : () => document.querySelector("#nav-form"),
   textTitleHeader : () => document.querySelector("#text-row-title"),
   buttonBack : () => document.querySelector("#back-button"),
   btnAddPublication : () => document.getElementById('add-publication'),
   formButtonClose : () => document.getElementById("btn-cancel-publication"),
   formPublication : () => document.getElementById('publication'),
   inputSearch : () => document.querySelector('.search .input-search'),
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
       let submit = add.querySelector("input[type='submit']");
       var style = "toggle";
       var preview  = document.querySelector('.preview-image');

       this.btnAddPublication().addEventListener('click', ev => {
            f.classList.remove(style);
            add.classList.remove(style);
            document.body.style.overflow = "hidden";
       });
       this.formButtonClose().addEventListener("click", ev => {
           f.classList.add(style);
           add.classList.add(style);
           preview.innerHTML = "";
           document.body.style.overflow = "auto";
           add.disabled = false;
       })
   },
   back : function(button){
      const divPublications = document.querySelector("#content-publications");
      button.addEventListener("click", ev => window.location.reload())
   },
   create : function(){
      let form = this.formPublication().querySelector("#form-insert-publication");
      let picture = this.formPublication().querySelector("[name='image']");

      picture.addEventListener('change', ev => {
         var preview  = document.querySelector('.preview-image');
         var type = ev.target.files[0].type.split("/")[0];
         if(type == "image"){
            var reader = new FileReader();
            reader.onload = e => {
               preview.innerHTML = `
                 <img src="${e.target.result}"/>
                 <p class="name-image">${ev.target.files[0].name}</p>`;
            };
            reader.readAsDataURL(ev.target.files[0]);
         }else{
            alert("Ingrese una imagen porfavor...");
         }
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

         var pathRequest = "";
         if(this.type == "publication") pathRequest = "index.php?url=AdminCreatePublication";
         else if(this.type == "event") pathRequest = "index.php?url=AdminCreateEvent";

         const requestData = await fetch(pathRequest,headers);
         const response = await requestData.text();
         
         switch(response){
            case "true":
               alert("Publicacion Subida");
               window.location = "index.php?url=admin";
               break;
            case "false":
            case "ErrorUpdload":
               alert("Ocurrio un error al subir la imagen...");
               submit.disabled = false;
               break;
            case "LimitSize":
               alert("La imagen ingresada no puede superar los 2MB");
               submit.disabled = false;
               break;
            case "NoImage":
               alert("El archivo ingresado no es una Imagen");
               submit.disabled = false;
               break;   
         }

      })
   },
   getContent : async function(title = null,search = false){
      const divPublications = document.querySelector("#content-publications");
      
      var pathRequest;
      if(this.type == "publication"){
         if(title == null ) pathRequest = "index.php?url=blogRequestPublication";
         else pathRequest = "index.php?url=SearchByTitle&title=" + title;
      }else if(this.type == "event"){
         if(title == null ) pathRequest = "index.php?url=eventRequest";
         else pathRequest = "index.php?url=SearchByTitleEvent&title=" + title;         
      }

      const request = await fetch(pathRequest);
      const response = await request.json();

      divPublications.innerHTML = "";
      if(response.length > 0){
         //Create Data
         for(let v of response){
            let image = v.path_image;
            let title = !v.title_publication ? v.title_event : v.title_publication;
            let text = !v.text_publication ? v.text_event : v.text_publication;
            let date = v.date_create;
            let id = !v.id_publication ? v.id_event : v.id_publication;

            divPublications.innerHTML += `<div class="card-published">
               <div class="container-image">
                  <img src="${image}" alt="image" />
               </div>
               <div class="container-details">
                  <div class="text">
                     <p class="dark">${title}</p>
                     <p class="text-publication">${text}</p>
                  </div>
               </div>
               <div class="container-options">
                  <p class="date">${date}</p>
                  <button id="${id}" class="delete">Eliminar</button>
               </div>
            </div>`;
         };

         //Init Delete
         this.delete();
      }
      else{
         //Detect Search and Not Search
         if(search){
            divPublications.classList.remove("notPublication");
            divPublications.innerHTML = `<div class="not-found">
               <p class="dark">Ups!</p>
               <p class="message">No se encontró ninguna coincidencia con ${title}...</p>
            </div>`;
         }else{
            divPublications.classList.add("notPublication");
            divPublications.innerHTML = `<div class="not-publication">
               <div class="icon">
                  <i class="fa fa-grin-beam-sweat"></i>
               </div>
               <p class="message">No ahi publicaciones disponibles</p>
            </div>`;
         }
      }

   },
   delete : function(){
      const deletes = document.querySelectorAll(".card-published .delete");
      for(let d of deletes){
         d.addEventListener("click", async ev => {
            let d = { id_publication : ev.target.id };

            let body = new FormData();
            body.append("id_publication", ev.target.id); 

            let headers = {
               method: 'POST',
               body: body
            }

            const awaitRequest = confirm("Estas seguro de quere borrar esta publicacion?");
            if(awaitRequest){
               
               var pathRequest = "";
               if(this.type == "publication") pathRequest = "index.php?url=AdminDeletePublication";
               else if(this.type == "event") pathRequest = "index.php?url=AdminDeleteEvent"

               const request = await fetch(pathRequest,headers);
               const response = await request.text();
   
               switch(response){
                  case "deleteOk":
                     alert("La publicacion se elimino con exito");
                     window.location.href = "index.php?url=admin";
                     break;
                  case "deleteFail":
                  default:
                     alert("Ocurrio un error");
                     break;
               }
            }
         })
      }
   },
   search : function() {
      let input = this.inputSearch();
      input.addEventListener('keyup', ev => {
         if(ev.target.value.length > 0) this.getContent(ev.target.value,true);
         else this.getContent();
      });
   },
   loadContent : function(){
      let publication = document.querySelector("#publications-button");
      let events = document.querySelector("#events-button");
      let title = this.textTitleHeader();

      publication.addEventListener("click", ev => {
         this.type = "publication";
         title.innerHTML = "Publications";
         __init__();
      });

      events.addEventListener("click", ev => {
         this.type = "event";
         title.innerHTML = "Events";
         __init__();
      });

      const __init__ = () => {
         this.getContent();
         this.create();
         this.search();
         this.nav().style.display = "flex";

         let backBtn = this.buttonBack();
         backBtn.style.display = "inline-block";
         this.back(backBtn);
      }
   },
   init : function() {  
      this.logout();
      this.toggleForm();
      this.loadContent();
   }
}

//Contact
var contact = {
   form : () => document.querySelector(".panel-contact .contact-form"),
   inputs : () => document.querySelectorAll(".panel-contact .contact-form .text-field"),
   clearInputs : function(){
      let inputs = this.inputs();
      for(let inp of inputs)
         inp.value = "";
   },
   sendMail : function(){
      let form = this.form();
      form.addEventListener("submit",async ev => {
         ev.preventDefault();

         const formData = new FormData(form);
         const headers = {
            method : "POST",
            body : formData
         }

         const request = await fetch("index.php?url=SendEmail",headers);
         const response = await request.text();

         console.log(response);     //Debug ~ Delete when this ready

         switch(response){
            case "mailSend":
               alert("Mensaje Enviado");
               this.clearInputs();
               break;
            case "mailFail":
            default:
               alert("Ocurrio un error inesperado...");
               break;
         }
      })
   },
   init : function(){
      this.sendMail();
   }
}

//Event
var event  = {
   header : () => document.querySelector("#header-title"),
   divContent : () => document.querySelector("#content-events"),
   getEvents : async function(){
      let Div = this.divContent();

      const request = await fetch("index.php?url=eventRequest");
      const response = await request.json();

      if(response.length > 0){
         let template = "";
         for(let data of response){
            template += `<div class="card">
               <div class="head">
                  <img src="${data.path_image}" alt="eventsBrunella" class="img-event" />
               </div>
               <div class="body">
                  <p class="title">${data.title_event}</p>
                  <p class="message">${data.text_event}</p>
               </div>
            </div>`;
         }
         Div.innerHTML = template;
      }else{
         this.header().style.display = "none";
         Div.parentNode.classList.add("line");
         Div.parentNode.innerHTML = `<div class="not-events">
            <p class="sub"><i class="fa fa-sad-tear"></i> Lo sentimos</p>
            <p class="mes">No tenemos eventos disponibles en este momento</p>
         </div>`;
      }
   },
   init : function(){
      this.getEvents();
   }
}

//Init
window.addEventListener("load", ev => {
   let loc = window.location.href.split("/");
   let size = loc[loc.length - 1];
   let url = size.split("?")[1].split("=")[1];

   if(url != "admin" && url != "login") navAnimation.init();

   switch(url){
      case "home":
      case "home#galeria":
         slider.init_slider();
         viewImages.__init__();
         contact.init();
         break;
      case "blog":
         blog.init();
         break;
      case "login":
         login.init();
         break;
      case "admin":
         adminPanel.init();
         break;
      case "events":
         event.init();
         break;
      case "contact":
         contact.init();
         break;
      //About ~ Coaching
      default:
         break;
   }
})