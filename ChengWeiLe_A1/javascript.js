function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 

/* Start of Game Function */
function start() {
    Hide_Backside_Function();
    Hide_History_Function();
    createdeck();
    Dealing_Card();
}


let deck = [];
let PlayerCard = [];
let ComputerCard = [];
let suits = ["Spade", "Heart", "Club", "Diamond"];
let numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

async function createdeck() {
    let Message = document.getElementsByTagName("h1")[0];
    let button = document.getElementById("Start_Again");
    button.style.display = "none";
    Message.innerHTML = "Waiting for dealing";
    Clear_Table();
    Hide_Function_Button();
    for (let x = 0; x < suits.length; x++) {
        for (let y = 0; y < numbers.length; y++) {
            deck.push(suits[x] + numbers[y]);
        }
    }
    deck = deck.sort(() => Math.random() - 0.5);
    return deck;
}

function Hide_Function_Button() {
    document.getElementById("DrawCard").style.display = "none";
    document.getElementById("EndTurn").style.display = "none";
}

function Display_Function_Button() {
    document.getElementById("DrawCard").style.display = "block";
    document.getElementById("EndTurn").style.display = "block";
}


function Clear_Table() {
    document.getElementById("Computer_Hand_Card").innerHTML = "";
    document.getElementById("Player_Hand_Card").innerHTML = "";
    deck = [];
    PlayerCard = [];
    ComputerCard = [];
}


async function Dealing_Card() {
    let Message = document.getElementsByTagName("h1")[0];
    for (let i=1;i<=2;i++) {
        DrawCardSound();
        Draw_To_Computer_Animation();
        let Card_of_Computer = deck.shift();
        await sleep(500);
        Display_Computer_Card(Backside_Style);
        ComputerCard.push(Card_of_Computer);
        Display_Computer_Hand_Card_Animation();
        await sleep(500);

        DrawCardSound();
        Draw_To_Player_Animation();
        let Card_of_Player = deck.shift();
        await sleep(500);
        Display_Player_Card(Card_of_Player);
        PlayerCard.push(Card_of_Player);
        Display_Player_Hand_Card_Animation();
        await sleep(500);
    }

        await sleep(500);
        Message.innerHTML = "Your Round";
        Display_Function_Button();
}


/* Start of Player Part*/

function Display_Player_Card(Card_of_Player) {
    let PlayerHandCard = document.getElementById("Player_Hand_Card");
    let img = document.createElement("img");
    img.src = 'Img/' + Card_of_Player +'.jpg';
    PlayerHandCard.appendChild(img);
}

async function Player_DrawCard() { 
    Hide_Function_Button();
    DrawCardSound();
    Draw_To_Player_Animation();
    await sleep(500);
    let Card_of_Player = deck.shift();
    Display_Player_Card(Card_of_Player);
    PlayerCard.push(Card_of_Player);
    Display_Player_Hand_Card_Animation();
    Player_total = Calculate_Player_Total(PlayerCard);
    if (Player_total >= 21) {
        Display_Function_Button();
        document.getElementById("DrawCard").style.display = "none";
    } else {
        Display_Function_Button();
    }
    return deck, PlayerCard;
}

function Get_Player_Card_Value(PlayerCard) {
    let Player_value = PlayerCard.match(/[A-Z]|\d+/g).pop();
    if (Player_value === 'A') {
        return 11; 
    } else if (['J', 'Q', 'K'].includes(Player_value)) {
        return 10;
    } else {
        return parseInt(Player_value);
    }
}

function Calculate_Player_Total(PlayerCard) {
    let Player_total = 0;
    let Player_aces = 0;

    for (let card of PlayerCard) {
        let Player_value = Get_Player_Card_Value(card); 
        if (Player_value === 11) {
            Player_aces++;
        }
        Player_total += Player_value;
    }

    if (Player_total > 21 && Player_aces > 0) {
        Player_total -= 10;
        Player_aces--;
    }
    return Player_total;
}

/*End of Player Part*/


/*Start of Computer Part */

function Display_Computer_Real_Card() {
    let ComputerHandCard = document.getElementById("Computer_Hand_Card");
    for (let i = 0; i < ComputerCard.length; i++) {
        ComputerHandCard.children[i].src = "Img/" + ComputerCard[i] + ".jpg";
    }
}

function Display_Computer_Card(Backside_Style) {
    let ComputerHandCard = document.getElementById("Computer_Hand_Card");
    let img = document.createElement("img");
    if (Backside_Style == "Original") {
        img.src = "Img/Backside_Original.jpg";
    } else if (Backside_Style == "Simple") {
        img.src = "Img/Backside_Simple.jpg";
    } else if (Backside_Style == "Modern") {
        img.src = "Img/Backside_Modern.jpg";
    }
    ComputerHandCard.appendChild(img);
}

function Get_Computer_Card_Value(ComputerCard) {
    let Computer_value = ComputerCard.match(/[A-Z]|\d+/g).pop();
    if (Computer_value === 'A') {
        return 11; 
    } else if (['J', 'Q', 'K'].includes(Computer_value)) {
        return 10;
    } else {
        return parseInt(Computer_value);
    }
}

function Calculate_Computer_Total(ComputerCard) {
    let Computer_total = 0;
    let Computer_aces = 0;
    for (let card of ComputerCard) {
        let Computer_value = Get_Computer_Card_Value(card); 
        if (Computer_value === 11) {
           Computer_aces++;
        }
        Computer_total += Computer_value;
    }

    if (Computer_total > 21 && Computer_aces > 0) {
        Computer_total -= 10;
        Computer_aces--;
    }
    return Computer_total;
}

async function Computer_DrawCard(ComputerCard,deck) {
    while(true) {
        let Computer_total = Calculate_Computer_Total(ComputerCard);
        await sleep(500);
        if (Computer_total<17) {
                DrawCardSound();
                Draw_To_Computer_Animation();
                await sleep(500);
                let Card_of_Computer = deck.shift();
                Display_Computer_Card(Backside_Style);
                ComputerCard.push(Card_of_Computer);
                Display_Computer_Hand_Card_Animation();

            } else if (Computer_total>=19 && Computer_total <21) {
                if (Math.random()>0.90) {
                    DrawCardSound();
                    Draw_To_Computer_Animation();
                    await sleep(500);
                    let Card_of_Computer = deck.shift();
                    Display_Computer_Card(Backside_Style);
                    ComputerCard.push(Card_of_Computer);
                    Display_Computer_Hand_Card_Animation();

                } else{

                    break;

                }

            } else if (Computer_total>=17 && Computer_total <21) {
                if (Math.random()>0.5) {
                    Draw_To_Computer_Animation();
                    await sleep(500);
                    let Card_of_Computer = deck.shift();
                    Display_Computer_Card(Backside_Style);
                    ComputerCard.push(Card_of_Computer);
                    Display_Computer_Hand_Card_Animation();

                } else {

                    break;

                }

            } else {

                break;

            }
    }
}

/*End of Computer Part*/


async function EndYourRound() {
    Hide_Function_Button();
    let Message = document.getElementsByTagName("h1")[0];
    Message.innerHTML = "Computer Round";
    Computer_DrawCard(ComputerCard,deck);
    await sleep(4000);
    Message.innerHTML = "Computer Round End"
    await sleep(1000);
    Display_Computer_Real_Card();
    Message.innerHTML = "Calculating..."
    await sleep(2000);
    [Computer_total,Player_total,winner] = Define_Final_Winner();
    onGameEnd(Computer_total,Player_total,winner);
    end();
}


function Define_Final_Winner() {
    let Player_total = Calculate_Player_Total(PlayerCard);
    let Computer_total = Calculate_Computer_Total(ComputerCard);
    let Message = document.getElementsByTagName("h1")[0];

    console.log("Playertotal:"+Player_total);
    console.log("Computertotal:"+Computer_total);

    if (Player_total > 21 && Computer_total <= 21) {
        Message.innerHTML= "Computer Win!";
        winner = "Computer";
        LosingSound();
    } else if (Player_total <= 21 && Computer_total > 21) {
        Message.innerHTML = "Player Win!";
        winner = "Player";
        WinningSound();
    } else if ((Player_total > 21 && Computer_total > 21)) {
        Message.innerHTML = "Tie";
        winner = 'Tie';
        WinningSound();
    } else if (Player_total > Computer_total) {
        Message.innerHTML = "Player Win!";
        winner = "Player";
        WinningSound();
    } else if (Player_total < Computer_total) {
        Message.innerHTML = "Computer Win!";
        winner = "Computer";
        LosingSound();
    } else if (Player_total == Computer_total) {
        Message.innerHTML = "Tie";
        winner = 'Tie';
        WinningSound();
    } 
    return [Computer_total,Player_total,winner]
}


function end() {
    Display_History_Function();
    Display_Backside_Function();
    let button = document.getElementById("Start_Again");
    button.innerHTML = "Again?";
    button.style.display = "block";
}

/* End of Game Function */


/* Start of Card Backside Function */

let Backside_Style = "Original";

function Open_Card_Backside_Page() {
    document.getElementById("Change_Card_Backside_Page").style.display = "flex";
    document.getElementById("Close_Backside_Page_Button").style.display = "flex";
    document.getElementById("Open_Backside_Page_Button").style.display = "none";
    Hide_History_Function();
}

function Close_Card_Backside_Page() {
    document.getElementById("Change_Card_Backside_Page").style.display = "none";
    document.getElementById("Close_Backside_Page_Button").style.display = "none";
    document.getElementById("Open_Backside_Page_Button").style.display = "flex";
    Display_History_Function();
}

function Hide_Backside_Function() {
    document.getElementById("Change_Card_Backside_Page").style.display = "none";
    document.getElementById("Close_Backside_Page_Button").style.display = "none";
    document.getElementById("Open_Backside_Page_Button").style.display = "none";
}

function Display_Backside_Function() {
    document.getElementById("Open_Backside_Page_Button").style.display = "flex";
}

function Change_Backside_Original() {
    let Deck_Card = document.getElementById("Card");
    Deck_Card.innerHTML= "";
    let img = document.createElement("img");
    for (i=1;i<2;i++) {
        img.src = "Img/Backside_Original.jpg";
        Deck_Card.appendChild(img);
    }
    Backside_Style = "Original";
    return Backside_Style;
} 

function Change_Backside_Simple() {
    let Deck_Card = document.getElementById("Card");
    Deck_Card.innerHTML= "";
    let img = document.createElement("img");
    for (i=1;i<2;i++) {
        img.src = "Img/Backside_Simple.jpg";
        Deck_Card.appendChild(img);
    }
    Backside_Style = "Simple";
    return Backside_Style;
} 

function Change_Backside_Modern() {
    let Deck_Card = document.getElementById("Card");
    Deck_Card.innerHTML= "";
    let img = document.createElement("img");
    for (i=1;i<2;i++) {
        img.src = "Img/Backside_Modern.jpg";
        Deck_Card.appendChild(img);
    }
    Backside_Style = "Modern";
    return Backside_Style;
} 

/* End of Card Backside Function */



/* Start of History Function */
let History_Storage = "BlackJackHistory";

function GetHistory() {
    let history = localStorage.getItem(History_Storage);
    return history ? JSON.parse(history):[];
}

function Display_History() {
    let histories = GetHistory();
    let history_area = document.getElementById("Data_Collected");
    history_area.innerHTML = '';

    for (let i=0;i<histories.length;i++) {
        let row = document.createElement("tr");
        let number = document.createElement("td");
        let score = document.createElement("td");
        let winner = document.createElement("td");

        number.style.width="10%";
        score.style.width="40%";
        winner.style.width="50%";

        number.innerHTML= (i+1);
        score.innerHTML = histories[i].Player_score +" vs " + histories[i].Computer_score;
        winner.innerHTML = histories[i].winner;

        history_area.appendChild(row);
        row.appendChild(number);
        row.appendChild(score);
        row.appendChild(winner);

        
    }
}
function saveGameResult(Computer_total,Player_total,winner) {
    const history = GetHistory();
    const newRecord = {
        Computer_score: Computer_total,
        Player_score: Player_total ,
        winner: winner
    };
    history.push(newRecord);
    localStorage.setItem(History_Storage, JSON.stringify(history));
    Display_History();
}

function ClearHistory() {
    localStorage.removeItem(History_Storage);
    Display_History();
}

document.addEventListener('DOMContentLoaded', Display_History);

function onGameEnd(Computer_total, Player_total,winner) {
    saveGameResult(Computer_total, Player_total,winner);
}

function CloseHistory() {
    console.log('test');
    document.getElementById("History_Page").style.display="none";
    document.getElementById("Check_History_Button").style.display="flex";
    document.getElementById("Close_History_Button").style.display="none";
    document.getElementById("Clear_History_Button").style.display="none";
    Display_Backside_Function();
}

function CheckHistory() {
    document.getElementById("History_Page").style.display="flex";
    document.getElementById("Check_History_Button").style.display="none";
    document.getElementById("Close_History_Button").style.display="flex";
    document.getElementById("Clear_History_Button").style.display="flex";
    Hide_Backside_Function();
}
function Hide_History_Function() {
    document.getElementById("History_Page").style.display = "none";
    document.getElementById("Check_History_Button").style.display = "none";
    document.getElementById("Close_History_Button").style.display = "none";
    document.getElementById("Clear_History_Button").style.display = "none";

}

function Display_History_Function() {
    document.getElementById("Check_History_Button").style.display = "flex";
}

/* End of History Function */


/* Start of Animation */

async function Draw_To_Computer_Animation() {
    let DeckDrawedAnimation = document.querySelector('#Deck img');
    DeckDrawedAnimation.style.animation = 'Computer_Draw_Card_From_Deck_Animation 1s forwards';
    await sleep(500);
    DeckDrawedAnimation.style.animation = '';
}

async function Draw_To_Player_Animation() {
    let DeckDrawedAnimation = document.querySelector('#Deck img');
    DeckDrawedAnimation.style.animation = 'Player_Draw_Card_From_Deck_Animation 1s forwards';
    await sleep(500);
    DeckDrawedAnimation.style.animation = '';
}

async function Display_Computer_Hand_Card_Animation() {
    let ComputerCardAnimation = document.querySelector('#Computer_Hand_Card img:last-child');
        ComputerCardAnimation.style.animation = 'Computer_Draw_Card_Animation 1s forwards';
}

async function Display_Player_Hand_Card_Animation() {
    let playerCardAnimation = document.querySelector('#Player_Hand_Card img:last-child');
    playerCardAnimation.style.animation = 'Player_Draw_Card_Animation 1s forwards';
    await sleep(500);
}

/* End of Animation */

/* Start of Sound */

function DrawCardSound() {
    let sound = document.getElementById("draw_card_sound");
    sound.play();
}

function WinningSound() {
    let sound = document.getElementById("winning_sound");
    sound.play();
}

function LosingSound() {
    let sound = document.getElementById("losing_sound");
    sound.play();
}
