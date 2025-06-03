class validaFom {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.event()
    }

    event() {
        this.formulario.addEventListener('submit', e => {
            this.handleToSend(e)
        })
    }

    handleToSend(e) {
        e.preventDefault()
        
    }

}

const validForm = new validaFom()