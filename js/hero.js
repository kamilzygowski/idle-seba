class Hero {
    constructor(id, name, avatar, x, y, dmg, health, inventory) {
        this.id = id;
        this.name = name;
        this.health = health;
        this.damage = dmg;
        this.x = x;
        this.y = y;
        this.heroImg = avatar;
        this.maxHP = health;
        this.currentImg = avatar;
        this.selected = false;
        this.spellX = x;
        this.spellY = y;
        this.spellSpeed = 8;
        this.spellDamage = 15;
        this.inventory = [];
    }

    update(ctx){
        if(this.health <= 0){
            this.currentImg = "images/dead_hero.png"
        }
        else {
            this.currentImg = this.heroImg;
        }

        this.draw(ctx);
    }

    draw(ctx) {
        var lol = new Image;
        lol.src = this.currentImg   
        ctx.drawImage(lol, this.x, this.y, 128, 128);
        if(this.selected){
            ctx.beginPath(); 
            ctx.strokeStyle = '#f00';
            ctx.lineWidth = 10;
            ctx.strokeRect(this.x, this.y, 128, 128);
        }
        ctx.fillStyle = "yellow";
        ctx.fillText(this.name + " " + this.health, this.x, this.y+150)  
    }

    castSpell(x, y){ 
        //OBLICZENIE PO JAKIEJ "FUNKCJI" MA LECIEĆ SPELL
        this.spellX = this.x;
        this.spellY = this.y;
        console.log(this.castSpell);
        var a = 0;
        var b = 0;
        a = (this.spellY - y)/(this.spellX - x);
        b = y - a*x;
        console.log(a);
        this.castSpell2(a,b,x,y);
    }

    castSpell2(a, b, x, y){
        var vx = 0, vy = 0;
        console.log("LECI SPELL");
        if (x == this.spellX){
            if( y < this.spellY){
                vy = -1;
            }
            else if(y > this.spellY){
                vy = 1;
            }
        }

        else if(y == this.spellY){
            if( x < this.spellX){
                vx = -1;
            }
            else if(x > this.spellX){
                vx = 1;
            }
        }

        else if ( x < this.spellX){
            vx = -1;
            if( y < this.spellY){
                vy = -a;
            }
            else if(y > this.spellY){
                vy = Math.abs(a);
            }
        }
        else if ( x > this.spellX){
            vx = 1;
            if( y < this.spellY){
                vy = a;
            }
            else if(y > this.spellY){
                vy = a;
            }
        }
        this.spellY += vy*this.spellSpeed;
        this.spellX += vx*this.spellSpeed;
        var spellImage = new Image;
        spellImage.src = "images/test_spell1.png" 
        ctx.drawImage(spellImage, this.spellX, this.spellY, 100, 100);
        
        if( (this.spellX > x + this.spellSpeed || this.spellX < x - this.spellSpeed) || (this.spellY > y + this.spellSpeed || this.spellY < y - this.spellSpeed)){
            requestAnimationFrame(()=>this.castSpell2(a, b, x, y));
        }
    }
}