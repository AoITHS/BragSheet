function d ( name )
{
    return document.querySelector(name);
}

function error(a){
    return document.querySelector('.error').innerHTML = a;
}

var profile = {
    firstName: '',
    lastName: '',
    middileInitial: '',
    email: '',
    dob: '',
    gender: '',
    race: '',
    languages: ''     
},
    g,
    r;

var gen = document.getElementsByName('gender');

gen.forEach( (v, i) => {
    gen[i].onchange = function (){
        if( d('#g-other').checked ) 
            d('.g-other-v').classList.remove('d-none');
        else
        {
            d('.g-other-v').classList.add('d-none');
            g = v.value;
        }
    }
});

var r = document.getElementsByName('race');

r.forEach( (v, i) => {
    r[i].onchange = function (){
        if( d('#r-other').checked ) 
            d('.r-other-v').classList.remove('d-none');
        else
        {
            d('.r-other-v').classList.add('d-none');
            r = v.value;
        }
    }
});

d('.part-one').addEventListener('click', () => {

    profile.firstName = d('.fname').value;
    profile.lastName = d('.lname').value;
    profile.middileInitial = d('.mi').value;
    profile.email = d('.email').value;
    profile.dob = d('.dob').value;
    profile.languages = d('.lang').value;
    
    if( d('#g-other').checked ) profile.gender = d('.g-other-v').value.trim();
    else profile.gender = g;

    if( d('#r-other').checked ) profile.race = d('.g-other-v').value.trim();
    else profile.race = r;

    if( profile.firstName === '' || profile.lastName === '' || profile.middileInitial === '' || profile.email === '' || profile.dob === '' || profile.languages === '#' || profile.gender === '' || profile.race === '' ) error('Some information is missing');
    else
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(profile.email) === false) error("You have entered an invalid email address!");
        else{
            error('');
            fetch('/bragsheet-ap1', {
                method: "POST",
                headers: {
                    'content-type': "aplication/json"
                },
                body: JSON.stringify(profile)
            });
            window.location.replace("/form/parents");
        }
    }
});