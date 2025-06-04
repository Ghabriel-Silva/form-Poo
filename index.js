
class validaForm {
    constructor() {
        this.formulario = document.getElementById('form'),
            this.event()
    }
    event() {
        this.formulario.addEventListener('submit', e => {
            this.handleToSend(e)
        })
    }

    handleToSend(e) {
        e.preventDefault()
        const formIsValid = this.formularioIsvalid()

        if (formIsValid) {
            alert('Formulario enviado!')
        }
    }

    formularioIsvalid() {
        let valid = true

        for(let errorInput of this.formulario.querySelectorAll('.error')){
            errorInput.remove()
        }

        for (let campo of this.formulario.querySelectorAll('.form-control')) {

            const container = campo.closest('.input-box')  //Busca o ancestral mais próximo com a classe .input-box e guarda em container
            if(!container) return; // Pula para o próximo campo se não tiver .input-box
            const label = container.firstElementChild.innerHTML 

            if (!campo.value  || campo.value.trim() === '') {
                valid = false
                this.createError(campo , `${label} Obrigatório`)
            }

            if(campo.classList.contains('user') || campo.classList.contains('userlast') && campo.value.trim() !== ''){
                if(!this.userIsValid(campo, label)){
                    valid = false
                }
            }


        }

        return valid;
    }

    userIsValid(campo, label){
        const user = campo.value
        let valid = true
        
        if(!user.match(/^[A-Za-zÀ-ÿ\s]+$/) &&  campo.value.trim() !== ''){ //Se match retornar falso(basicamente a função fala, so tem string aqui) e valor do input for diferente de vazio
            this.createError(campo, `${label} Apenas letras`)
            valid = false
        }
        return valid;
    }


    createError(campo, msg) {
        const p = document.createElement('p')
        p.innerText = msg;
        p.classList.add('error')
        const inputField = campo.parentElement; //Pega o elemento pai do input (div.input-field) onde a mensagem de erro será inserida abaixo
        inputField.insertAdjacentElement('afterend', p)
    }

}

const formValidar = new validaForm()

