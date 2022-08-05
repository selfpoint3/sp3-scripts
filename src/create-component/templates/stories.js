module.exports = (name) => {
    return `
    import React from 'react';
    import boilderplate from '../../../tools/storybook/componentBoilerplate'
    
    import Component from '../${name}';
    
    const config = boilderplate(Component, '${name}')
    
    export default config.defaultExport; 
    
    const Template = args => <Component {...args} />;
    
    const templates = config.templates;
    
    export const Default = Template.bind({});
    Default.args = templates['Default'].args
    
    export const Edit = Template.bind({});
    Edit.args = templates['Edit'].args    
    `
}


