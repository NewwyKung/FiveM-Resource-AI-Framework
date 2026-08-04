fx_version 'cerulean'
game 'gta5'

author 'Newwy'
version '1.0.0'
description 'Reusable FiveM resource template'
lua54 'yes'

-- Production:
-- ui_page 'html/index.html'
-- Development:
ui_page 'http://localhost:5171/'

shared_scripts {
    -- Shared config foundation and helpers must load first.
    'config/config.main.lua',
    'config/functions/config.functions.shared.lua',

    -- Root-level domain configs are listed explicitly for deterministic order.
    'config/config.item.lua',

    -- Nested shared configs can be grouped by feature/domain.
    'config/shared/**/*.lua',
    'config/shop/**/*.lua',

    -- Shared libraries load before shared modules.
    'shared/lib/**/*.lua',
    'shared/modules/**/*.lua',
}

client_scripts {
    -- Client-only config helpers and values.
    'config/functions/config.functions.client.lua',
    'config/client/**/*.lua',

    -- Modules declare behavior; main.lua bootstraps them last.
    'client/modules/**/*.lua',
    'client/main.lua',
}

server_scripts {
    -- Server-only config helpers and values.
    'config/functions/config.functions.server.lua',
    'config/server/**/*.lua',

    -- Modules declare behavior; main.lua bootstraps them last.
    'server/modules/**/*.lua',
    'server/main.lua',
}

files {
    'html/**',
}
