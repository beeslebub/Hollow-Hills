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

	  constructor(i,j,ctx)
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
	
	wallupl=tileMap["WallUpR"].copy();
	wallupl.mirror=1; wallupl.name="WallUpL";
	tileMap["WallUpL"]=wallupl;

		
	wallupl=tileMap["RoadTurnUpL"].copy();
	wallupl.mirror=1; wallupl.name="RoadTurnUpR";
	tileMap["RoadTurnUpR"]=wallupl;

		
	wallupl=tileMap["WallCornerR"].copy();
	wallupl.mirror=1; wallupl.name="WallCornerL";
	tileMap["WallCornerL"]=wallupl;

		
	wallupl=tileMap["RoadTurnDownL"].copy();
	wallupl.mirror=1; wallupl.name="RoadTurnDownR";
	tileMap["RoadTurnDownR"]=wallupl;

	function genMap()
	{
		var xsize = 4+Math.floor(Math.random() * 12);
		var ysize = 4+Math.floor(Math.random() * 12);
		var map=[];

		for(var x=0;x<xsize;x++)
		{
			map[x]=[];
			for(var y=0;y<ysize;y++)
			{
				if (Math.floor(Math.random() * 2)===0)
				{
					map[x][y]=tileMap["RoadTurnDownR"];
					map[x][y].draw(0+256/scale*x,0+256/scale*y);
				}
				else
				{
					map[x][y]=tileMap["RoadTurnDownL"];
					map[x][y].draw(0+256/scale*x,0+256/scale*y);
				}
			}
		}
	}

	var map=genMap();
	
}
