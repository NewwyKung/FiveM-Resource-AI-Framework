fx_version 'cerulean'
game 'gta5'

author 'Newwy'
version '1.0.0'
description 'Reusable FiveM resource template'

-- Run Vite separately for browser development; FXServer uses the production build.
ui_page 'html/index.html'

shared_scripts {
    -- Config contains shared editable values only.
    'config/config.main.lua',
    'config/config.item.lua',
    'config/shop/**/*.lua',

    -- Runtime code belongs to its runtime folder.
    'shared/lib/**/*.lua',
    'shared/modules/errors.lua',
    'shared/modules/lifecycle.lua',
}

client_scripts {
    'client/lib/**/*.lua',
    'client/modules/lifecycle.lua',
    'client/main.lua',
}

server_scripts {
    'server/lib/**/*.lua',
    'server/modules/lifecycle.lua',
    'server/main.lua',
}

files {
    'html/index.html',
    'html/**/*',
}
