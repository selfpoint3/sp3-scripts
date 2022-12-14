/**
 * helper program to create a new component structure in src/components
 */
(async function () {

    const { program } = require('commander');
    const inquirer = require("inquirer");
    const fs = require('fs');

    /**
     * helper functions
     */
    _die = ({ msg }) => {
        console.error(msg)
        process.exit(-1)
    }

    /**
     * Check cmd arguments
     * 
     * 
     */

     program.option('--test')
     program.parse();
     const options = program.opts();

     const { test = false } = options;
   
    if( test ) {
        console.log('We are running in test mode.')
    }


    const questions = [
        {
            type: "input",
            name: "name",
            message: "Name of component",
            validate: input => {

                if (!input) {
                    throw 'You need to provide a name'
                }

                const firstCharOfName = input[0]

                if( firstCharOfName.toUpperCase() !== firstCharOfName ) {
                    throw 'First character of component must be uppercase.'
                }

                if( ! (/[a-zA-Z]/).test(firstCharOfName) ) {
                    throw 'First character must be A-Z'
                }

                if( input.length < 3 ) {
                    throw 'Component name must be minimum 3 chars long'
                }

                if( ! (/^[0-9a-zA-Z-]+$/ ).test(input) ) {
                    throw 'Component name can only contain [0-9a-zA-Z]'
                }

                return true
            }
        },
        {
            type: 'checkbox',
            name: 'pageTypes',
            message: 'Which page-types to support?',
            choices: [ "form", "view","doc","viewTemplate", "admin", "doc" ],
            default: ["form","view"]


        }
    ]

    const answers = await inquirer.prompt(questions);

    console.log('answers', answers)


    const { name, pageTypes } = answers;

    if (!name) {
        _die({ msg: 'Component must have a name' })
    }

    console.log('process.cwd()', process.cwd())

    /**
     * check if component / directory exists
     */

    const dir = test ? `${process.cwd()}/tmp/components/${name}` : `${process.cwd()}/src/components/${name}`

    if (await fs.existsSync(dir)) {
        _die({ msg: 'Component already exists' })
    }

    /**
     * create component directory
     */
    try {
        await fs.mkdirSync(dir, {recursive : true});

        // generate stories
        const _stories = require('./templates/stories')
        await fs.writeFileSync(`${dir}/index.stories.js`, _stories(name))
        const _config = require('./templates/config')
        await fs.writeFileSync(`${dir}/config.json`, _config(name, pageTypes ))
        const _index = require('./templates/index')
        await fs.writeFileSync(`${dir}/index.js`, _index(name))

    } catch (err) {
        _die('Something went wrong with the components scripts')
    }



})();
