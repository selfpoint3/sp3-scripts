module.exports = (name) => {
    return `
    {
        "name": "${name}",
        "form": {
            "acceptParents" : [ "Col"] 
        },
        "view": {
            "acceptParents" : [ "Col"] 
        },
        "viewTemplate": {
            "acceptParents" : [ "Col"] 
        },
        "admin": {
            "acceptParents" : [ "Col"] 
        },
        "doc": {
            "acceptParents" : [ "Col"] 
        }
    }
    `
}


