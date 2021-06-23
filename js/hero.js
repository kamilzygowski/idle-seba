class Hero {
    constructor(id, name, avatar, x, y, dmg, health) {
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
    }
    update(){
        if(this.health <= 0){
            this.currentImg = "images/dead_hero.png"
        }
        else {
            this.currentImg = this.heroImg;
        }
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

    walka(defender){
        defender.health -= this.damage;
    }
}