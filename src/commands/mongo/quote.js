const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const MetalPrices = require("../../schemas/metalPrices");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sellquote")
    .setDescription("Get a quote for selling items")
    .addSubcommand((metals) => {
      return metals
        .setName("metals")
        .setDescription("sell metals")
        .addIntegerOption((gold) =>
          gold.setName("gold").setDescription("Sell Gold")
        )
        .addIntegerOption((silver) =>
          silver.setName("silver").setDescription("Sell Silver")
        )
        .addIntegerOption((platinum) =>
          platinum.setName("platinum").setDescription("Sell platinum")
        )
        .addIntegerOption((palladium) =>
          palladium.setName("palladium").setDescription("Sell Palladium")
        )
        .addIntegerOption((rhodium) =>
          rhodium.setName("rhodium").setDescription("Sell Rhodium")
        )
        .addIntegerOption((ruthenium) =>
          ruthenium.setName("ruthenium").setDescription("Sell Ruthenium")
        )
        .addIntegerOption((copper) =>
          copper.setName("copper").setDescription("Sell Copper")
        )
        .addIntegerOption((nickel) =>
          nickel.setName("nickel").setDescription("Sell Nickel")
        )
        .addIntegerOption((aluminium) =>
          aluminium.setName("aluminium").setDescription("Sell Aluminium")
        )
        .addIntegerOption((zinc) =>
          zinc.setName("zinc").setDescription("Sell Zinc")
        )
        .addIntegerOption((tin) =>
          tin.setName("tin").setDescription("Sell Tin")
        )
        .addIntegerOption((cobalt) =>
          cobalt.setName("cobalt").setDescription("Sell Cobalt")
        )
        .addIntegerOption((iridium) =>
          iridium.setName("iridium").setDescription("Sell Iridium")
        )
        .addIntegerOption((lead) =>
          lead.setName("lead").setDescription("Sell Lead")
        )
        .addIntegerOption((iron) =>
          iron.setName("iron").setDescription("Sell iron")
        );
    }),
  async execute(interaction, client) {

    // get latest prices
    let latestPrices = await MetalPrices.findOne()
        .sort({ updatedAt: -1 })
        .limit(1);

    if(latestPrices) {

      // format money function
      function formatMoney(number) {
        return number.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
      }

      const metalsToQuote = interaction.options._hoistedOptions
      const embedCalc = []
      let totalCalc = 0;
      for (const metals of metalsToQuote ){
        embedCalc.push({
          name: `${metals.value} ${metals.name} * ${latestPrices.rates[metals.name].toPrecision(5)}`,
          value: `${formatMoney(latestPrices.rates[metals.name] * metals.value)}`,
          inline: true
        })
        totalCalc += latestPrices.rates[metals.name] * metals.value;
      }

      embedCalc.push({
        name: "Total",
        value: `${formatMoney(totalCalc)}`,
        inline: false
      })

      const embed = new EmbedBuilder()
          .setTitle(`Metals Quote`)
          .setDescription(`As of ${latestPrices.date}`)
          .setColor("#FFA500")
          .setThumbnail(client.user.displayAvatarURL())
          .setTimestamp(Date.now())
          .setFooter({
            iconURL: interaction.user.displayAvatarURL(),
            text: `Requested by ${interaction.user.tag}`
          })
          .addFields(embedCalc);

      await interaction.reply({
        embeds:[embed]
      })
    } else {
      await interaction.reply("No prices found")
    }
  }
};
