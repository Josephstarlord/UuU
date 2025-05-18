module.exports = {
    name: "event",

    async execute({ api, event }) {
        if (event.logMessageType === "log:subscribe") {
            try {
                const threadInfo = await api.getThreadInfo(event.threadID);
                const totalMembers = threadInfo.participantIDs.length;
                const botID = api.getCurrentUserID();

                const newUsers = event.logMessageData.addedParticipants;
                for (const user of newUsers) {
                    const userID = user.userFbId;
                    const userName = user.fullName || "there";

                    const mentions = [
                        { tag: `@${userName}`, id: userID },
                        { tag: "@Thea", id: "100030880666720" },
                        { tag: "@BotCreator", id: "100066731134942" }
                    ];

                    const message = {
                        body: `👋 Welcome @${userName} to the group!
👥 Total members: ${totalMembers}


👨‍💻[ADMIN] @Theak: utilisez Se lien pour me voir https://www.facebook.com/Thea.Starliness
Bot creator:  @BotCreator`,
                        mentions
                    };

                    await api.sendMessage(message, event.threadID);

                    // Set bot nickname if it's the one added
                    if (userID === botID) {
                        const newNickname = "Bot Assistant";
                        await api.changeNickname(newNickname, event.threadID, botID);
                    }
                }
            } catch (err) {
                console.error("❌ Error in group event:", err);
            }
        }
    }
};
