// JavaScript source code
function card(name,suit,power,textP,textE,target)
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
        ("block","tactic",1,"block your adversary's attack with ease", "you're blow is harmless to your foe")
    //combat cards
    var cardStab = new card
        ("stab","attack",2,"stab at your foe","stabs at you");
	var cardJab = new card
        ("jab","attack",2,"stab at your foe","stabs at you");
    //conditional cards
    var cardBleed = new card
        ("bleed","wound",1,"are wounded!","bleeds profusely!");
	var cardShiver = new card
		("shiver","wound",1,"your teeth chatter from the cold!","shivers and quakes!");
    //weather cards
    var cardFog = new card 
        ("fog","weather",2,"create a blinding fog","surrounds you in a thick and blinding fog ")
    var cardMist = new card 
        ("mist","weather",2,"call up a shimmering mist","rises with mist")
    var cardChill = new card 
        ("chill","weather",2,"call up a wintry chill","chills you to the bone")
    var cardConfuse = new card 
        ("confuse","weather",2,"confuse and befuddle your foe","confuses and befuddles you")
        
    var packVitals = [cardBleed];
    var packDagger = [cardStab];
    var packShield = [cardBlock];
    var packBasic = [cardWait];
    var packMist = [cardFog,cardMist,cardChill,cardConfuse];

player(prompt("what is your name",null));

function player(name)
{
    this.name = name
}
function encounter(name,adjective,kind)
{
    this.name = name;
    this.adjective = adjective;
    this.kind = kind;
    alert("you encounter a "+adjective+" "+name);
    
    var playerAlive = true;
    var encounterRunning = true;
    var surprise = false;
    
    
    
    
    if (surprise == false){
        turn(false);
    }else{turn(true)}
    
    
    /* METHOD: identifies and changes a particular stat*/
    
    function turn(playerTurn)
    {
        var encounterHand = [cardWait,cardStab,cardChill,cardMist,cardFog];
        var playerHand = [cardWait,cardStab,cardJab];
        var nextCard = 0;
        if(playerTurn === true)
        {
            if(playerAlive === true)
            {
                hit(playerHand[nextCard]);
        
                function hit(currentCard)
                {
                    var played =  confirm(currentCard.name+"?");
                    
                    if(played === true)
                    {
                       
                        stay (currentCard);
                        
                        
                    }
                    else
                    {
                       nextCard += 1;
                       hit(playerHand[nextCard]);
                    }
                }
                
            }
            else
            {
                alert("Your are no longer among the living");
            }
        }
        else
        {
            if(encounterRunning === true)
            {
                var currentCard = cardWait;
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
            alert ("the "+name+" "+this.card.encounterText)
            turn(true);
        }
         
    }
    }
    
  
}

encounter("goblin","wizardly");

