// var email,
//     osis,
//     pass,
//     cpass;

function doc(name){
    return document.querySelector(name);
}

// function error(e){
//     return doc(".error").innerHTML = `${e}`;
// }

doc("#two").addEventListener("click", () =>{
//     email = doc(".email").value.trim();
//     osis = doc(".osis").value.trim();
//     pass = doc(".pass").value.trim();
//     cpass = doc(".cpass").value.trim();
    
//     if( (email === "") || (osis === "") || (pass === "") || (cpass === "") ){
//         error(`something is blank`);
//     }else{
//         var a = true;
//         if(pass !== cpass){
//             error(`The passwords do not match`);
//         }else{
//             error(``);
//         }
//         console.log(typeof osis);
         doc(".two").submit();
//         error(``);
//     }
    
    
});



var school;
var select = doc('.school');
select.onchange = function(){
    school = select.options[select.selectedIndex].innerHTML;
};

var school;
var select = doc('.school');
select.onchange = function(){
    school = select.options[select.selectedIndex].innerHTML;
};

/*
doc("#one").addEventListener("click", () =>{
    if(school.trim() === "" || grade.trim() === "" || osis === ""){
        alert("something is blank!!!");
    }else{
        doc(".one").submit();
        document.querySelector(".two").style.display = "inline-block";
        document.querySelector(".one").style.display = "none";
    }
});
*/


