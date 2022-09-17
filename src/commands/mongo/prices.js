const { SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const MetalPrices = require("../../schemas/metalPrices");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("prices")
        .setDescription("Returns current prices"),
    async execute(interaction, client){
        let latestPrices = await MetalPrices.findOne()
            .sort({ updatedAt: -1 })
            .limit(1);
        if(latestPrices){
        console.log(latestPrices)

        const embed = new EmbedBuilder()
            .setTitle(`Current Prices`)
            .setDescription(`As of ${latestPrices.date}`)
            .setColor("#F1C40F")
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setFooter({
                iconURL: interaction.user.displayAvatarURL(),
                text: `Requested by ${interaction.user.tag}`
            })
            .addFields([
                {
                    name: "<:Gold:1020795638864171140> Gold",
                    value: latestPrices.rates.XAU.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Silver:1020795717763215441> Silver",
                    value: latestPrices.rates.XAG.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Platinum:1020795714227408936> Platinum",
                    value: latestPrices.rates.XPT.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Palladium:1020795713036230777> Palladium",
                    value: latestPrices.rates.XPD.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Rhodium:1020795715389243503> Rhodium",
                    value: latestPrices.rates.XRH.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Ruthenium:1020795716249059339> Ruthenium",
                    value: latestPrices.rates.RUTH.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Copper:1020795706765738084> Copper",
                    value: latestPrices.rates.XCU.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Nickel:1020795711585009666> Nickel",
                    value: latestPrices.rates.NI.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Aluminium:1020795703989116949> Aluminium",
                    value: latestPrices.rates.ALU.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Zinc:1020795720527249478> Zinc",
                    value:latestPrices.rates.ZNC.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Tin:1020795718807601224> Tin",
                    value: latestPrices.rates.TIN.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Cobalt:1020795705587154966> Cobalt",
                    value: latestPrices.rates.LCO.toPrecision(5),
                    inline: true
                },{
                    name: "<:Iridium:1020795708191809576> Iridium",
                    value: latestPrices.rates.IRD.toPrecision(5),
                    inline: true
                },{
                    name: "<:Lead:1020795710767112323> Lead",
                    value: latestPrices.rates.LEAD.toPrecision(5),
                    inline: true
                },
                {
                    name: "<:Iron:1020795709068423199> Iron",
                    value: latestPrices.rates.IRON.toPrecision(5),
                    inline: true
                },
            ]);

        await interaction.reply({
            embeds:[embed]
        })

    }
    else {
        console.log("Error getting prices from mongo");
        await interaction.reply({
            content: `Encountered an error when getting prices from mongo`,
        });
    }
}
}