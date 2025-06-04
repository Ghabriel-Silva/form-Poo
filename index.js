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
        const isValid = this.formIsValid() //Espero true ou falso desse metodo
        const isValidPassword = this.validPassword()


        if (isValid && isValidPassword) {
            alert('Formulario enviado!')
            this.formulario.reset()
        }
    }

    formIsValid() {
        let valid = true

        for (let errorTxt of this.formulario.querySelectorAll('.error-campo')) {
            errorTxt.remove()
        }
        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerHTML;
            if (!campo.value.trim()) {
                this.createError(campo, `O Campo ${label} não pode estar em branco!`)
                valid = false;
            }
            if (campo.classList.contains('usuario')) {
                if (this.validUser(campo) === false) {
                    valid = false
                }
            }
        }
        return valid;
    }

    validPassword() {
        let valid = true
        const senha = document.querySelector('.senha')
        const repeteSenha = document.querySelector('.repetirsenha')

        if (senha.value !== repeteSenha.value) {
            this.createError(senha, 'Senha e repetir senha precisão ser iguais')
            this.createError(repeteSenha, 'Senha e repetir senha precisão ser iguais')
            valid = false;
        }
        if (senha.value.length < 5 || senha.value.length > 12) {
            this.createError(senha, 'A senha deve ter entre 5 á 12 caracteres!')
            this.createError(repeteSenha, 'A senha deve ter entre 5 á 12 caracteres!')
            valid = false
        }
        if (!senha.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/)) {
            this.createError(senha, "Senha deve conter ao menos uma letra maiúscula, uma minúscula e um símbolo.")
            this.createError(repeteSenha, "Senha deve conter ao menos uma letra maiúscula, uma minúscula e um símbolo.")
            valid = false
        }
        return valid;
    }

    validUser(campo) {
        let valid = true
        const user = campo.value

        if (user.length < 3 || user.length > 12) {
            this.createError(campo, 'Usuário deve conter entre 3 a 12 caracteres!')
            valid = false
        }
        if (!user.match(/^[A-Za-z0-9]+$/)) {
            this.createError(campo, 'Usuário deve conter apenas letras ou números!')
            valid = false
        }

        return valid;
    }
    createError(campo, msg) {
        const div = document.createElement('div')
        div.innerText = msg
        div.classList.add('error-campo')
        campo.insertAdjacentElement('afterend', div) //Ensira a div abaixo do elemento campo
    }



}

const validForm = new validaFom()
