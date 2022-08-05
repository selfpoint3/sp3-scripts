const boilerplate = (Component, title) => {
    return {
        templates:
        {
            Default: {
                args: {
                    extra: {
                        id: '1',
                        title: 'Test Task',
                        label: 'Bla bla',
                    }
                }
            },
            Edit: {
                args: {
                    builder: true
                }
            }
        }
        ,

        defaultExport: {
            component: Component,
            title,
            args: {
                name: '',
                disabled: true,
                origin: 'admin',
                builder: true,
                // children: {},
                // data: {},
                // document: {},
                // extra: {},
                // effects: {},
                // effectsLoading: {},
                // errors: {},
                // htmlTemplates: {}
            },
            argTypes: {
                save: {
                    action: 'save',
                },
                setStop: {
                    action: 'setStop'
                },
                initUpload: {
                    action: 'initUpload'
                },
                streamUpload: {
                    action: 'streamUpload'
                },
                finishUpload: {
                    action: 'finishUpload'
                },
                removeUpload: {
                    action: 'removeUpload'
                },
                subscribe: {
                    action: 'subscribe'
                },
                changeStatus: {
                    action: 'changeStatus'
                },
            }
        }


    }
}

export default boilerplate