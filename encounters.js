// JavaScript source code
function card(name,suit,suitPower,target1,power1,/*target2,power2*/losing,gift,textP,textE)
{
    this.name = name;
    this.playerText = textP;
    this.encounterText = textE;
    this.suit = suit;
    this.suitPower = suitPower;
	this.action = target1;
	this.actionPower = power1;
	this.losing = losing;
    /*
	playCard : function()
	{
		
	}*/
	// mothod when card is played
	
    switch (this.class) {
        case "attack":
                
            break;
        case "tactic":
            
            break;
        case "wound":
                
            break;
                
    }
}
     
//tactics cards
    var cardWait = new card
        ("wait","tactical",1,"tactical",1,false,cardWait,"wait patiently","waits patiently");
    var cardBlock = new card
        ("block","tactical;",1,"melee",-1,false,cardWait,"block your adversary's attack with ease", "you're blow is harmless to your foe");
	var cardFlee = new card
		("flee","travel",1,"travel",1,true,cardWait,"run away","flies in fear");
	var cardFocus = new card
		("focus","tactical",3,"tactical",0,false,cardWait,"focus your thoughts","seems to be thinking")
//combat cards
    var cardStab = new card
        ("stab","melee",2,"wound",1,false,cardBleed,"stab at your foe","stabs at you");
	var cardJab = new card
        ("jab","melee",1,"wound",1,false,cardBlock,"make a quick jab","jabs at you");
	var cardButt = new card 
		("butt","melee",1,"wound",1,false,cardBleed,"butt","butts");
//conditional cards
    var cardBleed = new card
        ("bleed","wound",1,"tactical",0,false,cardWait,"are wounded!","bleeds profusely!");
	var cardShiver = new card
		("shiver","wound",1,"tactical",0,false,cardWait,"your teeth chatter from the cold!","shivers and quakes!");
//weather cards
    var cardFog = new card 
        ("fog","magic",1,"tactical",-2,false,cardShiver,"create a blinding fog","surrounds you in a thick and blinding fog ");
    var cardMist = new card 
        ("mist","magic",2,"tactical",-1,false,cardShiver,"call up a shimmering mist","makes mist all about with mist");
    var cardChill = new card 
        ("chill","magic",2,"wound",1,false,cardShiver,"call up a wintry chill","chills you to the bone");
    var cardConfuse = new card 
        ("confuse","magic",2,"tactic",-2,false,cardFocus,"confuse and befuddle your foe","confuses and befuddles you");
//camp cards
	var cardFlame = new card 
        ("flame","craft",2,"melee",-1,false,cardWait,"kindle a burning flame","kindles a burning flame");
//diplomatic cards
	var cardBleat = new card 
        ("bleat","diplo",1,"diplo",-1,false,cardWait,"bleat like a sheep","bleats at you, unimpressed");
//card packs
//basic packs
    var packVitals = [cardBleed];
	var packBasic = [cardWait];
//weapon packs
    var packDagger = [cardStab,cardJab];
    var packShield = [cardBlock];
//weather packs
    var packMist = [cardFog,cardMist,cardChill,cardConfuse];

var player1 = new player(prompt("what is your name",null));

function player(name)
{
    this.name = name;
	this.alive = true;
	
	this.melee = 1;
	this.magic = 0;
	this.travel = 0;
	this.diplo = 0;
	this.tactical = 3;
	this.music = 0;
	this.stealth = 0;
	this.craft = 0;

	this.wound = 0;
	
	this.deckMelee = [cardJab,cardStab];
	this.deckMagic = [cardFlame];
	this.deckTravel;
	this.deckDiplo = [];
	this.deckTactical = [cardWait,cardBlock,cardFlee];
	//method to pick up weapons and gain skills
	//alert ("melee = "+ this.melee);
}
//Encounter Builder

alert(player1["melee"]);

function encounter(name,adjective,type,kind,weapon,pack1,pack2,pack3,pack4)
{
	this.name = name;
    this.adjective = adjective;
    this.kind = kind;

	this.alive = true;
	// number of cards available from each deck
	this.melee = 0;
	this.magic = 2;
	this.travel = 0;
	this.diplo = 0;
	this.tactical = 0;
	this.music = 0;
	this.stealth = 0;
	this.craft = 0;

	this.wound = 0;
	//decks //alternet uses for environment encounters
	this.deckMelee = pack1;//hazards
	this.deckMagic = pack2;//weather
	this.deckTravel;
	this.deckDiplo = pack3;//points of interest
	this.deckTactical = pack4;//puzzles

	this.deckDamage = [];
    
}
//Encounters
var denizenSage = new encounter("sage","wizened","denizen","person","knife",packDagger,packMist,packBasic,packBasic);
var denizenSheep = new encounter("sheep","wooly","denizen","animal","horns",packDagger,packMist,null,packBasic);

var environmentGlen = new encounter("glen","charming","environment","landscape","grass",packMist)

function engagement (party1,party2,type)
{
	if (type == "denizen")
	{
		var player = party1;
		var encounter = party2;
		alert("you encounter a "+encounter.adjective+" "+encounter.name);
		
		//assign values from party1 and party2
		var playerAlive = true;
		var encounterRunning = true;
		var surprise = confirm("are you surprised?");
		
		if (surprise == false){
			turn(player,encounter);
		}else{turn(encounter,player)}
        
		/* METHOD: identifies and changes a particular stat*/
    
		function turn(whoseTurn,target)
		{
			var turnTaker = whoseTurn;
			var targer = target;
			//var encounterHand = [cardWait,cardStab,cardChill,cardMist,cardFog];
			var hand = [];
			var nextCard=0;
				
			for (i = 0; i<=turnTaker.melee;i++) 
			{
			hand.push(turnTaker.deckMelee[Math.floor(Math.random()*turnTaker.deckMelee.length)]);
			}
			for (i = 0; i<=turnTaker.tactical;i++) 
			{
			hand.push(turnTaker.deckTactical[Math.floor(Math.random()*turnTaker.deckTactical.length)]);
			}
			for (i = 0; i<=turnTaker.magic;i++) 
			{
			hand.push(turnTaker.deckMagic[Math.floor(Math.random()*turnTaker.deckMagic.length)]);
			}
			for (i = 0; i<=turnTaker.diplo;i++) 
			{
			hand.push(turnTaker.deckDiplo[Math.floor(Math.random()*turnTaker.deckDiplo.length)]);
			}
				          
			hit(hand[nextCard],target);
        
			function hit(currentCard,target)
			{	
				var played;
				if(turnTaker===player)
				{
					//player choice inputs
					played =  confirm(currentCard.name+"?");
				}
				else
				{
					//AI choice inputs
					played = true;
				}
					
				nextCard = Math.floor(Math.random()*hand.length);				
                    
				if(played === true)
				{                     
					stay (currentCard,target);                                         
				}
				else
				{
					hit(hand[nextCard],target);
				}
			}                 
			function stay(card,target)
			{
				this.card = card;
				
				alert(turnTaker.name +" "+ turnTaker[this.card.suit]+" "+ target.name +" "+target[this.card.action]);
				turnTaker[this.card.suit] += this.card.suitPower;
				target[this.card.action]+= this.card.actionPower;
				alert(turnTaker.name +" "+turnTaker[this.card.suit]+" "+target.name +" "+target[this.card.action]);

				if (turnTaker===player)
				{
					alert ("you "+ this.card.playerText);
					if(this.card.losing===false)
					{
						turn(encounter,player);
					}
					else
					{
						target.alive = false;

						defeat(card.class);
					}
				}
				else
				{
					alert ("the "+encounter.name+" "+this.card.encounterText)
					if(this.card.losing===false)
					{
						turn(player,encounter);
					}
					else
					{
						target.alive = false;

						victory(encounter);
					}
				}		
			}
		}
    }     
}
engagement(player1,denizenSage,"denizen");
function victory(defeatedParty)
{
	
}
function defeat(circumstance)
{
	switch (circumstance)
	{
		case "death":
			alert("Your are no longer among the living");
			//game over
			break;
		case "retreat":
			alert("You got away safely");
			//ruturn to the map
			break;

	}
	 
}