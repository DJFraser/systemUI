# systemUI

### Simle Web Interface Linking to Local and External Servers with Multiple Web Interfaces
![](https://djfraser.github.io/assets/images/systemUI/MainPage.PNG)
## config.json
config.json is the descriptor for available services through the interface
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
The File Consits of 

* app
    * System Configuration
* systems
    * Array of Systems in pool

### App Object


### Systems Array

```json
{
    "name" : "Server Name",
    "type" : "Type Of Server",
    "baseURL" : "IP Address of Server",
    "services" : []
}
```
#### Services
```json
{
    "name" : "Name of Service",
    "service" : "Service Type",
    "port" : "Service Port",
    "url" : "Service URL",
    "desc" : "Description of Service"
}
```

Service can be defined using port and/or url
For Example:
```json
{
    "name" : "System Admin",
    "service" : "admin",
    "port" : 9090,
    "url" : "system",
}
```
will link to :9090/system 

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

## Config Upload
![](https://djfraser.github.io/assets/images/systemUI/editor.png)
Ability to Upload config.json File to Server Available at http://[your-server]:[port]/editor Alowing to view the system cards will appear on the man page.