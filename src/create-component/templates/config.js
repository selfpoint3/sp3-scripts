module.exports = (name,pageTypes) => {

    let _pageTypes = ''
    pageTypes.forEach( (pageType,i) => {
        _pageTypes += `${i !== 0 ? ',' : ''}
        "${pageType}": {
            "acceptParents" : [ "Col"] 
        }`
    })

    return `
    {
        "name": "${name}",${_pageTypes}
    }
    `
}


