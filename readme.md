# Azure

- Create a new function app inside the Azure Portal.
- In platform features tab, select deployment credentials
- Select setup and choose deployment source as External Repository.
- Enter https://github.com/adamhancock/cwteams.git as the source.
- In your Azure function app Application Settings add a new setting with the name as your connectwise service board name and the value as the webhook url of the MS teams channel you want to post to. To get the webhook url, right click the channel and select connectors. Configure a webhook.
![alt text](https://adamhancock.blob.core.windows.net/images/cwteams.png "Azure Application Settings")


# Connectwise

- Create a new Integrator login
- Select All Records
- Set Service ticket callback url to https://< your function app name >.azurewebsites.net/api/CWIncoming?serviceid=.
