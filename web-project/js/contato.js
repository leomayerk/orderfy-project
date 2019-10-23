function validateForm() {
    
    var nome = contactForm.nome.value;
    var sobrenome = contactForm.sobrenome.value;
    var email = contactForm.email.value;
    var phone = contactForm.phone.value;
    var info = contactForm.textinfo.value;

    // valida se o campo n esta vazio
    if (nome == "") {
        alert("Por favor, preencha o campo nome.");
        contactForm.nome.focus();
        return false;

    }

    // valida se o campo n está vazio
    if (sobrenome == "") {
        alert("Por favor, preencha o campo sobrenome.");
        contactForm.sobrenome.focus();
        return false;

    }

    // valida se o campo possui no minimo 10 digitos
    if (phone == "" || phone.length <= 10) {
        alert("Por favor, preencha o campo celular.");
        contactForm.phone.focus();
        return false;

    }

    // valida se o campo possui o @
    if (email == "" || email.indexOf('@') == -1) {
        alert("Por favor, preencha o campo e-mail.");
        contactForm.email.focus();
        return false;

    }

    // valida se o campo possui no minimo 50 caracteres
    if (info.length <= 49) {
        alert("Por favor, preencha o campo informações com no mínimo 50 caracteres");
        contactForm.info.focus();
        return false;

    }

}

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/Login', true)

request.onload = function () {
    alert("foi ?");
}

request.send()