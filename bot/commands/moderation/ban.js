const util = require("../../../util/util");
const cmd = require("../../command.js");
module.exports = class command extends cmd {
    constructor() {
        super({
            name: "ban",
            perms: ["BAN_MEMBERS"],
            botperms: ["BAN_MEMBERS"]
        });
        this.run = this.r;
    }
    async r(a = {}) {
        util.searchUser(a.message, a.args[0], false).then(user => {
            const member = a.message.guild.member(user);
            if(member.bannable == true) {
                let reason = a.args.slice(1).join(' ');
                if(!reason) reason = `${a.strings.getMsg("nullreason")}`;
                member.ban(`${a.strings.getMsg("ban_by")} ` + a.message.author.tag + " " + `${a.strings.getMsg("reason")} ${reason}`);
                cmd.msg(a.message, a.prefix, "", `${a.emoji.get(a.emojis.ban)} | ${global.up(this.name)}\n${a.strings.getMsg("ban_user")} ${member.user.tag} ${a.strings.getMsg("reason")} ${reason}`)
            } else {
                cmd.error(a, a.strings.getMsg("ban_perm"));
            }
        }).catch(() => {
            cmd.error(a, a.strings.getMsg("user_null"));
        });
    }
}