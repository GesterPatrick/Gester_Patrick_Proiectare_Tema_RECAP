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

const form = document.getElementById("form");
const status_post = document.getElementById("status-post");

//previn refreshul paginii la butonul Trimitere
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formular = new FormData(form);
    const data = { // datele ce trimit
        title: formular.get("titlu"),
        body: formular.get("mesaj")
    };

    try {
        const raspuns = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }); 
         const body = await raspuns.json();

         // dk raspunsul e intre 4xx
        if(raspuns.status >= 400 && raspuns.status <= 499) {
            status_post.textContent = body.error ?? `HTTP ${raspuns.status}`;
            return;
        }

        // raspunsul a reusit si e Status 201, se creeaza postarea si se adauga in Lista 
        if (raspuns.status === 201) {
            const ul = document.getElementById('ul');
            const li = document.createElement('li');  
            const h4 = document.createElement('h4');
            const p = document.createElement('p'); 

            h4.textContent = data.title;
            p.textContent = data.body;

            li.append(h4);
            li.append(p);

            ul.append(li);
            status_post.textContent = "Discutia a fost adaugata.";
            form.reset();
        }
    }
    catch(error) {
        status_post.textContent = 'Eroare ' + error.message;
    }
})
