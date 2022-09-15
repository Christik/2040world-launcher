module.exports.register = function (handlebars) {
    handlebars.registerHelper('hasPdf', function(context, options) {
        for (const item of context) {
            if (item.type === 'pdf') {
                return options.fn(this);
            }
        }
    });
    handlebars.registerHelper('hasXls', function(context, options) {
        for (const item of context) {
            if (item.type === 'xls') {
                return options.fn(this);
            }
        }
    });
    handlebars.registerHelper('every', function(every, context, options) {
        let result = '';
        let subContext = [];

        if (context && context.length > 0) {
            for (let i = 0; i < context.length; i++) {
                if (i > 0 && i % every === 0) {
                    result += options.fn(subContext);
                    subContext = [];
                }
                subContext.push(context[i]);
            }
            result += options.fn(subContext);
        }

        return result;
    });
};
