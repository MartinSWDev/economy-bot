const userAccount = require('../../schemas/userAccount')
const { SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const mongoose = require("mongoose");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("account")
        .setDescription("Returns account info"),
    async execute(interaction, client){
        // try find user
        let userAcc = await userAccount.findOne({
            userId: interaction.user.id,
            guildId: interaction.guild_id
        })

        if(userAcc) {
            const embed = new EmbedBuilder()
                .setColor("#F1C40F")
                .setThumbnail(interaction.user.displayAvatarURL())
                .addFields([
                    {
                        name: "Account Name",
                        value: `${interaction.user.tag}`,
                        inline: false
                    },
                    {
                        name: "Wallet",
                        value: `${userAcc.wallet}`,
                        inline: false
                    },
                    {
                        name: "Bank",
                        value: `${userAcc.bank}`,
                        inline: false
                    },
                    {
                        name: "Mines",
                        value: `${userAcc.mines}`,
                        inline: false
                    },
                    {
                        name: "Storage",
                        value: `${userAcc.starage}`,
                        inline: false
                    }
                ])

            await interaction.reply({
                embeds:[embed]
            });
        }
        else {
            // create user account
           const account = await new userAccount({
                   _id: mongoose.Types.ObjectId(),
                   userId: interaction.user.id,
                   guildId: interaction.user.guild_id,
                   mines: "None",
                   wallet: 0,
                   bank: 0,
                   storage: "Empty"
                },
            );

            await account.save().catch(console.error);

            await interaction.reply({
                content: `Account has been created, please run command again`,
            });
            console.log(account)
        }
    }
}
