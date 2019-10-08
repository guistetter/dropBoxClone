class DropBoxController{
    constructor(){
        this.btnSendFileEL = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root')
        this.initEvents()
    }
    initEvents(){
        this.btnSendFileEL.addEventListener('click', event =>{
        this.inputFilesEl.click();
        });
        this.inputFilesEl.addEventListener('change', event =>{
            console.log(event.target.files)
            this.snackModalEl.style.display = 'block';//exibir via css
        });
    }
}