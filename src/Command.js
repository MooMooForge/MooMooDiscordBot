class Command {
    constructor(client) {
        this.client = client;
        this.name = "";
        this.aliases = [];
        this.cooldown = 0;
        this.userPermissions = [];
        this.lastUse = 0;
        this.description = ""
    }

    execute() {
        throw new Error("The execute method must be implemented in the command.");
    }
}

module.exports = Command;