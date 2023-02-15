const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios").default;
const { metals_api_key } = process.env;
const mongoose = require("mongoose");
const MetalPrices = require("../../schemas/metalPrices");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pricesinit")
        .setDescription("populates prices database for the first time"),
    async execute(interaction, client) {
        const latestPrices = await MetalPrices.findOne()
            .sort({ updatedAt: -1 })
            .limit(1);
        // console.log(latestPrices)

        if (!latestPrices) {
                axios
                    .get(
                        `https://metals-api.com/api/latest?access_key=${metals_api_key}&base=GBP&symbols=XAU,XAG,XPT,XPD,XCU,XRH,RUTH,ALU,NI,ZNC,TIN,LCO,IRD,LEAD,IRON`
                    )
                    .then(async function ({ data }) {
                        // handle success
                        if (data.success) {
                            // console.log(data);
                            const metalPrices = await new MetalPrices({
                                _id: mongoose.Types.ObjectId(),
                                priceTimeStamp: data.timestamp,
                                base: data.base,
                                date: data.date,
                                rates: {
                                    gold: data.rates.XAU,
                                    silver: data.rates.XAG,
                                    platinum: data.rates.XPT,
                                    palladium: data.rates.XPD,
                                    rhodium: data.rates.XRH,
                                    ruthenium: data.rates.RUTH,
                                    copper: data.rates.XCU,
                                    nickel: data.rates.NI,
                                    aluminium: data.rates.ALU,
                                    zinc: data.rates.ZNC,
                                    tin: data.rates.TIN,
                                    cobalt: data.rates.LCO,
                                    iridium: data.rates.IRD,
                                    lead: data.rates.LEAD,
                                    iron: data.rates.IRON
                                },
                                unit: data.unit,
                            });

                            await metalPrices.save().catch(console.error);
                            await interaction.reply({
                                content: `Metal prices have been initialised`,
                            });
                            // console.log(metalPrices)
                        } else {
                            console.log("Error with GET data");
                            await interaction.reply({
                                content: `Encountered an error!`,
                            });
                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
        }
        else {
            await interaction.reply({
                content: `Prices have already been initialised, you can now used /updatePrices`
            });
        }
    },
};
