// JavaScript source code
function card(name,suit,power,textP,textE,target,losing)
    {
        this.name = name;
        this.playerText = textP;
        this.encounterText = textE;
        this.class = suit;
        this.power = power;
        
	
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
        ("wait","tactic",1,"wait patiently","waits patiently");
    var cardBlock = new card
        ("block","tactic",1,"block your adversary's attack with ease", "you're blow is harmless to your foe");
	var cardFlee = new card
		("flee","tactic",1,"run away","flies in fear",null,true)
//combat cards
    var cardStab = new card
        ("stab","attack",2,"stab at your foe","stabs at you");
	var cardJab = new card
        ("jab","attack",1,"make a quick jab","jabs at you");
	var cardButt = new card 
		("butt","attack",1,"butt","butts");
	


//conditional cards
    var cardBleed = new card
        ("bleed","wound",1,"are wounded!","bleeds profusely!");
	var cardShiver = new card
		("shiver","wound",1,"your teeth chatter from the cold!","shivers and quakes!");
//weather cards
    var cardFog = new card 
        ("fog","weather",2,"create a blinding fog","surrounds you in a thick and blinding fog ");
    var cardMist = new card 
        ("mist","weather",2,"call up a shimmering mist","rises with mist");
    var cardChill = new card 
        ("chill","weather",2,"call up a wintry chill","chills you to the bone");
    var cardConfuse = new card 
        ("confuse","weather",2,"confuse and befuddle your foe","confuses and befuddles you");
//camp cards
	var cardFlame = new card 
        ("flame","craft",2,"kindle a burning flame","kindles a burning flame");
//diplomatic cards
	var cardBleat = new card 
        ("bleat","voice",1,"bleat like a sheep","bleats at you, unimpressed");
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
	
	this.melee = 1;
	this.magic = 0;
	this.travel = 0;
	this.diplo = 0;
	this.tactical = 3;
	//music
	//stealth
	//crafting
	
	this.deckMelee = [cardJab,cardStab];
	this.deckMagic = [cardFlame];
	this.deckTravel;
	this.deckDiplo;
	this.deckTactical = [cardWait,cardBlock,cardFlee];
	//method to pick up weapons and gain skills
	//alert ("melee = "+ this.melee);
}
//Encounter Builder
function encounter(name,adjective,type,kind,weapon,pack1,pack2,pack3,pack4)
{
	this.name = name;
    this.adjective = adjective;
    this.kind = kind;

	this.melee = 0;
	this.magic = 2;
	this.travel = 0;
	this.diplo = 0;
	this.tactical = 0;
	
	this.deckMelee = pack1;
	this.deckMagic = pack2;
	this.deckTravel;
	this.deckDiplo = pack3;
	this.deckTactical = pack4;
    
}
//Encounters
var denizenSage = new encounter("sage","wizened","denizen","person","knife",packDagger,packMist,null,packBasic);
var denizenSheep = new encounter("sheep","wooly","denizen","animal","horns",packDagger,packMist,null,packBasic);

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
			turn(true);
		}else{turn(false)}
        
		/* METHOD: identifies and changes a particular stat*/
    
		function turn(playerTurn)
		{
			var encounterHand = [cardWait,cardStab,cardChill,cardMist,cardFog];
			var playerHand = [];
			var nextCard=0;
			if(playerTurn === true)
			{
				// alert (player.deckMelee.length);
				for (i = 0; i<=player.melee;i++) 
				{
				playerHand.push(player.deckMelee[Math.floor(Math.random()*player.deckMelee.length)]);
				}
				for (i = 0; i<player.tactical;i++) 
				{
				playerHand.push(player.deckTactical[Math.floor(Math.random()*player.deckTactical.length)]);
				}
            
				hit(playerHand[nextCard]);
        
				function hit(currentCard)
				{	
					nextCard = Math.floor(Math.random()*playerHand.length);
					var played =  confirm(currentCard.name+"?");//*(next card is " + playerHand[nextCard].name + ")
                    
					if(played === true)
					{                     
						stay (currentCard);                                         
					}
					else
					{
						hit(playerHand[nextCard]);
					}
				}                 
			}
			else
			{
				if(encounterRunning === true)
				{
					var currentCard = encounterHand[Math.floor(Math.random()*encounterHand.length)];
					var played =  true;
                
					if(played === true)
					{
                    
						stay (currentCard);
                   
					}
					else
					{
                    
					}
				}
				else
				{
					alert("the encoounter has ended");
				}
			}
			function stay(card)
			{
				this.card = card;
        
				if (playerTurn===true)
				{
					alert ("you "+ this.card.playerText)
					turn(false);
				}
				else
				{
					alert ("the "+encounter.name+" "+this.card.encounterText)
					turn(true);
				}
			}
		}
    }     
}



engagement(player1,denizenSage,"denizen");

function defeat(circumstance)
{
	switch (circumstance)
	{
		case "death":
			alert("Your are no longer among the living");
			break;
		case "retreat":
				
			break;
	}
	 
}