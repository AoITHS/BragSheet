var email,
    osis,
    pass,
    cpass;

function doc(name){
    return document.querySelector(name);
}

function error(e){
    return doc(".error").innerHTML = `${e}`;
}

document.querySelector(".btn").addEventListener("click", () =>{
    email = doc(".email").value.trim();
    osis = doc(".osis").value.trim();
    pass = doc(".pass").value.trim();
    cpass = doc(".cpass").value.trim();
    
    if( (email === "") || (osis === "") || (pass === "") || (cpass === "") ){
        error(`something is blank`);
    }else{
        var a = true;
        if(pass !== cpass){
            error(`The passwords do not match`);
        }else{
            error(``);
        }
        console.log(typeof osis);
        // document.querySelector("form").submit();
        // error(``);
    }
});