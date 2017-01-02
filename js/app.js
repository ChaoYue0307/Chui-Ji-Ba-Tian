new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth  = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack:function(){
            var damage = this.calculateDamage(3,9);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text:'NOOB 使用普通之锤 锤了 季霸天！造成  ' + damage +' 点伤害！'
            });
            if (this.checkWin()){
                return;
            }
            

            this.monsterAttacks();
        },
        specialAttack: function(){
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text:'NOOB 使用暴击之锤 锤了 季霸天！造成  ' + damage +' 点伤害！效果拔群！'
            });
            if (this.checkWin()){
                return;
            }
            

            this.monsterAttacks();
        },
        heal: function(){
            if(this.playerHealth <= 90) {
                this.playerHealth  += 10;
            } else {
                this.playerHealth  = 100;
            }

            this.turns.unshift({
                isPlayer: true,
                text:'NOOB 吃了铁板烧 恢复了 10 点体力！'
            });
            
            this.monsterAttacks();

        },
        giveUp: function() {
            this.gameIsRunning = false;
            this.turns.unshift({
                isPlayer: true,
                text:'NOOB 已昏厥 战斗停止'
            });
        },
        monsterAttacks:function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -=  damage;
            
            this.turns.unshift({
                isPlayer: false,
                text:'季霸天 反锤了 NOOB! 造成 ' + damage + " 点伤害！"
            });
            if (this.checkWin()){
                return;
            }

        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
        if (this.monsterHealth <= 0) {
            if(confirm('恭喜你锤爆了季霸天！！作为奖励，可以向他申请补贴了！乘胜追击 再锤一次？')){
                this.startGame();
            } else {
                this.gameIsRunning = false;
            }     
                return true;
            } else if (this.playerHealth <= 0) {
            if(confirm('很遗憾你被锤爆了，季霸天是不可战胜的！不信？那再锤一局！')){
                this.startGame();
            } else {
                this.gameIsRunning = false;
            }     
                return true;
            }

            return false;
        }
    }
});