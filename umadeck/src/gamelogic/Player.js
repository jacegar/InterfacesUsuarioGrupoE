class Player {
    constructor() {
        const savedData = JSON.parse(localStorage.getItem('playerData')) || {};
        this.unlockedCards = savedData.unlockedCards || [];
        this.achievements = savedData.achievements || {};
        this.stats = savedData.stats || {
            totalDamage: 0,
            currentGameDamage: 0
        };

        // Verificar y actualizar logros basados en las cartas ya desbloqueadas
        const unlockedCount = this.unlockedCards.length;
        if (unlockedCount > 0) {
            // Si tiene al menos una carta, desbloquea el logro 'unlock1'
            this.updateAchievementProgress('unlock1', 100);
            
            // Actualiza el progreso para el logro 'unlock5'
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
            // Actualiza logros de cartas desbloqueadas
            this.updateAchievementProgress('unlock1', 100);
            this.updateAchievementProgress('unlock5', 20);
            this.save();
        }
    }

    getAchievements() {
        return this.achievements;
    }

    updateAchievementProgress(achievementId, incrementProgress) {
        // Si el logro no existe o no está inicializado, lo inicializamos
        if (!this.achievements[achievementId]) {
            this.achievements[achievementId] = {
                progress: 0,
                unlocked: false,
                date: null
            };
        }

        // Calculamos el nuevo progreso (máximo 100)
        const newProgress = Math.min(100, this.achievements[achievementId].progress + incrementProgress);
        
        // Actualizamos los datos del logro
        this.achievements[achievementId].progress = newProgress;
        
        // Si el progreso llega a 100, desbloqueamos el logro
        if (newProgress >= 100 && !this.achievements[achievementId].unlocked) {
            this.achievements[achievementId].unlocked = true;
            this.achievements[achievementId].date = new Date().toISOString();
        }
        
        this.save();
    }

    // Nuevo método para registrar daño
    recordDamage(damage) {
        // Actualizar estadísticas
        this.stats.totalDamage += damage;
        this.stats.currentGameDamage += damage;
        
        // Actualizar logros basados en daño
        
        // Asegurar que el logro de 150 existe
        if (!this.achievements.damage150) {
            this.achievements.damage150 = {
                progress: 0,
                unlocked: false,
                date: null
            };
        }

        // Actualizar el progreso (si aún no está desbloqueado)
        if (!this.achievements.damage150.unlocked && this.stats.currentGameDamage >= 150) {
            this.updateAchievementProgress('damage150', 100);
        }
        
        // Daño total (logro de 2000 daño)
        const totalDamageProgress = Math.min(100, (this.stats.totalDamage / 2000) * 100);
        this.updateAchievementProgress('damage2000', totalDamageProgress - (this.achievements.damage2000?.progress || 0));
        
        this.save();
    }

    // Método para reiniciar el daño de la partida actual
    resetCurrentGameDamage() {
        this.stats.currentGameDamage = 0;
        this.save();
    }
    
    save() {
        const data = {
            unlockedCards: this.unlockedCards,
            achievements: this.achievements,
            stats: this.stats
        };
        localStorage.setItem('playerData', JSON.stringify(data));
    }
}

export default Player;