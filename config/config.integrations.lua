Config = Config or {}

Config.Integrations = {
    framework = {
        provider = 'standalone',
        resource = nil,
    },
    database = {
        provider = 'none',
        resource = nil,
    },
    inventory = {
        provider = 'none',
        resource = nil,
    },
    notify = {
        provider = 'none',
        resource = nil,
    },
    logger = {
        provider = 'nc_discordlogs',
        resource = 'nc_discordlogs',
    },
    progress = {
        provider = 'none',
        resource = nil,
    },
    target = {
        provider = 'none',
        resource = nil,
    },
}
