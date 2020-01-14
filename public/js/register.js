var email,
    osis,
    pass,
    cpass;

document.querySelector(".btn").addEventListener("click", () =>{
    email = document.querySelector(".email").value.trim();
    osis = document.querySelector(".osis").value.trim();
    pass = document.querySelector(".pass").value.trim();
    cpass = document.querySelector(".cpass").value.trim();
    
    if( (email === "") || (osis === "") || (pass === "") || (cpass === "") ){
        document.querySelector(".error").innerHTML = `something is blank`;
    }else{
        document.querySelector("form").submit();
    }
});