describe('#jssdk', function() {
    it('#basic', function() {
        var wx = {
            config: function() {
                console.log('config');
            },
            ready: function() {
                console.log('ready');
            },
            error: function() {
                console.log('error');
            },
        };
        if (typeof window === 'global') {
            window.wx = wx;
        } else {
            global.wx = wx;
        }

        var store = {
            state: {},
            commit: function(action, payload) {
                console.log('commit');
            },
            registerModule: function(name, mod) {
                console.log('registerModule start');
                store.state[name] = mod.state;
                console.log('registerModule end');
            },
        };

        jssdk.install({}, {
            store: store,
        });
        jssdk.config({});
    });
});