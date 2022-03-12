  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { getFirestore, collection, getDocs, deleteDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // https://www.gstatic.com/firebasejs/8.6.2/firebase-firestore.js
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = { //MIN UNIKE DATABASE DATA
    apiKey: "AIzaSyCB8opscYC44aGXGfJx92zXZsJW2K3BGAo",
    authDomain: "huskeliste-81fd7.firebaseapp.com",
    projectId: "huskeliste-81fd7",
    storageBucket: "huskeliste-81fd7.appspot.jjjj",
    messagingSenderId: "959103870309",
    appId: "1:959103870309:web:69bfee81bcc00e520ead8c",
    measurementId: "G-0JW4KRTPJB"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const knapp = document.querySelector('#submit') //lager en som heiter knapp, denne submitter
  const slettKnapp = document.querySelector('#slettKnapp') //Lager en sletteknapp
  const app = initializeApp(firebaseConfig);  
  const db = getFirestore(app);

  // Lager en referanse til databasen
  async function hentHuskeliste(db){
    const huskCol = collection(db, 'Huskeliste');
    const huskSnapshot = await getDocs(huskCol);
    const huskList = huskSnapshot.docs.map(doc => doc.data());
    
      console.log(huskList)
      for(let i = 0; i < huskList.length; i++){ //Leser gjennom alle verdien i databasen 
        let Husketekst = huskList[i].Husketekst;
        let Ferdig = huskList[i].Ferdig
        let Notat = huskList[i].Notat
        visHuskeElement(Husketekst, Ferdig, Notat) //sender det gjenom en annen funksjon
      }
    }; hentHuskeliste(db) //Kjører funksjonen

   // Henter <ul>-elementet
    let table = document.querySelector("table"); //Lager en variable til tabellen
    
    function visHuskeElement(Husketekst, Ferdig, Notat) { //lager en funksjon som har 3 parameter

    let liste = document.createElement("tr");     // Lager et <tr>-element
    liste.innerHTML  = `<td>${Husketekst}` ; // Legger til huskelisteteksten i <td>-elementet
    liste.innerHTML += `<td>${Ferdig}`;    // Legger til huskelisteteksten i <td>-elementet
    liste.innerHTML += `<td>${Notat}`;    // Legger til huskelisteteksten i <td>-elementet
    
    // Legger til <li>-elementet i <ul>-elementet
    table.appendChild(liste);   //Sender dei inn i tabellen
  }
      knapp.addEventListener( //Legger til en lytter til knappen
        "click", //Når knapp blir trykt så kjør funksjonen under
        async function(){ //lager async funksjon så eg kan legge til await i den
        let newHuskeTekst = document.querySelector('#txtInput').value // Henter verdier
        let erGjort = document.querySelector('#erGjort').value
        let notat = document.querySelector('#notat').value
        await leggTilCol(newHuskeTekst, erGjort, notat)//Kjører dei innskrive verdiane inn i leggTilCol funksjonen har await slik at alle parameterene er lastet inn

        let test = newHuskeTekst ?? false
        if(test){
          location.reload() 
        } else{}

      //   if(document.querySelector('#txtInput') && newHuskeTekst ){
      //     if(document.querySelector('#notat') && notat){ //Prøvde å gjer sann at om der va noke i inputane så oppdaterte den sida men trur ej berre heller he en knapp.
      //       location.reload()
      //     } else{}
      //   } else{}
        })

    async function leggTilCol(txt, isDone, note){ //Har async for å bruke await slik firebase sa eg måtte bruke for å legge til dokumenter her: https://firebase.google.com/docs/firestore/manage-data/add-data 
      console.log(txt, isDone, note) //tester
      let ID = txt.substring(0,10) //lager unik ID, vertfall nesten... 
      await setDoc(doc(db, "Huskeliste", `Document-${ID}`), { //legger til alle verdiene
        Husketekst: txt, //Legger dei til i dei forskjellige objectsa 
        Ferdig: isDone,
        Notat: note
      });
    }

    slettKnapp.addEventListener(
      "click",
      async function(){
      let slettInput = document.querySelector('#slettInput').value
      let identifier = slettInput.substring(0,10)
      console.log(identifier)
      await deleteDoc(doc(db, "Huskeliste", `Document-${identifier}`));
      }
    )