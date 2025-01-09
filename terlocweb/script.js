btn = document.getElementById('btn');

btn.addEventListener('click', Register);

function Register(){
    VerificarSenhas();
}

function VerificarSenhas(){
    let password = document.getElementById('inp_pass').value;
    let confpass = document.getElementById('inp_confpass').value;

    if(password == confpass){
       alert("Iguais");  
       return true;                                                  
    }
    else{
        alert("Não são iguais.");
        return false;
    }
}