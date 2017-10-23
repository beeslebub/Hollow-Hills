function main() {

  var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
  document.body.appendChild(app.view);
  
  // create a new Sprite from an image path
  var baseMapTex = PIXI.Texture.fromImage("assets/Sprites/Map/glenSheet.png");

  imageNames=[];
  imageNames[0]=[];
  imageNames[1]=[];
  imageNames[2]=[];
  imageNames[3]=[];
  imageNames[0][0]="Door";
  imageNames[1][0]="Tree";
  imageNames[2][0]="DoodadLarge";
  imageNames[3][0]="DoodadSmall";
  imageNames[0][1]="FloorDetail";
  imageNames[1][1]="DoorWall";
  imageNames[2][1]="DoorWallRoad";
  imageNames[3][1]="WallUpR";
  imageNames[0][2]="RoadTurnUpL";
  imageNames[1][2]="Wall";
  imageNames[2][2]="WallRoad";
  imageNames[3][2]="WallCornerR";
  imageNames[0][3]="RoadAcross";
  imageNames[1][3]="RoadTurnDownL";
  imageNames[2][3]="RoadUp";
  imageNames[3][3]="FloorPlain";
  
  tileMap = {};
  scale = 0.25;
  var posScale = new PIXI.Point(scale,scale);
  var negScale = new PIXI.Point(-scale,scale);
  
  function tile(i,j,sprite)
  {
      obj={}
      obj.i=i;
      obj.j=j;
      obj.mirror=0;
      obj.imageObj = new Image();
      obj.name=imageNames[i,j];
      obj.sprite = sprite;
      obj.sprite.scale = posScale;
      tileMap[imageNames[j][i]]=obj;
      function draw (x,y)
      {
           this.sprite.x=x;
           this.sprite.y=y;
           app.stage.addChild(this.sprite);
      }
      obj.draw=draw.bind(obj);
      function copy ()
      {
          ret = tile(this.i,this.j,new PIXI.Sprite(this.sprite.texture));
	  return ret;
      }
      obj.copy=copy.bind(obj);
      return obj;
  }
  
  var images=[];
  for(i=0;i<4;i++)
  {
  	for(j=0;j<4;j++)
  	{

    	    var x = i*256;
  	    var y = j*256;
  	    var w = 256;
  	    var h = 256;
	    var rect = new PIXI.Rectangle(x,y,w,h);
	    var tex = new PIXI.Texture(baseMapTex,rect);
	    var sprite = new PIXI.Sprite(tex);

  	    images[j*4+i]=new tile(j,i,sprite);
  	}
  }
  
  var wallUp=tileMap["WallUpR"].copy();
  wallUp.sprite.scale = negScale; wallUp.name="WallUpL";
  tileMap["WallUpL"]=wallUp;
  
  	
  var roadTurnUp=tileMap["RoadTurnUpL"].copy();
  roadTurnUp.sprite.scale = negScale; roadTurnUp.name="RoadTurnUpR";
  tileMap["RoadTurnUpR"]=roadTurnUp;
  
  	
  var wallCorner=tileMap["WallCornerR"].copy();
  wallCorner.sprite.scale.x = 100; wallCorner.name="WallCornerL";
  tileMap["WallCornerL"]=wallCorner;
  
  	
  var roadTurnDown=tileMap["RoadTurnDownL"].copy();
  roadTurnDown.sprite.scale =negScale; roadTurnDown.name="RoadTurnDownR";
  tileMap["RoadTurnDownR"]=roadTurnDown;
  
  
  function genMap(tileSet/*,mapXsize,mapYsize,mapWallDensity,mapDoorDensity*/)
  {
  	//MAP PARAMETERS
  	this.tileSet = tileSet;
  	
  	var xsize =     4+Math.floor(Math.random() * 12);
  	var ysize =     4+Math.floor(Math.random() * 12);
  		
  	
  
  	var wallDensity = 3;
  	var doorDensity = 1;
  
  	//GENERATION TOOLS
  	var road = false;
  	var wall = false;
  	var door = false;
  	var map=[];
  	var nextTile = tileMap["WallCornerL"];
  	var dieRoll = 0;
  
  	for(var x=0;x<xsize;x++)
  	{
  		
  		map[x]=[];
  		for(var y=0;y<ysize;y++)
  		{
			/*
  			dieRoll = Math.random();
  
  			if (road === true)
  			{
  				if(wall === true)
  				{
  					if(door === true)
  					{
  					}
  				}
  			}
  			else if (wall === true)
  			{
  				if(door === true)
  				{
  				
  				}
  				else
  				{
  					switch (nextTile)
  					{
  						case tileMap["WallCornerR"]:
  						case tileMap["Wall"]:
  							dieRoll = Math.ceil(dieRoll*2);
  							if (dieRoll ===1)
  							{
  								nextTile = tileMap["Wall"];
  							}
  							else if(dieRoll === 2)
  							{
  								nextTile = tileMap["FloorPlain"];
  							}
  					
  							break;//big break
  						case tileMap["WallCornerL"]:
  							nextTile = tileMap["FloorPlain"];
  							break;//big break
  					}
  				}
  			}
  			else if(door == true)
  			{
  
  			}
  			else
  			{
  				switch (nextTile)
  				{
  					case tileMap["FloorPlain"]:
  					case tileMap["FloorDetail"]:
  						dieRoll = Math.ceil(dieRoll * 5);
  						switch (dieRoll){
  							case 1:
  								nextTile = tileMap["FloorPlain"];
  								break;
  							case 2:
  								nextTile = tileMap["FloorDetail"];
  								break;
  							case 3:
  								nextTile = tileMap["DoodadLarge"];
  								break;
  							case 4:
  								nextTile = tileMap["DoodadSmall"];
  								break;
  							case 5:
  								nextTile = tileMap["Tree"];
  								break;
  							
  						}
  						break;//big break
  					case tileMap["DoodadLarge"]:
  					case tileMap["DoodadSmall"]:
  					case tileMap["Tree"]:
  						nextTile = tileMap["FloorPlain"];
  						break;//big break
  				}
  			}*/
  			/*if (Math.floor(Math.random() * 2)===0)
  			{
  				nextTile=tileMap["RoadTurnDownR"];
  				
  			}
  			else
  			{
  				nextTile=tileMap["RoadTurnDownL"];
  				
  			}
  			*/
  			
  			map [x][y]= nextTile.copy();
  			map[x][y].draw(Math.floor(256*x*scale),Math.floor(256*y*scale));
  			//map[x][y].draw(0+256*x*scale,0+256*y*scale);
  			//check for roads doors and walls next round
                        //tileMap["Door"].draw(Math.floor(256*x*scale),Math.floor(256*y*scale));
  			
  		}
  	}
  }
  
  map=genMap();
  
 //tileMap["Door"].draw(Math.floor(256*scale),Math.floor(256*scale));
 //tileMap["Door"].draw(1,1);
}
main();
