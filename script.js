/* fonction pour remplacer image de Goeland à chaque clique*/
function imagefun() {
  var Image_Id = document.getElementById('getImage');
  if (Image_Id.src.match("gull1.png")) { /* test de source d'image; selon le nom l'image source la fonction choisit celle qui s'affichera au prochaîn click */
      Image_Id.src = "gull2.png";
  }
  else if (Image_Id.src.match("gull2.png")) {
    Image_Id.src = "gull3.png";
  }
  else if (Image_Id.src.match("gull2.png")) {
    Image_Id.src = "gull3.png";
  }
  else if (Image_Id.src.match("gull3.png")) {
    Image_Id.src = "gull4.png";
  }
  else if (Image_Id.src.match("gull4.png")) {
    Image_Id.src = "gull5.png";
  }
  else if (Image_Id.src.match("gull5.png")) {
    Image_Id.src = "gull6.png";
  }
  else if (Image_Id.src.match("gull6.png")) {
    Image_Id.src = "gull7.png";
  }
  else if (Image_Id.src.match("gull7.png")) {
    Image_Id.src = "gull8.png";
  }
    else {
        Image_Id.src = "gull1.png"; /* reinitialisation de la boucle d'images à la première image de l'animation*/
    }
  }   

/*  Animation slider Dynamique*/
const track = document.getElementById("image-track"); /* appel à la classe d'objet contenant les images en suite*/

const handleOnDown = c => track.dataset.mouseDownAt = c.clientX; /* écoute l'évenement "mouseDownAt" pour quand la souris est cliquée, 
création d'un dataset pour stocker stocker l'information de position de la souris la plus récente  */

const handleOnUp = () => { /* à l'ouverture de la page la valeur est vide pour que l'animation ne joue pas avant l'action de l'utilisateur */
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage; /* prise en compte de dernière valeur de percentage */
}

/* Animation d'un row d'images qui scrollent selon un pourcentage contrôlé par le mouvement de la souris une fois cliquée */
const handleOnMove = c => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - c.clientX, /* prise en compte d'un string avec les les coordonées du point où la souris a cliqué*/
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100, /* le Slider se déplace selon un pourcentage contrôlé par le mouvement horizontal de la souris,
   le constant prend en compte la position de la souris lorsqu'elle est cliquée et le transforme en pourcentage  */
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({ /* animation deplacement d'images */
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) { /* selection de la classe "images" */
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- réactions à évenements renvoyant une valeur c -- */

window.ontouchstart = c => handleOnDown(c.touches[0]); /* lorsque le click commence */

window.onmousedown = c => handleOnDown(c); /* tant que la souris est cliquée*/

window.ontouchend = c => handleOnUp(c.touches[0]); /* lorsque le bouton de souris est laché*/

window.onmouseup = c => handleOnUp(c); /*tant que la souris n'est pas cliquée */

window.onmousemove = c => handleOnMove(c); /* au mouvement de la souris */

window.ontouchmove = c => handleOnMove(c.touches[0]); /* lorsque la souris touche le slider et se déplace */