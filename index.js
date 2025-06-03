class validaFom{
    constructor(){
        this.formulario = document.querySelector('.formulario')
        this.event()
    }

    event(){
        this.formulario.addEventListener('submit', e =>{
          this.handleSend(e)
        })
    }

    handleSend(e){
        e.preventDefault()
    }

}