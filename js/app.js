var nb_clics = 0;
var mini1 = "";
var mini2 = "";
var case1 = "";
var case2 = "";
var img_ok = 0;
var nb_erreurs = 0;
var le_score = 0;
var depart = false;
var temps_debut = new Date().getTime();

generation();

var attente = setTimeout(function () {
    for (var i = 0; i < 16; i++) {
        document.getElementById('img' + i).src = "mini/miniz.png";
    }
    depart = true;
}, 4000);

function generation() {
    var nb_alea;
    var nb_img = "";
    var test = true;
    var chaine = "";

    for (var i = 0; i < 16; i++) {
        while (test == true) {
            nb_alea = Math.floor(Math.random() * 16) + 1;
            if (chaine.indexOf("-" + nb_alea + "-") > -1)
                nb_alea = Math.floor(Math.random() * 16) + 1;
            else {
                nb_img = Math.floor((nb_alea + 1) / 2);
                document.getElementById('case' + i).innerHTML = "<img style='cursor:pointer;' id='img" + i +
                    "' src='mini/mini" + nb_img + ".png' onClick='verifier(\"img" + i + "\",\"mini" + nb_img +
                    "\")' alt='' />";
                chaine += "-" + nb_alea + "-";
                test = false;
            }
        }
        test = true;
    }
}

function verifier(limg, source) {
    if (depart == true) {
        nb_clics++;
        document.getElementById(limg).src = "mini/" + source + ".png";
        if (nb_clics == 1) {
            mini1 = source;
            case1 = limg;
        } else {
            mini2 = source;
            case2 = limg;

            if (case1 != case2) {
                depart = false;
                if (mini1 != mini2) {
                    var attente = setTimeout(function () {
                        document.getElementById(case1).src = "mini/miniz.png";
                        document.getElementById(case2).src = "mini/miniz.png";
                        depart = true;
                        nb_clics = 0;
                        nb_erreurs++;
                        if (nb_erreurs < 21) le_score = 20 - nb_erreurs;
                        document.getElementById("score").innerHTML = "<strong>" + le_score + "</strong>/20";
                    }, 1000);
                } else {
                    depart = true;
                    nb_clics = 0;
                    img_ok += 2;
                    if (img_ok == 16) {
                        var dif_temps = Math.floor((new Date().getTime() - temps_debut) / 1000);
                        document.getElementById("score").innerHTML = "<strong>" + le_score + "</strong>/20";
                        document.getElementById("temps").innerHTML = "Vous avez mis<strong>" + dif_temps +
                            "</strong> secondes";
                    }
                    if (dif_temps > 180) {
                        document.getElementById("temps").innerHTML = "Le temps imparti est dépassé, vous avez perdu !";
                        depart = false;
                    }
                }
            } else {
                if (nb_clics == 2) nb_clics = 1;
            }
        }
    }
}


document.getElementById("start_timer").addEventListener("click",function(){
let seconds = 180;
const countdownTimer = setInterval(
    function(){
        const minutes = Math.round((seconds - 30) / 60); //  (1200 - 30) / 60) = 19.5  //math round permet d'arrondir à 20
        let remainingSeconds = seconds % 60;   // 500 modulo 60  = 20
        if(remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds; // on ajoute un 0 en chaine de caractère , en fait c'est une question de format     10 min 5 sec => 10 min 05 sec
        }
        document.getElementById("countdown").innerHTML =   + minutes + " minutes" + ":" +remainingSeconds + " secondes";

        if(seconds == 0) { // si var seconds = 0 alors le minuteur est terminé et affiche un message.
            clearInterval(countdownTimer); // Permet d'annuler une action répétée minutée initiée via un appel à setInterval().
            document.getElementById("countdown").innerHTML = "fin du compte à rebours"; // si les secondes sont = 0 alors affiche "fin du compte à rebours"
        }
        else{
            seconds --; // si les secondes ne sont pas à zéro alors on décremente.
        }
},1000); // / l'interval du décompte est de 1000 millisecondes soit 1 seconde.
});
