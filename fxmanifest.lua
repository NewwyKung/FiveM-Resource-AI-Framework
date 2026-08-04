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
    -- Config contains shared editable values only.
    'config/config.main.lua',
    'config/functions/config.functions.shared.lua',
    'config/config.item.lua',
    'config/shop/**/*.lua',

    -- Runtime code belongs to its runtime folder.
    'shared/lib/**/*.lua',
    'shared/modules/**/*.lua',
}

client_scripts {
    'config/functions/config.functions.client.lua',
    'client/modules/**/*.lua',
    'client/main.lua',
}

server_scripts {
    'config/functions/config.functions.server.lua',
    'server/modules/**/*.lua',
    'server/main.lua',
}

files {
    'html/**',
}
