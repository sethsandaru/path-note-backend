/**
 * PathNoteBackend - Index
 * This will be a place we set-up and serving the configuration for all modules
 * @author Phat Tran
 */

class Configuration {
    /**
     * This is where you need to inject your configuration
     */
    injectedConfigurations: object = {
        langText: require('./lang-text.object').default,

    }

    /**
     * Get config value
     * @param path
     */
    get(path : string) : any {
        // Replace [] notation with dot notation
        path = path.replace(/\[["'`](.*)["'`]\]/g,".$1")

        return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : undefined
        }, this.injectedConfigurations || self)
    }

    /**
     * Get LangText (Quick-use)
     * @param path
     */
    getLangText(path : string) : string {
        console.log(this.injectedConfigurations)
        return this.get('langText.' + path)
    }
}

const Config = new Configuration();

export {
    Config
}