
class validaForm {
    constructor() {
        this.formulario = document.getElementById('form'), //No contexto de classes em JavaScript, this representa a instância atual do objeto criado a partir da classe.
            this.event(),
            this.passwordSee(),
            this.inputFocus()

    }
    event() {
        this.formulario.addEventListener('submit', e => { //this se refere à instância da classe (ou seja, o objeto criado). Com funções normais, o this muda de contexto e pode causar erros."
            this.handleToSend(e)
        })


    }

    handleToSend(e) {
        e.preventDefault()
        const formIsValid = this.formularioIsvalid()
        const passwordIsValid = this.passworIsValid()
        const radio = this.radioIsValid()

        if (formIsValid && passwordIsValid && radio) {
            this.animationSucess()
        }
    }

    animationSucess() {
        const load = this.formulario.querySelector('.wrapper')
        const button = this.formulario.querySelector('.btn-aniation')
        const sucess = this.formulario.querySelector('.sucess-conta')

        load.style.display = 'block'
        button.style.display = 'none'

        setTimeout(() => {
            load.style.display = 'none'
            sucess.style.display = 'block'

            this.formulario.reset()

            setTimeout(() => {
                button.style.display = 'block'
                sucess.style.display = 'none'

            }, 2000)
        }, 3000)
    }

    inputFocus() {
        for (let campo of this.formulario.querySelectorAll('.form-control')) {
            let previusValues = '';

            campo.addEventListener('focus', () => {
                previusValues = campo.value;
            });

            campo.addEventListener('blur', () => {
                if (campo.value !== previusValues) {
                    this.validarCampoIndividual(campo);
                }
            });
        }
    }


    validarCampoIndividual(campo) {
        const container = campo.closest('.input-box') //Div pai 
        if (!container) return;

        const previusError = container.querySelector('.error')
        if (previusError) previusError.remove()

        const label = container.firstElementChild.innerHTML

        if (!campo.value || campo.value.trim() === '') {
            this.createError(campo, `${label} Obrigatório`)
        }

        if (campo.classList.contains('user') || campo.classList.contains('userlast') && campo.value.trim() !== '') {
            if (!this.userIsValid(campo, label)) {
            }
        }

        if (campo.classList.contains('date')) {
            if (!this.dateIsValid(campo, label)) {
            }
        }
        if (campo.classList.contains('email')) {
            if (!this.emailIsValid(campo, label)) {
            }
        }

    }



    formularioIsvalid() {
        let valid = true

        for (let errorInput of this.formulario.querySelectorAll('.error')) {
            errorInput.remove()
        }
        for (let campo of this.formulario.querySelectorAll('.form-control')) {
            const container = campo.closest('.input-box')  //Busca o ancestral mais próximo com a classe .input-box e guarda em container
            if (!container) continue; // Pula para o próximo campo se não tiver .input-box
            const label = container.firstElementChild.innerHTML

            if (!campo.value || campo.value.trim() === '') {
                valid = false;
                this.createError(campo, `${label} Obrigatório`)
            }

            if ((campo.classList.contains('user') || campo.classList.contains('userlast')) && campo.value.trim() !== '') {
                if (!this.userIsValid(campo, label)) {
                    valid = false;
                }
            }

            if (campo.classList.contains('date')) {
                if (!this.dateIsValid(campo, label)) {
                    valid = false
                }
            }
            if (campo.classList.contains('email')) {
                if (!this.emailIsValid(campo, label)) {
                    valid = false;
                }
            }
        }

        return valid;
    }

    radioIsValid() {
        let valid = false
        let containerRadio = null
        const radius = this.formulario.querySelectorAll('.radio')

        for (let radio of radius) {
            if (radio.checked) {
                valid = true
                break
            }
            if (!containerRadio) {
                containerRadio = radio.closest('.radio-box')
            }
        }
        if (!valid && containerRadio) {
            this.createError(containerRadio, 'Gênero obrigatorio')
        }
        return valid;
    }

    passwordSee() {
        const passwordIcon = this.formulario.querySelectorAll('.password-icon')
        passwordIcon.forEach((icon) => {
            icon.addEventListener('click', () => {
                const input = icon.previousElementSibling
                input.type = input.type === 'password' ? 'text' : 'password'
                icon.classList.toggle('fa-eye')
            })
        })

    }

    passworIsValid() {
        let valid = true;

        const password = document.getElementById('password')
        const repetPassword = document.getElementById('confirm_password')

        const passwordValue = password.value.trim()
        const repetValue = repetPassword.value.trim()

        if (passwordValue !== repetValue && passwordValue !== '' && repetValue !== '') { //se a senha for diferente mais o campo estiver em branco n executa 
            this.createError(password, 'Senhas diferentes')
            valid = false
        } else if (passwordValue.length < 3 && passwordValue !== '') {
            this.createError(password, 'Senhas  dever ser maior que  4')
            valid = false
        } else if (!passwordValue.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{4,}$/) && passwordValue !== '') {
            this.createError(password, 'Adicione maiúscula, minúscula, símbolo')
            valid = false
        }

        return valid;
    }


    dateIsValid(campo, label) {
        let valid = true
        const date = campo.value.trim()
        const dateToday = new Date()
        const dateInformada = new Date(date)

        if (dateInformada > dateToday) {
            this.createError(campo, `${label} não pode ser maior que a data atual.`)
            valid = false
        }
        return valid;
    }

    emailIsValid(campo, label) {
        let valid = true
        const email = campo.value.trim()

        if (email !== '' && !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) { //Se o e-mail for inválido, quero mostrar uma mensagem de erro ou impedir o envio.
            this.createError(campo, `${label}, informado incompleto.`)
            valid = false
        }
        return valid
    }

    userIsValid(campo, label) {
        let valid = true
        const user = campo.value

        if (!user.match(/^[A-Za-zÀ-ÿ\s]+$/) && campo.value.trim() !== '') { //Se match retornar falso(basicamente a função fala, so tem string aqui) e valor do input for diferente de vazio
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

