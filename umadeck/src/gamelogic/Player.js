class Player {
    constructor() {
        if (Player.instance) {
            return Player.instance;
        }
        Player.instance = this;
        
        console.log('Player instance created');

        const savedData = JSON.parse(localStorage.getItem('playerData')) || {};
        this.unlockedCards = savedData.unlockedCards || [];
        this.achievements = savedData.achievements || {};
        this.stats = savedData.stats || {
            totalDamage: 0,
            currentGameDamage: 0
        };
        this.hasSeenTutorial = savedData.hasSeenTutorial || false;

        const unlockedCount = this.unlockedCards.length;
        if (unlockedCount > 0) {
            this.updateAchievementProgress('unlock1', 100);
            
            const progressToUnlock5 = Math.min(100, (unlockedCount / 5) * 100);
            if (!this.achievements.unlock5 || !this.achievements.unlock5.progress) {
                this.updateAchievementProgress('unlock5', progressToUnlock5);
            } else if (progressToUnlock5 > this.achievements.unlock5.progress) {
                this.updateAchievementProgress('unlock5', progressToUnlock5 - this.achievements.unlock5.progress);
            }
        }
    }

    getUnlockedCards() {
        return this.unlockedCards;
    }

    unlockCard(cardId) {
        if (!this.unlockedCards.includes(cardId)) {
            this.unlockedCards.push(cardId);
            this.updateAchievementProgress('unlock1', 100);
            this.updateAchievementProgress('unlock5', 20);
            this.save();
        }
    }

    getAchievements() {
        return this.achievements;
    }

    updateAchievementProgress(achievementId, incrementProgress) {
        if (!this.achievements[achievementId]) {
            this.achievements[achievementId] = {
                progress: 0.0,
                unlocked: false,
                date: null
            };
        }

        const newProgress = Math.min(100, this.achievements[achievementId].progress + incrementProgress);
        
        this.achievements[achievementId].progress = newProgress;
        
        if (newProgress >= 100 && !this.achievements[achievementId].unlocked) {
            this.achievements[achievementId].unlocked = true;
            this.achievements[achievementId].date = new Date().toISOString();
        }
        
        this.save();
    }

    recordDamage(damage) {
        this.stats.totalDamage += damage;
        this.stats.currentGameDamage += damage;
        
        if (!this.achievements.damage150) {
            this.achievements.damage150 = {
                progress: 0,
                unlocked: false,
                date: null
            };
        }

        if (!this.achievements.damage150.unlocked && this.stats.currentGameDamage >= 150) {
            this.updateAchievementProgress('damage150', 100);
        }
        
        const totalDamageProgress = Math.min(100, (this.stats.totalDamage / 2000) * 100);
        this.updateAchievementProgress('damage2000', totalDamageProgress - (this.achievements.damage2000?.progress || 0));
        
        this.save();
    }

    resetCurrentGameDamage() {
        this.stats.currentGameDamage = 0;
        this.save();
    }

    hasSeenTutorial() {
        return this.hasSeenTutorial;
    }

    setSeenTutorial() {
        this.hasSeenTutorial = true;
        this.save();
    }
    
    save() {
        const data = {
            unlockedCards: this.unlockedCards,
            achievements: this.achievements,
            stats: this.stats,
            hasSeenTutorial: this.hasSeenTutorial
        };
        localStorage.setItem('playerData', JSON.stringify(data));
    }
}

export default Player;