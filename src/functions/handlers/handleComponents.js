const { readdirSync } = require("fs")

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentFolders = readdirSync(`./src/components`);
        for (const folder of componentFolders){
            const componentFiles = readdirSync(`./src/components/${folder}`).filter(file => file.endsWith(".js"));
            const {  } = client;
        }
    }
}
