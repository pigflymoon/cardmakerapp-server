const cardsType = {
    holiday: ["christmas", "newYear", "easter"],
    birthday: ["kids", "forHer", "forHim"],
    thankYou: ["general", "birthday", "wedding"],
    occasions: ["anniversary", "goodLuck", "teacherAppreciation"],
    congratulations: ["graduation", "newBaby", "exam"],
    thoughtsFeelings: ["cheerUp", "friendship", "getWell", "loveRomance"]
}

const invitationsType = {
    holiday: ["christmas", "newYear", "easter"],
    birthday: ["kids", "women", "men"],
    wedding: ["invitation", "saveTheDate", "rsvp"],
    party: ["anniversary", "graduationParty", "bbqParty"],
    announcement: ["birth", "graduationAnnouncement"]
}

const showCardsType = ["christmas", "newYear", "easter", "kids", "forHer", "forHim", "general", "birthday", "wedding", "anniversary", "goodLuck", "teacherAppreciation", "graduation", "newBaby", "exam", "cheerUp", "friendship", "getWell", "loveRomance"];
const showInvitationsType = ["christmas", "newYear", "easter", "kids", "women", "men", "invitation", "saveTheDate", "rsvp", "anniversary", "graduationParty", "bbqParty", "birth", "graduationAnnouncement"];

export const CategoryConfig = {
    cards: cardsType,
    invitations: invitationsType,
    showCardsType: showCardsType,
    showInvitationsType: showInvitationsType
}