incarcaPostari();

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
            return;
         }
        // dk raspunsul a reusit si avem elemente, cream li 
         const ul = document.getElementById('ul');
         ul.innerHTML = ' ';

         for(const d of data) {
            const li = document.createElement('li');  // creez elementele HTML
            const p = document.createElement('p'); 
            const h4 = document.createElement('h4');

            h4.textContent = `${d.title}`;    //pun titlul intr-un <h4>
            p.textContent = `${d.body}`;      // body-ul intr-un <p>

            li.append(h4);    // le lipesc sa fie intr-un <li>
            li.append(p);

            ul.append(li);  // lipesc <li>-ul de lista principala <ul>
         }

         status.textContent =' ';

    }
    catch(error) {
        status.textContent= 'Eroare incarcare discutii' + error.message;
    }
}