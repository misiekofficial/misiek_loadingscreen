fx_version 'adamant'
game 'gta5'
lua54 'yes'
author 'totenmajkel_'
description 'LoadingScreen for FiveM'

loadscreen 'web/build/index.html'
loadscreen_manual_shutdown "yes"
loadscreen_cursor 'yes'

files {
    'web/**'
}

shared_scripts {
    '@ox_lib/init.lua',
    '@es_extended/imports.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'modules/**/sv_*.lua'
}

client_scripts {
    'modules/**/cl_*.lua'
}

-- https://discord.gg/P8KKAb7D4q
-- UI Projects for FiveM by totenmajkel_ (misiek_dev)