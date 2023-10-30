$WebClient = New-Object System.Net.WebClient
Remove-Item .\steamCMD -Recurse -Force

Write-Output "Downloading SteamCMD"
$WebClient.DownloadFile("https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip",".\steamcmd.zip")

Write-Output "Extracting SteamCMD"
Expand-Archive .\steamcmd.zip -DestinationPath .\steamCMD
Remove-Item .\steamcmd.zip

Write-Output "Running SteamCMD to install and update"
.\steamCMD\steamcmd.exe +quit

pnpm i
pnpm run build