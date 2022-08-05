/**
 * Produce an object with information about components to export / expose
 * for webpack.
 * 
 * @returns 
 */
async function discoverExports() {

    const fs = require('fs');
    const { EOL } = require('os');

    let _indexImports = ''
    let _indexExports = ''
    let _exposes = {}
    let _configJS = {}
    let _componentsJS = {}

    const addExport = (name,isEdit = false) => {

        const exportName = isEdit ? `${name}_Edit`: name

        _exposes[exportName] = `/src/components/${isEdit ? `${name}/Edit` : name}`
        _indexImports += `import ${exportName} from './${isEdit ? `${name}/Edit` : name}';${EOL}`
        _indexExports += `${exportName},${EOL}`
    }

    // fetch all directories in src
    const srcFiles = await fs.readdirSync('./src/components', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

    // walk through each directory
    for await (const directory of srcFiles) {
        // open config.json file
        let config
        try {
            config = require(`../../src/components/${directory}/config.json`)
        } catch (err) {
            console.error(`config.json not found or contains errors for component ${directory}`, err)
            return
        }

        // build config.js
        _configJS[directory] = config
        _componentsJS[directory] = true

        addExport(directory)
        

        if (config.hasEdit) {
            addExport(`${directory}`, true)
        }

    }

    // write final index.js file
    await fs.writeFileSync(`./src/components/index.js`, `${_indexImports}${EOL}export default {${EOL}${_indexExports}}${EOL}`);

    // write config.js file
    await fs.writeFileSync(`./src/components/config.json`, `${JSON.stringify(_configJS, null, 4)}`);

    // write components.js file
    await fs.writeFileSync(`./src/components/components.js`, `module.exports = ${JSON.stringify(_componentsJS, null, 4)}`);


    return {
        exposes: _exposes
    }
}

module.exports = discoverExports
