fx_version 'cerulean'
game 'gta5'

author 'FiveM Resource AI Framework'
description 'Provider-neutral server-authoritative shop example'
version '1.0.0'

ui_page 'ui/index.html'

shared_scripts {
    'config/config.lua',
    'shared/contracts.lua',
}

client_script 'client/main.lua'

server_scripts {
    'server/adapters/repository.lua',
    'server/services/shop.lua',
    'server/main.lua',
}

files {
    'ui/index.html',
    'ui/app.js',
    'ui/style.css',
}
