const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios").default;
const { metals_api_key } = process.env;
const mongoose = require("mongoose");
const MetalPrices = require("../../schemas/metalPrices");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("updateprices")
    .setDescription("GETs prices from api and updates mongoDB"),
  async execute(interaction, client) {
    const latestPrices = await MetalPrices.findOne()
      .sort({ updatedAt: -1 })
      .limit(1);
    // console.log(latestPrices)

    if (latestPrices) {
      const then = new Date(latestPrices.updatedAt).getTime();
      const now = new Date().getTime();

      const diffTime = Math.abs(now - then);
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        interaction.reply("You can only update prices once a day");
      } else {
        axios
          .get(
            `https://metals-api.com/api/latest?access_key=${metals_api_key}&base=GBP&symbols=XAU,XAG,XPT,XPD,XCU,XRH,RUTH,ALU,NI,ZNC,TIN,LCO,IRD,LEAD,IRON`
          )
          .then(async function ({ data }) {
            // handle success
            if (data.success) {
              // console.log(data);
              metalPrices = await new MetalPrices({
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
                content: `Metal prices have been updated`,
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
    }
    else {
      await interaction.reply({
        content: `Currently no prices in database, have you run /pricesInit ?`
      });
    }
  },
};
