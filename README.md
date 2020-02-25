# systemUI

## config.json
```json
{
    "app" : {
        "name" : "Local Servers"
    },
    "systems" : [
        {
            "name" : "Orion",
            "type" : "media",
            "baseurl" : "192.168.0.3",
            "services" : [
                {
                    "name" : "Kodi",
                    "service" : "kodi",
                    "port" : 8080 
                },
                {
                    "name" : "Cockpit",
                    "service" : "cockpit",
                    "port" : 9898,
                    "url" : "system"
                }
            ]
        }
    ]
}
```

### Available Services

| service  | Description  |
| -------- | :----------: |
| kodi     | Kodi Web UI  |
| cockpit  | Cockpit Web Admin |
| torrent  | Torrent Client |
| git      | Git Server |
| svn      | Subversion Server |
| wiki     | Wiki |
| kanban   | Kanban Board |
| jenkins  | Jenkins Instance |
| admin    | Generic Admin |
| terminal | Generic Console |
| voip     | PBX Server |