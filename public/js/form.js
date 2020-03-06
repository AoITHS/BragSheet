function d ( name )
{
    return document.querySelector(name);
}

var partOne = {
    firstName: null,
    lastName: null,
    middileInitial: null,
    email: null,
    dob: null,
    gender: null,
    race: null,
    languages: null     
},
    Gvalid = false,
    Rvalid = false;

var gen = document.getElementsByName('gender');

gen.forEach( (v, i) => {
    gen[i].onchange = function (){
        if( v.value === 'other' ) 
        {
            Gvalid = true;
            d('.g-other-v').classList.remove('d-none');
        }
        else 
        {
            Gvalid = false;
            d('.g-other-v').classList.add('d-none');
            
        }
    }
});


d('#r-other').addEventListener('change', () => {
    if( d('#r-other').checked ) 
    {
        d('.r-other-v').classList.remove('d-none');
        
    }
    else 
    {
        d('.r-other-v').classList.add('d-none');
    }
});

d('.part-one').addEventListener('click', () => {

    partOne.firstName = d('.fname').value;
    partOne.lastName = d('.lname').value;
    partOne.middileInitial = d('.mi').value;
    partOne.email = d('.email').value;
    partOne.dob = d('.dob').value;
    partOne.languages = d('.lang').value;
    
    if( Gvalid === true )
    {
        var Gv = d('.g-other-v').value.trim();
        if( Gv === '' )
        {
            alert(0);
        }
    }
    else
    {
        alert(1);
    }

});