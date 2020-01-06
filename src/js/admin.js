var publication = {
    btnPublication : () => document.getElementById('add-publication'),
    formPublication : () => document.getElementById('publication'),
    toggleForm : function() {
        var f = this.formPublication();
        var style = "toggle";
        this.btnPublication().addEventListener('click',function(){
            if(!f.classList.contains(style)) {
                f.classList.add(style);
            } else {
                f.classList.remove(style);
            }
        });
    },
    init : function() {
        this.toggleForm();
    }
}

publication.init();