	// JavaScript source code
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
addLoadEvent(main);


function main() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	imageObj = new Image();
	imageObj.src = "assets/Sprites/Map/glenSheet.png"; // can also be a remote URL e.g. http://
	
	imageNames=[];
	imageNames[0]=[];
	imageNames[1]=[];
	imageNames[2]=[];
	imageNames[3]=[];
	imageNames[0][0]="Door";
	imageNames[0][1]="Tree";
	imageNames[0][2]="DoodadLarge";
	imageNames[0][3]="DoodadSmall";
	imageNames[1][0]="FloorDetail";
	imageNames[1][1]="DoorWall";
	imageNames[1][2]="DoorWallRoad";
	imageNames[1][3]="WallUpR";
	imageNames[2][0]="RoadTurnUpL";
	imageNames[2][1]="Wall";
	imageNames[2][2]="WallRoad";
	imageNames[2][3]="WallCornerR";
	imageNames[3][0]="RoadAcross";
	imageNames[3][1]="RoadTurnDownL";
	imageNames[3][2]="RoadUp";
	imageNames[3][3]="FloorPlain";

	tileMap= {};
	scale=4;

	class tile
	{

	  copy()
	  {
		return new tile(this.i,this.j,this.ctx);
	  }

	  constructor(i,j,ctx/*texturepath.png*/)
	  {
		this.i=i;
		this.j=j;
		this.mirror=0;
		this.ctx=ctx;
		this.imageObj = new Image();
		this.name=imageNames[i,j];
	    this.imageObj.src = "assets/Sprites/Map/glenSheet.png"; // can also be a remote URL e.g. http://
 		tileMap[imageNames[j][i]]=this;
	 }

	 draw(x,y)
	 {
	  	var sourceX = 0+this.i*256;
		var sourceY = 0+this.j*256;
		var width = 256;
		var height = 256;
		if (this.mirror===1)
		{
		  ctx.save();
		  ctx.scale(-1, 1);
		  this.ctx.drawImage(this.imageObj, sourceX, sourceY, width, height, -x, y, width/scale, height/scale);
		  ctx.restore();
		}
		else
			this.ctx.drawImage(this.imageObj, sourceX, sourceY, width, height, x, y, width/scale, height/scale);
	 }
	}

	var images=[];
	for(i=0;i<4;i++)
	{
		for(j=0;j<4;j++)
		{
			images[j*4+i]=new tile(j,i,ctx);
		}
	}
	
	wallUp=tileMap["WallUpR"].copy();
	wallUp.mirror =1; wallUp.name="WallUpL";
	tileMap["WallUpL"]=wallUp;

		
	roadTurnUp=tileMap["RoadTurnUpL"].copy();
	roadTurnUp.mirror =1; roadTurnUp.name="RoadTurnUpR";
	tileMap["RoadTurnUpR"]=roadTurnUp;

		
	wallCorner=tileMap["WallCornerR"].copy();
	wallCorner.mirror=1; wallCorner.name="WallCornerL";
	tileMap["WallCornerL"]=wallCorner;

		
	roadTurnDown=tileMap["RoadTurnDownL"].copy();
	roadTurnDown.mirror=1; roadTurnDown.name="RoadTurnDownR";
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
		var nextTile = tileMap["FloorPlain"];
		var dieRoll = 0;

		for(var x=0;x<xsize;x++)
		{
			
			map[x]=[];
			for(var y=0;y<ysize;y++)
			{
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
				}
				/*if (Math.floor(Math.random() * 2)===0)
				{
					nextTile=tileMap["RoadTurnDownR"];
					
				}
				else
				{
					nextTile=tileMap["RoadTurnDownL"];
					
				}
				*/
				
				map [x][y]= nextTile;
				map[x][y].draw(0+256/scale*x,0+256/scale*y);
				//check for roads doors and walls next round
				
			}
		}
	}

	var map=genMap();
	
}
