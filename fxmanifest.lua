fx_version 'cerulean'
game "gta5"
author "Newwy"
version '1.0.0'
description ''
lua54 'yes'

-- ui_page 'html/index.html'
ui_page 'http://localhost:3301/'

client_scripts {
    'client/main.lua',
}

server_scripts {
    'server/main.lua',
}

shared_scripts {
    'config/config.main.lua',
}

files {
    'html/**',
    'html/img/assets/*.*',
}