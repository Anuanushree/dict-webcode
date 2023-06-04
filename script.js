let form = document.querySelector('.dictForm');
let wordInput = document.querySelector('.wordinput');
let wordInfo = document.querySelector('.meaningForward');
let search = document.querySelector('.searchbtn');
let container = document.querySelector('.containerbody')
container.style.display = "none"
// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     let word = wordInput.value;
//     console.log(word);
// })
async function getmeaning(word) {
    try {
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        let data = await response.json();
        let paragraph = document.createElement('div');
        let source = document.createElement('div');
        paragraph.setAttribute('id' , 'paragraph')
        source.setAttribute('id','source')
        paragraph.innerHTML = `Word: <b>${data[0].word}</b>`
        source.innerHTML = `Source: <a href="${data[0].phonetics[0].sourceUrl}">${data[0].phonetics[0].sourceUrl}</a>`

        wordInfo.appendChild(paragraph)
        wordInfo.appendChild(source)
        let list = document.createElement('ul');
        let meanings = data[0].meanings;
        for (let meaning of meanings) {

            let listItems = document.createElement('li');
            listItems.innerHTML = `${meaning.partOfSpeech}`;

            let sublist = document.createElement('ol');
            sublist.style.listStyleType = "disc";

            let definitions = meaning.definitions;

            for (let definition of definitions) {
                let sublistItems = document.createElement('li');
                sublistItems.innerHTML = `<em>${definition.definition}</em>`
                sublist.appendChild(sublistItems)
            }

            listItems.appendChild(sublist)
            list.appendChild(listItems)
        }

        wordInfo.appendChild(list)

    } catch (error) {
        console.error("error")
    }
}


function handleSubmit(e) {
    e.preventDefault();
    container.style.display="block"
    wordInfo.innerHTML="";
    let word = wordInput.value;
    console.log(word);

    getmeaning(word);
}
form.addEventListener('submit', handleSubmit)
search.addEventListener('click', handleSubmit)