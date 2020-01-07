var val1;
document.querySelector(".i1").oninput = function(){
    val1 = document.querySelector(".i1").value.trim();
    console.log(val1);
};
document.querySelector(".i1").addEventListener("focus", function(){
    val1 = document.querySelector(".i1").value.trim();
    document.querySelector(".l1").style = "transform: translate(-17px, -15px) scale(.4, .4)";
});
document.querySelector(".i1").addEventListener("blur", function(){
    if (val1 === ""){
        document.querySelector(".l1").style = "transform scale(1, 1)";
    }else{
        document.querySelector(".l1").style = "transform: translate(-17px, -15px) scale(.4, .4)";
    }
});

var val2;
document.querySelector(".i2").oninput = function(){
    val2 = document.querySelector(".i2").value.trim();
    console.log(val2);
};
document.querySelector(".i2").addEventListener("focus", function(){
    val2 = document.querySelector(".i2").value.trim();
    document.querySelector(".l2").style = "transform: translate(-17px, -15px) scale(.4, .4)";
});
document.querySelector(".i2").addEventListener("blur", function(){
    if (val2 === ""){
        document.querySelector(".l2").style = "transform scale(1, 1)";
    }else{
        document.querySelector(".l2").style = "transform: translate(-17px, -15px) scale(.4, .4)";
    }
});