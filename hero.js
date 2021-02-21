class Member {
    constructor(name,power){
        this.name = name;
        this.power = power;
    }
}

class Hero {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.members = [];
    }

addMember(member){
    this.members.push(member);
}

deleteMember(member){
    let index = this.members.indexOf(member);
    this.members.splice(index, 1);
  }
}

let heros = [];
let heroId = 0;

onclick('new-hero', () =>{
    heros.push(new Hero(heroId++, getValue('new-hero-name')))
    drawDOM();
});

function onclick(id, action){
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id){
    return document.getElementById(id).value;
}

function drawDOM(){
    let heroDiv = document.getElementById('heros');
    clearElement(heroDiv);
    for (hero of heros){
        let table = createHeroTable(hero);
        let title = document.createElement('h2');
        title.innerHTML = hero.name;
        title.appendChild(createDeleteHeroButton(hero));
        heroDiv.appendChild(title);
        heroDiv.appendChild(table);
        for (member of hero.members){
            createMemberRow(hero, table, member);
        }

    }
}
function createMemberRow(hero, table, member){
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.power;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(hero, member));
}

function createDeleteRowButton(hero, member){
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = hero.members.indexOf(member);
        hero.members.splice(index, 1);
        drawDOM();
    };
    return btn;
}
//Is the button that shows when the Create List button is clicked. Allows user to delete list.
function createDeleteHeroButton(hero){
    let btn = document.createElement('button');
    btn.className ='btn btn-primary';
    btn.innerHTML ='Delete List';
    btn.onclick = () => {
        let index = heros.indexOf(hero);
        heros.splice(index, 1);
        drawDOM();
    };
   return btn; 
}

function createNewMemberButton(hero){
    let btn = document.createElement('button');
    btn.className ='btn btn-primary';
    btn.innerHTML='Create';
    btn.onclick = () => {
        hero.members. push(new Member(getValue(`name-input-${hero.id}`), getValue(`power-input-${hero.id}`)));
        drawDOM();
    };
   return btn;
}

function createHeroTable(hero){
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let powerColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    powerColumn.innerHTML = 'Power';
    row.appendChild(nameColumn);
    row.appendChild(powerColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let powerTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${hero.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let powerInput = document.createElement('input');
    powerInput.setAttribute('id', `power-input-${hero.id}`);
    powerInput.setAttribute('type', 'text');
    powerInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(hero);
    nameTh.appendChild(nameInput);
    powerTh.appendChild(powerInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(powerTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}