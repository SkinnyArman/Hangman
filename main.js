



const finalmsg=document.getElementById('final-message');
const word=document.getElementById('word');
const notif=document.getElementById('notification');
const wrongLetters=document.getElementById('wrong-letters');
const popUp=document.getElementById(`popup-container`);
const playAgainBtn=document.getElementById(`play-again-btn`);
const organs=document.querySelectorAll(`.body-part`);
let all=document.querySelector('html');

let url="https://random-word-form.herokuapp.com/random/animal"




let wordsCollection=['taxi','umbrella','pencil','comb','blackboard','mouse',
'desk','elevator','facebook','translation','sleep','market','wireless',
'internet','germany','cucumber','honeydew',
'electricity','marker','explosion','laptop','criticism','enormous','keyboard','cryptocurrency','charger','canada','soda',
,'experimentation','youtube','ballad','sweatshirt','incense']


let correctLetters=[];
let wrongGuessedLetters=[];
let selectedWord=wordsCollection[Math.floor(Math.random() * wordsCollection.length)]
let selectedWordlettersArr=selectedWord.split('');  




function letterCreator() {
    selectedWordlettersArr.forEach(()=>{
        let wordEl=document.createElement('div');
        wordEl.innerHTML='';
        wordEl.classList.add('word-letter');
        word.appendChild(wordEl);
    })    
}


//remove the duplicated words
let duplicateRemover = (arr) => arr.filter((v,i) => arr.indexOf(v) === i)


function displayWord() {

    let allLetters=document.querySelectorAll('.word-letter');
    selectedWordlettersArr.forEach( (item,index) =>{
        if ( correctLetters.includes(item) ){
            allLetters[index].innerHTML=`${item}`
        }
    })
    isItDone();
    
}
function isItDone() {
    let allLetters=document.querySelectorAll('.word-letter');
    let value=Array.from(allLetters).every(item=>item.innerHTML!='');
    

    if (value){
        popUp.style.display='flex';
        finalmsg.innerHTML="You Have Won!";
    }
}
function showNotif() {
    notif.classList.add('show-notif')


    setTimeout(()=>{
    notif.classList.remove('show-notif')
    },1400)
}

function updateWrongLetters() {
    wrongLetters.innerHTML=`${wrongGuessedLetters.length >0 ? '<p>Wrong</p>' : ''}`
    wrongGuessedLetters.forEach (item=>{
        el=document.createElement('span');
        el.innerHTML=item+' ';
        wrongLetters.append(el)
    })

    organs.forEach((part,index)=>{
        let errors=wrongGuessedLetters.length;
        if (index<errors){
            part.style.display="block"
        } else {
            part.style.display="none";
        }
    })

    if (organs.length === wrongGuessedLetters.length){
        finalmsg.innerHTML=`Unfortunately you have lost ! <br/> The word was <i>${selectedWord}</i>`
        popUp.style.display="flex";
    }
}

document.addEventListener('keydown', e=>{
    if (e.keyCode >= 65 && e.keyCode <= 90){
        const letter=e.key;
        if (selectedWordlettersArr.includes(letter)){
            if (!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord();
            } else {
                showNotif();}
        } else {
        if (!wrongGuessedLetters.includes(letter)) {
            wrongGuessedLetters.push(e.key);
            updateWrongLetters();

        } else{
            showNotif();
        }
    }
    }
}
    )
    
playAgainBtn.addEventListener('click',()=>{
popUp.style.display='none';
correctLetters.splice(0);
wrongGuessedLetters.splice(0);

    
allLetters=document.querySelectorAll('.word-letter');
allLetters.forEach(item=>{item.remove()})


selectedWord=wordsCollection[Math.floor(Math.random() * wordsCollection.length)];
selectedWordlettersArr=selectedWord.split('');  

letterCreator();
updateWrongLetters();

displayWord();

var request=new XMLHttpRequest;
request.open("GET",url,true)
request.send();
request.onreadystatechange= () =>{
        dataLoaded=request.response;

        dataObjected=JSON.parse(dataLoaded)
        if ( !dataObjected[0].split('').includes(' ') ) {
            wordsCollection.push(dataObjected[0]);
            wordsCollection=duplicateRemover(wordsCollection);
    
        } 

        console.log(wordsCollection)

}



})

letterCreator();
