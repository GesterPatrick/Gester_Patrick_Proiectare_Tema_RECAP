

async function incarcaPostari() {
    const status = document.getElementById('status');
    status.textContent= 'Se incarca...'

    try {
        const raspuns = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!raspuns.ok){
            throw new Error (`Eroare incarcare discutii, HTTP ${raspuns.status}`);
        }
        const data = await raspuns.json();

        // verific daca lista e goala
        if(data.length === 0) {
            status.textContent = 'Lista este goala';
            throw new Error ('Lista este goala');
         }
        // dk raspunsul a reusit si avem elemente, cream li 
         const ul = document.getElementById('ul');
         ul.innerHTML = ' ';

         for(const d of data) {
            const li = document.createElement('li');
            li.textContent =` ${d.title} ${d.body}`;
            ul.append(li);
         }

    }
    catch(error) {
        status.textContent= 'Eroare incarcare discutii' + error.message;
    }
}