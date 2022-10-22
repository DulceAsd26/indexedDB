
// indexedDB: Reforzamiento
let request = window.indexedDB.open('mi-database', 1);

//Se actualiza cuando se crea o se sube la versiónd e la base datos
request.onupgradeneeded = event => {

    console.log('Actualización de BD');

    let db = event.target.result;

    db.createObjectStore('heroes', {
        keyPath: 'id'
    });

};

//Manejo de errores
request.onerror = event => {
    console.log('DB error', event.target.error );
};


//Insertar datos
request.onsuccess = event => {

    let db = event.target.result;

    let heroesData = [
        {id: '1111', heroe: 'Spiderman', mensaje: 'Aquí su amigo Spiderman'},
        {id: '2222', heroe: 'Ironman', mensaje: 'Aquí en mi nuevo Mark 50'},
    ];


    let heroesTransaction = db.transaction('heroes', 'readwrite');

    heroesTransaction.onerror = event => {
        console.log('Error guardado', event.target.error);
    };

    //Informa sobre ek éxito de la tranacción
    heroesTransaction.oncomplete = event => {
        console.log('Transacción hecha', event);
    };

    let heroesStore = heroesTransaction.objectStore('heroes');

    for( let heroe of heroesData ){
        heroesStore.add( heroe);
    }

    heroesStore.onsuccess = event => {
        console.log('Nuevo item agregando a la base de datos');
    };


};



